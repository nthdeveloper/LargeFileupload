## Two versions of the file uploader and a sample HTML file that uses them

You can change the target api URL and the chunk size inside the uploader files. Chunk isze is 10 MB by default.

    const _maxFileSizeMB = 10;//Change this to whatever part size you want

Uncomment one of the lines in the uploadFile function in the HTML file to use them.

    function uploadFile() {
        //uploadFileUsingFunc();//Uncomment this to use function version of the uploader
        uploadFileUsingClass();//Uncomment this to use class version of the uploader
    }
Both versions have onProgress, onCompleted and onFailed callback methods

### FileUploaderFunc
Regular JavaScript function that uploads the passed file data to the URL by splitting it into small chunks (10 mb by default).

    function uploadFileUsingFunc() {       
    
        const fileInput = document.getElementById("myFile");
        
        fileUploader = new FileUploaderFunc(uploadUrl, fileInput.files[0], "735C38B5-E81C-44AB-BB66-A1B4322C5EF1");
                
        fileUploader.onProgress = (uploader, progress)=> {
            console.log("File upload progress: "+progress);
        }   
        
        fileUploader.onCompleted = (uploader)=> {
            console.log("Upload completed.");
        }                     

        fileUploader.onFailed = (uploader, error)=> {
            console.log("Upload failed. Error: "+ error);
        }

        fileUploader.upload();
     }

### FileUploaderClass
Class version of the same uploader function.

    function uploadFileUsingClass() {

        const fileInput = document.getElementById("myFile");

        fileUploader = new FileUploaderClass(uploadUrl, fileInput.files[0], "735C38B5-E81C-44AB-BB66-A1B4322C5EF1");

        fileUploader.onProgress = (uploader, progress)=> {
            console.log("File upload progress: "+progress);
        }   

        fileUploader.onCompleted = (uploader)=> {
            console.log("Upload completed.");
        }                     

        fileUploader.onFailed = (uploader, error)=> {
            console.log("Upload failed. Error: "+ error);
        }

        fileUploader.upload();
    }

