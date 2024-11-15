import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Scanner } from './components/Scanner';
import { ScanList } from './components/ScanList';
import { Settings } from './components/Settings';
import { PinProtection } from './components/PinProtection';
import { useStore } from './store/useStore';
import { FaPlus, FaCog, FaFolderPlus } from 'react-icons/fa';
import { Scan } from './models/types';

const CATEGORIES = ['All', 'Receipts', 'Documents', 'Bills'];

function App() {
    const { 
        scans, 
        portfolios,
        settings,
        isAuthenticated,
        addScan,
        addPortfolio
    } = useStore();

    const [showScanner, setShowScanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null);
    const [selectedScan, setSelectedScan] = useState<Scan | null>(null);

    if (settings.pinProtection && !isAuthenticated) {
        return <PinProtection />;
    }

    const handleCapture = (imageData: string) => {
        const newScan: Scan = {
            id: uuidv4(),
            fileName: `Scan_${new Date().toISOString()}`,
            imageData,
            category: selectedCategory === 'All' ? settings.defaultCategory : selectedCategory,
            portfolio: selectedPortfolio || undefined,
            tags: [],
            notes: '',
            createdAt: new Date(),
            fileType: 'jpeg'
        };

        addScan(newScan);
        setShowScanner(false);
    };

    const createPortfolio = () => {
        const name = prompt('Enter portfolio name:');
        if (name) {
            addPortfolio({
                id: uuidv4(),
                name,
                createdAt: new Date()
            });
        }
    };

    const filteredScans = scans.filter(scan => {
        const categoryMatch = selectedCategory === 'All' || scan.category === selectedCategory;
        const portfolioMatch = !selectedPortfolio || scan.portfolio === selectedPortfolio;
        return categoryMatch && portfolioMatch;
    });

    return (
        <div className={`min-h-screen ${settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <header className="bg-blue-500 bg-opacity-20 backdrop-blur-lg text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Sortfolio</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={createPortfolio}
                        className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
                    >
                        <FaFolderPlus size={20} />
                    </button>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
                    >
                        <FaCog size={20} />
                    </button>
                    <button
                        onClick={() => setShowScanner(true)}
                        className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
                    >
                        <FaPlus size={20} />
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                {showSettings ? (
                    <Settings />
                ) : (
                    <>
                        <div className="flex space-x-4 mb-6">
                            <div className="flex space-x-2 overflow-x-auto pb-2">
                                {CATEGORIES.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-lg transition-colors ${
                                            selectedCategory === category
                                                ? 'bg-blue-500 bg-opacity-80 text-white'
                                                : 'bg-white bg-opacity-20 text-gray-300'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            {portfolios.length > 0 && (
                                <select
                                    value={selectedPortfolio || ''}
                                    onChange={(e) => setSelectedPortfolio(e.target.value || null)}
                                    className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg"
                                >
                                    <option value="">All Portfolios</option>
                                    {portfolios.map(portfolio => (
                                        <option key={portfolio.id} value={portfolio.id}>
                                            {portfolio.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <ScanList
                            scans={filteredScans}
                            onSelect={setSelectedScan}
                        />
                    </>
                )}
            </main>

            {showScanner && (
                <Scanner
                    onCapture={handleCapture}
                    onClose={() => setShowScanner(false)}
                />
            )}

            {selectedScan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 max-w-2xl w-full mx-4">
                        <img
                            src={selectedScan.imageData}
                            alt={selectedScan.fileName}
                            className="w-full rounded-lg"
                        />
                        <button
                            onClick={() => setSelectedScan(null)}
                            className="mt-4 w-full bg-white bg-opacity-10 text-white py-2 rounded-lg hover:bg-opacity-20 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;