## Large file Uploader
Sample projects that uploads large files by splitting them into predefined small chunks to avoid web server max request size errors.

### client_HTML_JavaScript
Simple HTML and JavaScript files that uses two different versions of the large file uploader; regular function and class.

**FileUploaderFunc.js:** Regular JavaScript function that uploads the passed file data to the URL by splitting it into small chunks (10 mb by default).

**FileUploaderClass.js:** Class version of the same uploader function.

You can switch between these two options by commenting and uncommenting the lines in the uploadFile() function in the HTML file. 

### api_NetCore8
Sample backend api project that can used to test uploaders.

See the project readme files for code samples.
