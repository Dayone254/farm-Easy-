import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCheck, MapPin, Phone, Camera, CheckCircle } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const Profile = () => {
  const { toast } = useToast();
  const { userProfile, updateProfile } = useUser();
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isLocationVerified, setIsLocationVerified] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerifyPhone = () => {
    setIsPhoneVerified(true);
    updateProfile({ isVerified: true });
    toast({
      title: "Phone Verified",
      description: "Your phone number has been successfully verified.",
    });
  };

  const handleVerifyLocation = () => {
    setIsLocationVerified(true);
    toast({
      title: "Location Verified",
      description: "Your location has been successfully verified.",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    updateProfile({
      name: formData.get("name") as string,
      phoneNumber: formData.get("phone") as string,
      location: formData.get("location") as string,
      bio: formData.get("bio") as string,
    });

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userProfile?.profileImage || ""} />
              <AvatarFallback>
                <UserCheck className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90"
            >
              <Camera className="h-4 w-4" />
            </label>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Farmer Profile</h1>
            <p className="text-muted-foreground">
              Complete your profile to start selling
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name">Full Name</label>
            <Input
              id="name"
              name="name"
              defaultValue={userProfile?.name}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bio">Bio</label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={userProfile?.bio}
              placeholder="Tell us about your farming experience"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Phone Number</span>
              {isPhoneVerified && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </label>
            <div className="flex space-x-2">
              <Input
                id="phone"
                name="phone"
                defaultValue={userProfile?.phoneNumber}
                placeholder="Enter your phone number"
              />
              <Button
                type="button"
                onClick={handleVerifyPhone}
                disabled={isPhoneVerified}
              >
                Verify
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Location</span>
              {isLocationVerified && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </label>
            <div className="flex space-x-2">
              <Input
                id="location"
                name="location"
                defaultValue={userProfile?.location}
                placeholder="Enter your location"
              />
              <Button
                type="button"
                onClick={handleVerifyLocation}
                disabled={isLocationVerified}
              >
                Verify
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;