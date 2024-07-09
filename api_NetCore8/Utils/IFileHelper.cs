namespace FileUploadApi.Utils
{
    public interface IFileHelper
    {
        Task SaveFile(IFormFile file, string targetFilePath);
        Task AppendToFile(IFormFile file, string targetFilePath);
        void MoveFile(string sourceFilePath, string targetFilePath);
        bool SafeDeleteFile(string filePath);
        string GetTodayRelativeDirectoryPath();
    }
}
