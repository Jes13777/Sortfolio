export interface Scan {
    id: string;
    fileName: string;
    imageData: string;
    category: string;
    portfolio?: string;
    tags: string[];
    notes: string;
    createdAt: Date;
    fileType: 'jpeg' | 'png' | 'pdf';
}

export interface Portfolio {
    id: string;
    name: string;
    createdAt: Date;
    description?: string;
}

export interface Settings {
    pinProtection: boolean;
    pin?: string;
    theme: 'light' | 'dark';
    defaultCategory: string;
}