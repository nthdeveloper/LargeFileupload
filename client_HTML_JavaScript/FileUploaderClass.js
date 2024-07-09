class FileUploaderClass {

    #url = "";
    #fileId="";
    #file = null;
    #fileName = "";
    #totalSize = 0;
    #maxFileSizeMB = 10;//Change this to whatever part size you want
    #bufferChunkSize = this.#maxFileSizeMB * (1024 * 1024);    
    #totalParts = 0;

    

    onCompleted = null;
    onFailed = null;
    onProgress = null;

    constructor(url, file, fileId) {
        this.#url = url;
        this.#file = file;
        this.#fileId=fileId;        
        this.#fileName = file.name;
        this.#totalSize = file.size;
          
        this.#totalParts = Math.floor(this.#totalSize / this.#bufferChunkSize);
        if ((this.#totalSize % this.#bufferChunkSize) > 0)
            this.#totalParts++;               
    }   
    
    async upload() {

        const that = this;

        let fileStreamPos = 0;
        let endPos = Math.min(this.#bufferChunkSize, this.#file.size);
        let partNo = 1;        

        let finished=false;        

        do {
            var chunk = that.#file.slice(fileStreamPos, endPos);

            var formData = new FormData();
            formData.append('fileData', chunk, this.#fileName);
            formData.append('fileId', this.#fileId);
            formData.append('totalSize', this.#totalSize);
            formData.append('totalParts', this.#totalParts);
            formData.append('partNo', partNo);

            await $.ajax({
                type: "POST",
                url: this.#url,
                contentType: false,
                processData: false,
                data: formData,
                success: function (resp) {
                    if (partNo == that.#totalParts) {//Finished last part
    
                        finished = true;

                        if (that.onProgress != null)
                            that.onProgress(that, 100);
    
                        if (that.onCompleted != null)
                            that.onCompleted(that);                        
    
                    } else {
    
                        if (that.onProgress != null)
                            that.onProgress(that, Math.floor((partNo * 100) / that.#totalParts));
    
                        partNo++;
                        fileStreamPos += that.#bufferChunkSize;
                        endPos = Math.min(fileStreamPos + that.#bufferChunkSize, that.#totalSize);   
                    }
                },
                error: function (response) {

                    finished = true;
    
                    if (that.onFailed != null)
                        that.onFailed(that, response.responseText);                    
                }
            });
        } 
        while (!finished);
    }
}