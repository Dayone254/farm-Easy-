import React, { createContext, useContext, useState } from "react";
import { Product } from "@/types/market";

export type UserType = "farmer" | "vendor" | "buyer";

interface UserProfile {
  id: string;
  name: string;
  phoneNumber: string;
  location: string;
  isVerified: boolean;
  profileImage: string | null;
  bio: string;
  userType: UserType;
  savedProducts: Product[];
}

interface UserContextType {
  userProfile: UserProfile | null;
  updateProfile: (profile: Partial<UserProfile>) => void;
  isProfileComplete: boolean;
  saveProduct: (product: Product) => void;
  unsaveProduct: (productId: string | number) => void;
  isSaved: (productId: string | number) => boolean;
}

const defaultProfile: UserProfile = {
  id: "",
  name: "",
  phoneNumber: "",
  location: "",
  isVerified: false,
  profileImage: null,
  bio: "",
  userType: "buyer",
  savedProducts: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultProfile,
        ...parsed,
        savedProducts: parsed.savedProducts || [],
      };
    }
    return defaultProfile;
  });

  const updateProfile = (newData: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...newData };
      localStorage.setItem("userProfile", JSON.stringify(updated));
      return updated;
    });
  };

  const saveProduct = (product: Product) => {
    setUserProfile((prev) => {
      if (!prev) return prev;
      const savedProducts = [...prev.savedProducts, product];
      const updated = { ...prev, savedProducts };
      localStorage.setItem("userProfile", JSON.stringify(updated));
      return updated;
    });
  };

  const unsaveProduct = (productId: string | number) => {
    setUserProfile((prev) => {
      if (!prev) return prev;
      const savedProducts = prev.savedProducts.filter(p => p.id !== productId);
      const updated = { ...prev, savedProducts };
      localStorage.setItem("userProfile", JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (productId: string | number) => {
    return userProfile?.savedProducts.some(p => p.id === productId) || false;
  };

  const isProfileComplete = Boolean(
    userProfile &&
    userProfile.name &&
    userProfile.phoneNumber &&
    userProfile.location
  );

  return (
    <UserContext.Provider value={{ 
      userProfile, 
      updateProfile, 
      isProfileComplete,
      saveProduct,
      unsaveProduct,
      isSaved
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};