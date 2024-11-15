import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Scan, Portfolio, Settings } from '../models/types';

interface State {
    scans: Scan[];
    portfolios: Portfolio[];
    settings: Settings;
    isAuthenticated: boolean;
    addScan: (scan: Scan) => void;
    updateScan: (id: string, scan: Partial<Scan>) => void;
    deleteScan: (id: string) => void;
    addPortfolio: (portfolio: Portfolio) => void;
    deletePortfolio: (id: string) => void;
    updateSettings: (settings: Partial<Settings>) => void;
    authenticate: (pin: string) => boolean;
    setAuthenticated: (value: boolean) => void;
}

export const useStore = create<State>()(
    persist(
        (set, get) => ({
            scans: [],
            portfolios: [],
            settings: {
                pinProtection: false,
                theme: 'light',
                defaultCategory: 'Documents'
            },
            isAuthenticated: false,

            addScan: (scan) => set((state) => ({ 
                scans: [...state.scans, scan] 
            })),

            updateScan: (id, updatedScan) => set((state) => ({
                scans: state.scans.map(scan => 
                    scan.id === id ? { ...scan, ...updatedScan } : scan
                )
            })),

            deleteScan: (id) => set((state) => ({
                scans: state.scans.filter(scan => scan.id !== id)
            })),

            addPortfolio: (portfolio) => set((state) => ({
                portfolios: [...state.portfolios, portfolio]
            })),

            deletePortfolio: (id) => set((state) => ({
                portfolios: state.portfolios.filter(p => p.id !== id),
                scans: state.scans.map(scan => 
                    scan.portfolio === id ? { ...scan, portfolio: undefined } : scan
                )
            })),

            updateSettings: (newSettings) => set((state) => ({
                settings: { ...state.settings, ...newSettings }
            })),

            authenticate: (pin) => {
                const { settings } = get();
                return !settings.pinProtection || settings.pin === pin;
            },

            setAuthenticated: (value) => set({ isAuthenticated: value })
        }),
        {
            name: 'sortfolio-storage'
        }
    )
);