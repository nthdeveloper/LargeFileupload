import axios from "axios";
import SaveFilePartRequest from "./SaveFilePartRequest";

export default class FileUploader {

    readonly url: string;
    readonly file: File;
    readonly fileId : string;

    readonly fileName: string;
    readonly totalSize: number = 0;
    readonly totalParts: number = 0;
    readonly maxFileSizeInMb: number = 10;
    readonly bufferChunkSize: number = this.maxFileSizeInMb * (1024 * 1024);    

    private isCancelled: boolean = false;

    onProgress: (uploader:FileUploader, progress:number) => void;
    onCompleted: (uploader:FileUploader)=> void;
    onFailed: (uploader:FileUploader, error:any)=> void;    

    constructor(url: string, file: File, fileId: string) {
        this.url=url;
        this.file = file;
        this.fileId = fileId;

        this.fileName = file.name;
        this.totalSize = file.size;
        this.totalParts = Math.floor(this.totalSize / this.bufferChunkSize);

        if ((this.totalSize % this.bufferChunkSize) > 0)
            this.totalParts++;        
    }

    async upload() {

        let fileStreamPos:number = 0;
        let endPos: number = 0;
        let partNo: number = 1;    

        endPos = Math.min(this.bufferChunkSize, this.totalSize);

        do{
            if(this.isCancelled) break;

            var dataBlob = this.file.slice(fileStreamPos, endPos);

            const fileModel : SaveFilePartRequest = {
                fileId: this.fileId,
                totalSize: this.totalSize,
                totalParts: this.totalParts,
                partNo: partNo,
                fileData: new File([dataBlob], this.fileName)
              };

              try {
                const response = await axios.post<string>(this.url, fileModel, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  }
                );

                console.log(response);
              }
              catch(error) {
                console.log(error);   

                if(this.onFailed)
                    this.onFailed(this, error);

                return Promise.reject(error);
            } 

            if(partNo == this.totalParts) {

                if(this.onCompleted)
                    this.onCompleted(this);

                return Promise.resolve();

            } else {

                if (this.onProgress)
                    this.onProgress(this, Math.floor((partNo * 100) / this.totalParts));

                partNo++;
                fileStreamPos += this.bufferChunkSize;
                endPos = Math.min(fileStreamPos + this.bufferChunkSize, this.totalSize);
            }

        }
        while(true);

        return Promise.resolve();
    }

    cancel() : void {
        this.isCancelled = true;
    }
}