import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const Profile = () => {
  const { userProfile, updateProfile } = useUser();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const updates = {
      name: formData.get("name") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      location: formData.get("location") as string,
      bio: formData.get("bio") as string,
    };

    updateProfile(updates);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
        <Avatar className="w-32 h-32 mx-auto mb-4">
          <AvatarImage src={userProfile?.profileImage || ""} alt={userProfile?.name} />
          <AvatarFallback className="text-2xl">
            {userProfile?.name?.charAt(0)?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold text-[#2F5233]">
          Welcome, {userProfile?.name || "User"}!
        </h1>
        <p className="text-gray-600">
          {userProfile?.userType === "farmer" ? "Farmer" : "Vendor"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={userProfile?.name}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            defaultValue={userProfile?.phoneNumber}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            defaultValue={userProfile?.location}
            placeholder="Enter your location"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            defaultValue={userProfile?.bio}
            placeholder="Tell us about yourself"
            className="h-32"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profileImage">Profile Picture</Label>
          <Input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer"
          />
        </div>

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default Profile;