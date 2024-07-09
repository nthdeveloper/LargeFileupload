namespace FileUploadApi.Models
{
    public class SaveFilePartRequest
    {
        public string FileId { get; set; }
        public long TotalSize { get; set; }
        public int TotalParts { get; set; }
        public int PartNo { get; set; }
        public IFormFile FileData { get; set; }
    }
}
