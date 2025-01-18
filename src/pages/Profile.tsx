import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserCheck, ShieldCheck, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userProfile, updateProfile } = useUser();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [verificationDocument, setVerificationDocument] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationDocument) {
      toast({
        title: "Document Required",
        description: "Please upload a verification document to proceed.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Verification Requested",
      description: "Your verification request has been submitted for review.",
    });

    console.log("Verification document submitted:", verificationDocument.name);
  };

  const handleVerificationDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVerificationDocument(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <Avatar className="w-32 h-32 mx-auto mb-4">
          <AvatarImage src={userProfile?.profileImage || ""} alt={userProfile?.name} />
          <AvatarFallback className="text-2xl">
            {userProfile?.name?.charAt(0)?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl font-bold text-[#2F5233]">
            Welcome, {userProfile?.name || "User"}!
          </h1>
          {userProfile?.isVerified && (
            <Badge variant="secondary" className="h-6">
              <UserCheck className="h-4 w-4 mr-1" />
              Verified
            </Badge>
          )}
        </div>
        <p className="text-gray-600">
          {userProfile?.userType === "farmer" ? "Farmer" : "Vendor"}
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Profile Form */}
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
            Save Profile Changes
          </Button>
        </form>

        {/* Verification Section */}
        <div className="border rounded-lg p-6 bg-secondary/10">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Account Verification</h2>
          </div>

          {userProfile?.isVerified ? (
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <UserCheck className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-700 font-medium">Your account is verified!</p>
              <p className="text-sm text-green-600">Enjoy all the benefits of being a verified user.</p>
            </div>
          ) : (
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <p className="text-sm text-gray-600">
                To verify your account, please upload a valid identification document
                (National ID, Passport, or Driver's License).
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="verificationDoc">Verification Document</Label>
                <Input
                  id="verificationDoc"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleVerificationDocumentChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, JPG, PNG. Max size: 5MB
                </p>
              </div>

              <Button type="submit" className="w-full" variant="secondary">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Submit Verification Request
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-8 border-t pt-8">
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
