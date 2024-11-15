import { Observable } from '@nativescript/core';
import { Scan } from '../models/scan.model';
import { ScannerService } from '../services/scanner.service';
import { StorageService } from '../services/storage.service';

export class HomeViewModel extends Observable {
    private scannerService: ScannerService;
    private storageService: StorageService;
    private _scans: Scan[] = [];
    private _selectedCategory: string = 'All';

    constructor() {
        super();
        this.scannerService = ScannerService.getInstance();
        this.storageService = StorageService.getInstance();
        this.loadScans();
    }

    get scans(): Scan[] {
        return this._scans;
    }

    get selectedCategory(): string {
        return this._selectedCategory;
    }

    async startScan() {
        try {
            const hasPermission = await this.scannerService.requestCameraPermission();
            if (!hasPermission) {
                console.log('Camera permission denied');
                return;
            }

            const image = await this.scannerService.captureDocument();
            if (image) {
                const scan: Scan = {
                    id: Date.now().toString(),
                    fileName: `scan_${Date.now()}`,
                    filePath: await this.scannerService.saveImage(image, `scan_${Date.now()}`),
                    category: this._selectedCategory,
                    tags: [],
                    notes: '',
                    createdAt: new Date(),
                    fileType: 'jpeg'
                };

                await this.storageService.saveScan(scan);
                await this.loadScans();
            }
        } catch (error) {
            console.error('Error during scan:', error);
        }
    }

    async loadScans() {
        try {
            this._scans = await this.storageService.getScans(
                this._selectedCategory === 'All' ? undefined : this._selectedCategory
            );
            this.notifyPropertyChange('scans', this._scans);
        } catch (error) {
            console.error('Error loading scans:', error);
        }
    }

    setCategory(category: string) {
        this._selectedCategory = category;
        this.loadScans();
    }
}