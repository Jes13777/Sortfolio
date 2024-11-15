import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { FaCamera, FaSync, FaUpload } from 'react-icons/fa';
import { useStore } from '../store/useStore';

interface ScannerProps {
    onCapture: (imageData: string) => void;
    onClose: () => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onCapture, onClose }) => {
    const webcamRef = useRef<Webcam>(null);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { settings } = useStore();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            onCapture(imageSrc);
        }
    }, [onCapture]);

    const toggleCamera = () => {
        setFacingMode(current => current === 'user' ? 'environment' : 'user');
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onCapture(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 max-w-xl w-full mx-4">
                <div className="relative rounded-lg overflow-hidden">
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ facingMode }}
                        className="w-full rounded-lg"
                    />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                        <button
                            onClick={toggleCamera}
                            className="bg-blue-500 bg-opacity-80 text-white p-4 rounded-full hover:bg-blue-600 transition-colors"
                        >
                            <FaSync size={24} />
                        </button>
                        <button
                            onClick={capture}
                            className="bg-blue-500 bg-opacity-80 text-white p-4 rounded-full hover:bg-blue-600 transition-colors"
                        >
                            <FaCamera size={24} />
                        </button>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-blue-500 bg-opacity-80 text-white p-4 rounded-full hover:bg-blue-600 transition-colors"
                        >
                            <FaUpload size={24} />
                        </button>
                    </div>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                />
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-white bg-opacity-10 text-white py-2 rounded-lg hover:bg-opacity-20 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}