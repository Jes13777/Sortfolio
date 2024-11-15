import { Camera, requestPermissions, takePicture } from '@nativescript/camera';
import { ImageAsset, knownFolders, path } from '@nativescript/core';

export class ScannerService {
    private static instance: ScannerService;
    private scansFolder: string;

    private constructor() {
        this.scansFolder = path.join(knownFolders.documents().path, 'scans');
    }

    public static getInstance(): ScannerService {
        if (!ScannerService.instance) {
            ScannerService.instance = new ScannerService();
        }
        return ScannerService.instance;
    }

    async requestCameraPermission(): Promise<boolean> {
        return requestPermissions();
    }

    async captureDocument(): Promise<ImageAsset> {
        const options = {
            width: 1920,
            height: 1440,
            keepAspectRatio: true,
            saveToGallery: false
        };

        return await takePicture(options);
    }

    async saveImage(image: ImageAsset, fileName: string): Promise<string> {
        const filePath = path.join(this.scansFolder, `${fileName}.jpg`);
        // The image is automatically saved by the camera module
        return filePath;
    }
}