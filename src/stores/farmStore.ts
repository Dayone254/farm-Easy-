import { create } from 'zustand';

export interface CropDetail {
  name: string;
  area: string;
  plantingDate: string;
  expectedHarvest: string;
  status: "Healthy" | "Needs Attention" | "Critical";
}

interface FarmStore {
  farmDetails: {
    location: string;
    totalArea: string;
    crops: CropDetail[];
  } | null;
  setFarmDetails: (details: { location: string; totalArea: string; crops: CropDetail[] }) => void;
}

export const useFarmStore = create<FarmStore>((set) => ({
  farmDetails: null,
  setFarmDetails: (details) => set({ farmDetails: details }),
}));