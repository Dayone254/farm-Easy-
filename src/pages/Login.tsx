import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import type { UserType } from "@/contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { updateProfile } = useUser();
  const [userType, setUserType] = useState<UserType>("farmer");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phoneNumber) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    updateProfile({
      name,
      phoneNumber,
      userType,
      isVerified: false,
    });

    toast({
      title: "Welcome!",
      description: "You have successfully logged in.",
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC] px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2F5233]">Welcome to FarmEasy</h1>
          <p className="text-gray-600 mt-2">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>I am a:</Label>
            <RadioGroup
              value={userType}
              onValueChange={(value: UserType) => setUserType(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="farmer" id="farmer" />
                <Label htmlFor="farmer">Farmer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vendor" id="vendor" />
                <Label htmlFor="vendor">Vendor</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          <Button type="submit" className="w-full bg-[#2F5233] hover:bg-[#1F371F]">
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;