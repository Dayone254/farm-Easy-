import React, { createContext, useContext, useState } from "react";

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
}

interface UserContextType {
  userProfile: UserProfile | null;
  updateProfile: (profile: Partial<UserProfile>) => void;
  isProfileComplete: boolean;
}

const defaultProfile: UserProfile = {
  id: "",
  name: "",
  phoneNumber: "",
  location: "",
  isVerified: false,
  profileImage: null,
  bio: "",
  userType: "buyer",  // Changed default to buyer
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const updateProfile = (newData: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...newData };
      localStorage.setItem("userProfile", JSON.stringify(updated));
      return updated;
    });
  };

  const isProfileComplete = Boolean(
    userProfile &&
    userProfile.name &&
    userProfile.phoneNumber &&
    userProfile.location
  );

  return (
    <UserContext.Provider value={{ userProfile, updateProfile, isProfileComplete }}>
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