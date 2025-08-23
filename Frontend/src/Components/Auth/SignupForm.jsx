import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Lock, Mail, User, Building, ArrowLeft, ChevronDown } from "lucide-react";

export function SignupForm({ onSignup, onBackToLanding, onGoToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(email, password, name, industry);
  };

  const industries = [
    "Manufacturing",
    "Transportation",
    "Energy & Utilities",
    "Construction",
    "Agriculture",
    "Technology",
    "Healthcare",
    "Retail",
    "Food & Beverage",
    "Other"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBackToLanding}
          className="flex items-center gap-1 text-green-700 hover:text-green-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>

      <Card className="w-full max-w-md shadow-lg border-green-100">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🌱</span>
            </div>
            Carbon Control
          </CardTitle>
          <CardDescription className="text-md">
            Create your carbon emission tracking account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 border-green-100 focus:border-green-300 transition-all"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-green-100 focus:border-green-300 transition-all"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-green-100 focus:border-green-300 transition-all"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
                <div className="relative">
                  <button
                    type="button"
                    className="w-full pl-10 py-2 px-3 border border-green-100 rounded-md flex items-center justify-between bg-white hover:border-green-300 transition-all"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className={industry ? "text-black" : "text-gray-400"}>
                      {industry || "Select your industry"}
                    </span>
                    <ChevronDown className="h-4 w-4 text-green-600" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-green-100 rounded-md shadow-lg max-h-60 overflow-auto">
                      {industries.map((ind) => (
                        <div
                          key={ind}
                          className="px-3 py-2 hover:bg-green-50 cursor-pointer"
                          onClick={() => {
                            setIndustry(ind);
                            setDropdownOpen(false);
                          }}
                        >
                          {ind}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="hidden"
                  id="industry"
                  name="industry"
                  value={industry}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all"
            >
              Create Account
            </Button>
          </form>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onGoToLogin}
              className="text-sm text-green-600 hover:text-green-800 underline underline-offset-2 transition-colors"
            >
              Already have an account? Sign in
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
