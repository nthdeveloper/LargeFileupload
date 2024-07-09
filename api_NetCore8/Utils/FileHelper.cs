namespace FileUploadApi.Utils
{
    public class FileHelper : IFileHelper
    {
        public async Task SaveFile(IFormFile file, string targetFilePath)
        {
            var dirPath = System.IO.Path.GetDirectoryName(targetFilePath);
            if (!Directory.Exists(dirPath))
                Directory.CreateDirectory(dirPath);

            var cvTargetStream = System.IO.File.Create(targetFilePath);
            var cvSourceStream = file.OpenReadStream();

            await file.CopyToAsync(cvTargetStream);
            cvTargetStream.Close();
        }

        public async Task AppendToFile(IFormFile file, string targetFilePath)
        {
            var dirPath = System.IO.Path.GetDirectoryName(targetFilePath);
            if (!Directory.Exists(dirPath))
                Directory.CreateDirectory(dirPath);

            using (var cvTargetStream = System.IO.File.OpenWrite(targetFilePath))
            {
                var cvSourceStream = file.OpenReadStream();

                cvTargetStream.Position = cvTargetStream.Length;

                await file.CopyToAsync(cvTargetStream);
                cvTargetStream.Close();
            }
        }

        public void MoveFile(string sourceFilePath, string targetFilePath)
        {
            var dirPath = System.IO.Path.GetDirectoryName(targetFilePath);
            if (!Directory.Exists(dirPath))
                Directory.CreateDirectory(dirPath);

            File.Move(sourceFilePath, targetFilePath);
        }

        public bool SafeDeleteFile(string filePath)
        {
            try
            {
                if (!File.Exists(filePath))
                    return true;

                File.Delete(filePath);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public string GetTodayRelativeDirectoryPath()
        {
            DateTime today = DateTime.Today;
            return today.Year.ToString() + "\\" + today.Month.ToString("00") + "\\" + today.Day.ToString("00");
        }
    }
}
