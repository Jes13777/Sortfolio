import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const Settings: React.FC = () => {
    const { settings, updateSettings } = useStore();
    const [newPin, setNewPin] = useState('');
    const [showPinInput, setShowPinInput] = useState(false);

    const handlePinProtectionToggle = () => {
        if (!settings.pinProtection) {
            setShowPinInput(true);
        } else {
            updateSettings({ pinProtection: false, pin: undefined });
        }
    };

    const handlePinSubmit = () => {
        if (newPin.length === 4) {
            updateSettings({ pinProtection: true, pin: newPin });
            setShowPinInput(false);
            setNewPin('');
        }
    };

    return (
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white border-opacity-20">
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <label className="text-white">PIN Protection</label>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handlePinProtectionToggle}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                settings.pinProtection
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white bg-opacity-10 text-gray-300'
                            }`}
                        >
                            {settings.pinProtection ? 'Enabled' : 'Disabled'}
                        </button>
                    </div>
                </div>

                {showPinInput && (
                    <div className="space-y-2">
                        <input
                            type="password"
                            maxLength={4}
                            value={newPin}
                            onChange={(e) => setNewPin(e.target.value)}
                            placeholder="Enter 4-digit PIN"
                            className="w-full px-4 py-2 bg-white bg-opacity-10 rounded-lg text-white"
                        />
                        <button
                            onClick={handlePinSubmit}
                            className="w-full bg-blue-500 text-white py-2 rounded-lg"
                        >
                            Set PIN
                        </button>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <label className="text-white">Default Category</label>
                    <select
                        value={settings.defaultCategory}
                        onChange={(e) => updateSettings({ defaultCategory: e.target.value })}
                        className="bg-white bg-opacity-10 text-white px-4 py-2 rounded-lg"
                    >
                        <option value="Documents">Documents</option>
                        <option value="Receipts">Receipts</option>
                        <option value="Bills">Bills</option>
                    </select>
                </div>

                <div className="flex items-center justify-between">
                    <label className="text-white">Theme</label>
                    <select
                        value={settings.theme}
                        onChange={(e) => updateSettings({ theme: e.target.value as 'light' | 'dark' })}
                        className="bg-white bg-opacity-10 text-white px-4 py-2 rounded-lg"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            </div>
        </div>
    );
}