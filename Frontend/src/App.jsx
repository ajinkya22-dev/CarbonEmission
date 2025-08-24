import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { LandingPage } from "./Components/landing/LandingPage";
import { LoginForm } from "./Components/Auth/LoginForm";
import { SignupForm } from "./Components/Auth/SignupForm";
import { DashboardLayout } from "./Components/dashboard/DashboardLayout";
import { DashboardOverview } from "./Components/dashboard/DashboardOverview";
import { IndustryMetrics } from "./Components/dashboard/IndustryMetrics";
import LiveDemo from "./Components/livedemo/livedemo";
import { Toaster } from "./Components/ui/sonner";
import { toast } from "sonner";

function AppContent() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onGetStarted={() => navigate("/signup")}
            onLogin={() => navigate("/login")}
          />
        }
      />
      <Route
        path="/login"
        element={
          <LoginForm
            onLogin={async (email, password) => {
              // Mock authentication
              try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const industry = email.includes("manufacturing") ? "Manufacturing" :
                  email.includes("transport") ? "Transportation" :
                  email.includes("energy") ? "Energy & Utilities" :
                  email.includes("tech") ? "Technology" : "Manufacturing";
                setUser({
                  name: email.split("@")[0].replace(".", " "),
                  email,
                  industry
                });
                toast.success("Successfully logged in!");
                navigate("/dashboard");
              } catch {
                toast.error("Login failed. Please try again.");
              }
            }}
            onBackToLanding={() => navigate("/")}
            onGoToSignup={() => navigate("/signup")}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <SignupForm
            onSignup={async (email, password, name, industry) => {
              try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                setUser({ name, email, industry });
                toast.success("Account created successfully!");
                navigate("/dashboard");
              } catch {
                toast.error("Signup failed. Please try again.");
              }
            }}
            onBackToLanding={() => navigate("/")}
            onGoToLogin={() => navigate("/login")}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <DashboardLayout
            user={user}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            onLogout={() => {
              setUser(null);
              toast.info("You have been logged out.");
              navigate("/");
            }}
          >
            {activeSection === "overview" ? (
              <DashboardOverview user={user} />
            ) : (
              <IndustryMetrics user={user} />
            )}
          </DashboardLayout>
        }
      />
      <Route path="/livedemo" element={<LiveDemo />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Toaster richColors position="top-center" />
    </BrowserRouter>
  );
}