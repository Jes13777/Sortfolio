import { File, Folder, knownFolders, path } from '@nativescript/core';
import { Scan } from '../models/scan.model';

export class StorageService {
    private static instance: StorageService;
    private scansFolder: Folder;

    private constructor() {
        this.scansFolder = knownFolders.documents().getFolder('scans');
        this.ensureStorageStructure();
    }

    public static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    private ensureStorageStructure(): void {
        const categories = ['Receipts', 'Documents', 'Bills'];
        categories.forEach(category => {
            const folderPath = path.join(this.scansFolder.path, category);
            if (!File.exists(folderPath)) {
                this.scansFolder.getFolder(category);
            }
        });
    }

    async saveScan(scan: Scan): Promise<void> {
        const metadata = {
            id: scan.id,
            fileName: scan.fileName,
            category: scan.category,
            tags: scan.tags,
            notes: scan.notes,
            createdAt: scan.createdAt.toISOString(),
            fileType: scan.fileType
        };

        const metadataPath = path.join(this.scansFolder.path, `${scan.id}.json`);
        const metadataFile = File.fromPath(metadataPath);
        await metadataFile.writeText(JSON.stringify(metadata));
    }

    async getScans(category?: string): Promise<Scan[]> {
        const scans: Scan[] = [];
        const entities = this.scansFolder.getEntities();
        
        entities.forEach(entity => {
            if (entity.name.endsWith('.json')) {
                const content = File.fromPath(entity.path).readTextSync();
                const scan = JSON.parse(content);
                if (!category || scan.category === category) {
                    scans.push(scan);
                }
            }
        });

        return scans;
    }
}