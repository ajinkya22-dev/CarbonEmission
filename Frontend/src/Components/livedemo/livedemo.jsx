import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { TrendingUp, Leaf, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LiveDemo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <Card className="shadow-xl border-green-100 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Leaf className="text-green-600" />
              Carbon Control Demo Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-100 rounded-lg p-6 text-center">
                <TrendingUp className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <div className="font-bold text-2xl text-green-700">-32%</div>
                <div className="text-sm text-gray-700">Emissions Reduced</div>
              </div>
              <div className="bg-blue-100 rounded-lg p-6 text-center">
                <Users className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                <div className="font-bold text-2xl text-blue-700">12</div>
                <div className="text-sm text-gray-700">Active Team Members</div>
              </div>
              <div className="bg-yellow-100 rounded-lg p-6 text-center">
                <Leaf className="mx-auto mb-2 h-8 w-8 text-yellow-600" />
                <div className="font-bold text-2xl text-yellow-700">5</div>
                <div className="text-sm text-gray-700">Sustainability Projects</div>
              </div>
            </div>
            <div className="text-center mb-4">
              <p className="text-lg text-gray-700">
                Explore how your dashboard could look! Track emissions, manage projects, and collaborate with your team.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={() => navigate("/signup")} className="bg-green-600 hover:bg-green-700">
                Try for Free
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}