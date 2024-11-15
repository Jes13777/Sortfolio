import { Scan } from '../models/Scan';

export class StorageService {
    private static readonly STORAGE_KEY = 'scanstore_scans';

    static saveScans(scans: Scan[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(scans));
    }

    static getScans(): Scan[] {
        const scans = localStorage.getItem(this.STORAGE_KEY);
        if (!scans) return [];
        return JSON.parse(scans).map((scan: any) => ({
            ...scan,
            createdAt: new Date(scan.createdAt)
        }));
    }

    static getScansByCategory(category?: string): Scan[] {
        const scans = this.getScans();
        if (!category || category === 'All') return scans;
        return scans.filter(scan => scan.category === category);
    }
}