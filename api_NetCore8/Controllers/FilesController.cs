using FileUploadApi.Models;
using FileUploadApi.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FileUploadApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilesController : ControllerBase
    {
        private readonly IFileHelper _fileHelper;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public FilesController(
            IFileHelper fileHelper,
            IWebHostEnvironment hostingEnvironment
            )
        {
            _fileHelper = fileHelper;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        [Route("savepart")]
        public async Task<IActionResult> SaveAssetFilePart(SaveFilePartRequest model)
        {
            try
            {
                string dirPath = Path.Combine(_hostingEnvironment.WebRootPath, "Files");

                if (!Directory.Exists(dirPath))
                    Directory.CreateDirectory(dirPath);

                var filePath = Path.Combine(dirPath, model.FileId + Path.GetExtension(model.FileData.FileName));

                if (model.PartNo == 1)
                {
                    _fileHelper.SafeDeleteFile(filePath);
                    await _fileHelper.SaveFile(model.FileData, filePath);
                }
                else
                {
                    //Append file
                    await _fileHelper.AppendToFile(model.FileData, filePath);
                }               
                
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to save file part.");
            }

            return Ok($"File part '{model.PartNo}/{model.TotalParts}' saved.");
        }
    }
}
