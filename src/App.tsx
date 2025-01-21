import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Crops from "./pages/Crops";
import Market from "./pages/Market";
import Orders from "./pages/Orders";
import Weather from "./pages/Weather";
import Financing from "./pages/Financing";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import { useUser } from "./contexts/UserContext";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userProfile } = useUser();
  if (!userProfile?.name) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const pageVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.15,
};

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <Navigation />
      <AnimatePresence mode="sync" initial={false}>
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          className="pt-20 px-4"
        >
          <Routes location={location}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
            <Route path="/crops" element={<ProtectedRoute><Crops /></ProtectedRoute>} />
            <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/financing" element={<ProtectedRoute><Financing /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;