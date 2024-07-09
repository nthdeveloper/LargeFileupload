export default interface SaveFilePartRequest {    
    fileId: string;    
    totalSize: number;
    totalParts: number;
    partNo: number;
    fileData: File | null | undefined;
}