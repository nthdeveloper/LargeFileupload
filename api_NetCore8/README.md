## .Net API project to test file uploaders
Sample backend api project (.net 8 with VS 2022 solution) that can used to test uploaders.
This project has single contoller named FilesController with a single action method SaveAssetFilePart which accepts splitted file data with additional info.

File is saved under **wwwroot\files** folder. You may need to manually create wwwroot folder in the root directory of the solution before running the project, otherwise `_hostingEnvironment.WebRootPath` may return null.

FileHelper class is only for separating file stream read and write operations, and also a few simple file operations.

CORS was already configured to accept any origin and method.
