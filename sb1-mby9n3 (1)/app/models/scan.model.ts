export interface Scan {
    id: string;
    fileName: string;
    filePath: string;
    category: string;
    tags: string[];
    notes: string;
    createdAt: Date;
    fileType: 'pdf' | 'jpeg';
}