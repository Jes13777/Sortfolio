import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const PinProtection: React.FC = () => {
    const [pin, setPin] = useState('');
    const { authenticate, setAuthenticated } = useStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (authenticate(pin)) {
            setAuthenticated(true);
        } else {
            setPin('');
            alert('Incorrect PIN');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-white border-opacity-20">
                <h2 className="text-2xl font-bold text-white mb-6">Enter PIN</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="w-full px-4 py-2 bg-white bg-opacity-10 rounded-lg text-white text-center text-2xl tracking-widest mb-4"
                        placeholder="****"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                    >
                        Unlock
                    </button>
                </form>
            </div>
        </div>
    );
}