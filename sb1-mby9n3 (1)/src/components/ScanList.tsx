import React, { useState } from 'react';
import { FaFileAlt, FaEdit, FaTrash, FaFolderOpen } from 'react-icons/fa';
import { useStore } from '../store/useStore';
import { Scan } from '../models/types';

interface ScanListProps {
    scans: Scan[];
    onSelect: (scan: Scan) => void;
}

export const ScanList: React.FC<ScanListProps> = ({ scans, onSelect }) => {
    const { portfolios, updateScan, deleteScan } = useStore();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');

    const startEdit = (scan: Scan) => {
        setEditingId(scan.id);
        setEditName(scan.fileName);
    };

    const saveEdit = (id: string) => {
        updateScan(id, { fileName: editName });
        setEditingId(null);
    };

    return (
        <div className="space-y-2">
            {scans.map(scan => (
                <div
                    key={scan.id}
                    className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-white border-opacity-20 flex items-center space-x-4"
                    onClick={() => onSelect(scan)}
                >
                    <FaFileAlt className="text-blue-400 text-2xl" />
                    <div className="flex-1">
                        {editingId === scan.id ? (
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onBlur={() => saveEdit(scan.id)}
                                className="bg-white bg-opacity-10 rounded px-2 py-1 text-white"
                                autoFocus
                            />
                        ) : (
                            <h3 className="font-semibold text-white">{scan.fileName}</h3>
                        )}
                        <div className="flex space-x-2 text-sm text-gray-300">
                            <span>{scan.category}</span>
                            {scan.portfolio && (
                                <span>
                                    • {portfolios.find(p => p.id === scan.portfolio)?.name}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                startEdit(scan);
                            }}
                            className="p-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteScan(scan.id);
                            }}
                            className="p-2 text-gray-300 hover:text-red-400 transition-colors"
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}