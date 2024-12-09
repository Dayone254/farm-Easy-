import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Crops from "./pages/Crops";
import Market from "./pages/Market";
import Orders from "./pages/Orders";
import Weather from "./pages/Weather";
import Financing from "./pages/Financing";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-[#F5F5DC]">
          <Navigation />
          <main className="pt-20 px-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/crops" element={<Crops />} />
              <Route path="/market" element={<Market />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/financing" element={<Financing />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;