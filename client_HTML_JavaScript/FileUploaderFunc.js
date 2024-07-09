function FileUploaderFunc(url, file, fileId) {

    const _url = url;
    const _fileId=fileId;
    const _file = file;
    const _fileName = file.name;
    const _totalSize = file.size;
    const _maxFileSizeMB = 10;//Change this to whatever part size you want
    const _bufferChunkSize = _maxFileSizeMB * (1024 * 1024);    
    var _totalParts = Math.floor(_totalSize / _bufferChunkSize);
        if ((_totalSize % _bufferChunkSize) > 0)
            _totalParts++;
    
    this.onCompleted = null;
    this.onFailed = null;
    this.onProgress = null;

    this.upload = async () => {

        let fileStreamPos = 0;
        let endPos = Math.min(_bufferChunkSize, _file.size);
        let partNo = 1;        

        let finished=false;
        const that = this;

        do {
            var chunk = file.slice(fileStreamPos, endPos);

            var formData = new FormData();
            formData.append('fileData', chunk, _fileName);
            formData.append('fileId', _fileId);
            formData.append('totalSize', _totalSize);
            formData.append('totalParts', _totalParts);
            formData.append('partNo', partNo);

            await $.ajax({
                type: "POST",
                url: _url,
                contentType: false,
                processData: false,
                data: formData,
                success: function (resp) {
                    if (partNo == _totalParts) {//Finished last part
    
                        finished = true;

                        if (that.onProgress != null)
                            that.onProgress(that, 100);
    
                        if (that.onCompleted != null)
                            that.onCompleted(that);                        
    
                    } else {
    
                        if (that.onProgress != null)
                            that.onProgress(that, Math.floor((partNo * 100) / _totalParts));
    
                        partNo++;
                        fileStreamPos += _bufferChunkSize;
                        endPos = Math.min(fileStreamPos + _bufferChunkSize, _totalSize);   
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