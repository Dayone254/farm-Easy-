import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CropDetail {
  name: string;
  area: string;
  plantingDate: string;
  expectedHarvest: string;
  status: "Healthy" | "Needs Attention" | "Critical";
}

export interface SoilDetail {
  type: string;
  texture: string;
  organicMatter: string;
  drainage: string;
  elevation: string;
  previousCrops: string;
  irrigationSource: string;
}

interface FarmStore {
  farmDetails: {
    location: string;
    totalArea: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    crops: CropDetail[];
    soil: SoilDetail;
  } | null;
  setFarmDetails: (details: {
    location: string;
    totalArea: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    crops: CropDetail[];
    soil: SoilDetail;
  }) => void;
  clearFarmDetails: () => void;
}

export const useFarmStore = create<FarmStore>()(
  persist(
    (set) => ({
      farmDetails: null,
      setFarmDetails: (details) => set({ farmDetails: details }),
      clearFarmDetails: () => set({ farmDetails: null }),
    }),
    {
      name: 'farm-storage', // unique name for localStorage key
    }
  )
);