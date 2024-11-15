export interface Scan {
    id: string;
    fileName: string;
    imageData: string;
    category: string;
    tags: string[];
    notes: string;
    createdAt: Date;
    fileType: 'jpeg' | 'png';
}