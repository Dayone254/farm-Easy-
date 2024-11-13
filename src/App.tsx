import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";

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
              <Route path="/app" element={<Index />} />
              <Route path="/weather" element={<Index />} />
              <Route path="/crops" element={<Index />} />
              <Route path="/market" element={<Index />} />
              <Route path="/orders" element={<Index />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;