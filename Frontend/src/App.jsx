import { useState } from "react";
import { LandingPage } from "./Components/landing/LandingPage";
import { LoginForm } from "./Components/Auth/LoginForm";
import { SignupForm } from "./Components/Auth/SignupForm";
import { DashboardLayout } from "./Components/dashboard/DashboardLayout";
import { DashboardOverview } from "./Components/dashboard/DashboardOverview";
import { IndustryMetrics } from "./Components/dashboard/IndustryMetrics";
import { Toaster } from "./Components/ui/sonner";
import { toast } from "sonner";

export default function App() {
    const [user, setUser] = useState(null);
    const [appState, setAppState] = useState("landing");
    const [activeSection, setActiveSection] = useState("overview");

    const handleLogin = async (email, password) => {
        // Mock authentication - in real app, this would be an API call
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock user data based on email domain
            const industry = email.includes("manufacturing") ? "Manufacturing" :
                email.includes("transport") ? "Transportation" :
                    email.includes("energy") ? "Energy & Utilities" :
                        email.includes("tech") ? "Technology" : "Manufacturing";

            setUser({
                name: email.split("@")[0].replace(".", " "),
                email,
                industry
            });

            setAppState("dashboard");
            toast.success("Successfully logged in!");
        } catch (error) {
            toast.error("Login failed. Please try again.");
        }
    };

    const handleSignup = async (email, password, name, industry) => {
        // Mock registration - in real app, this would be an API call
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            setUser({
                name,
                email,
                industry
            });

            setAppState("dashboard");
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error("Signup failed. Please try again.");
        }
    };

    const handleLogout = () => {
        setUser(null);
        setAppState("landing");
        toast.info("You have been logged out.");
    };

    const renderContent = () => {
        switch (appState) {
            case "landing":
                return (
                    <LandingPage
                        onGetStarted={() => setAppState("signup")}
                        onLogin={() => setAppState("login")}
                    />
                );
            case "login":
                return (
                    <LoginForm
                        onLogin={handleLogin}
                        onBackToLanding={() => setAppState("landing")}
                        onGoToSignup={() => setAppState("signup")}
                    />
                );
            case "signup":
                return (
                    <SignupForm
                        onSignup={handleSignup}
                        onBackToLanding={() => setAppState("landing")}
                        onGoToLogin={() => setAppState("login")}
                    />
                );
            case "dashboard":
                return (
                    <DashboardLayout
                        user={user}
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                        onLogout={handleLogout}
                    >
                        {activeSection === "overview" ? (
                            <DashboardOverview
                                user={user}
                            />
                        ) : (
                            <IndustryMetrics
                                industry={user?.industry || "Manufacturing"}
                            />
                        )}
                    </DashboardLayout>
                );
            default:
                return null;
        }
    };

    return (
        <main className="min-h-screen bg-background font-sans antialiased dark:bg-muted-foreground/5">
            {renderContent()}
            <Toaster richColors position="top-center" />
        </main>
    );
}
