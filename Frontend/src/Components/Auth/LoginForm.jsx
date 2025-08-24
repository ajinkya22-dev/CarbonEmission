import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Lock, Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LoginForm({ onLogin, onBackToLanding, onGoToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
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
            Sign in to your carbon emission dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-green-100 focus:border-green-300 transition-all"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all"
            >
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-sm text-green-600 hover:text-green-800 underline underline-offset-2 transition-colors"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
