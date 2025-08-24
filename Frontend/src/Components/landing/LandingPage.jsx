import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Factory, 
  Truck, 
  Zap, 
  Shield, 
  Target, 
  TrendingDown,
  Globe,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Leaf,
  Monitor,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const industries = [
  {
    name: "Manufacturing",
    icon: <Factory className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1742970936099-b68c962278c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYWN0b3J5JTIwbWFudWZhY3R1cmluZyUyMGluZHVzdHJpYWx8ZW58MXx8fHwxNzU1ODc5MzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Optimize production processes and reduce industrial emissions"
  },
  {
    name: "Energy & Utilities",
    icon: <Zap className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1689273589877-2ae23a0ddbab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjB3aW5kJTIwc29sYXIlMjBwb3dlcnxlbnwxfHx8fDE3NTU4NzkzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Track renewable energy adoption and grid efficiency"
  },
  {
    name: "Transportation",
    icon: <Truck className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1749066479020-88be53e0352d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHRyYW5zcG9ydGF0aW9uJTIwZWxlY3RyaWMlMjB2ZWhpY2xlfGVufDF8fHx8MTc1NTg3OTM1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Monitor fleet efficiency and sustainable logistics"
  },
  {
    name: "Agriculture",
    icon: <Leaf className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1725338281767-5bbd183e5b54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGFncmljdWx0dXJlJTIwZmFybWluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU1ODc5MzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Implement sustainable farming and carbon sequestration"
  }
];

const features = [
  {
    icon: <BarChart3 className="h-8 w-8 text-green-600" />,
    title: "Real-time Monitoring",
    description: "Track your carbon emissions in real-time with advanced analytics and automated data collection from multiple sources."
  },
  {
    icon: <Target className="h-8 w-8 text-blue-600" />,
    title: "Goal Setting & Tracking",
    description: "Set science-based reduction targets and monitor progress with detailed reporting and milestone tracking."
  },
  {
    icon: <Shield className="h-8 w-8 text-purple-600" />,
    title: "Compliance Management",
    description: "Stay compliant with global standards like ISO 14001, CDP, and prepare for upcoming carbon regulations."
  }
];

const stats = [
  { label: "CO2 Reduced", value: "2.5M+", unit: "tons" },
  { label: "Companies", value: "1,200+", unit: "worldwide" },
  { label: "Industries", value: "15+", unit: "sectors" },
  { label: "Cost Savings", value: "$450M+", unit: "achieved" }
];

export function LandingPage({ onGetStarted, onLogin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🌱</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Carbon Control</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Emission Management Platform</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('industries')} 
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Industries
              </button>
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Benefits
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Pricing
              </button>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" onClick={onLogin}>
                Sign In
              </Button>
              <Button onClick={onGetStarted} className="bg-green-600 hover:bg-green-700">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-left px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('industries')}
                  className="text-left px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  Industries
                </button>
                <button 
                  onClick={() => scrollToSection('benefits')}
                  className="text-left px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  Benefits
                </button>
                <div className="px-4 pt-4 flex flex-col gap-2">
                  <Button variant="ghost" onClick={onLogin} className="justify-start">
                    Sign In
                  </Button>
                  <Button onClick={onGetStarted} className="bg-green-600 hover:bg-green-700 justify-start">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              ✨ Now supporting 15+ industries worldwide
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Take Control of Your
              <span className="text-green-600 block">Carbon Footprint</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              The most comprehensive carbon emission tracking and reduction platform. 
              Monitor, analyze, and reduce your environmental impact with industry-specific insights and AI-powered recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={()=> navigate("/livedemo")}
                className="text-lg px-8 py-3 border-green-200 hover:bg-green-50"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
                <div className="text-xs md:text-sm text-gray-500">{stat.unit}</div>
              </div>
            ))}
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-1">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1709450245503-4f903ffea3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwdGVjaG5vbG9neSUyMGNhcmJvbiUyMGZvb3RwcmludHxlbnwxfHx8fDE3NTU4NzkzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Carbon Control Dashboard"
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Every Industry
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides comprehensive tools to measure, track, and reduce carbon emissions 
              across all sectors of your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Globe className="h-6 w-6" />, title: "Global Standards", desc: "ISO 14001, CDP compliant" },
              { icon: <Users className="h-6 w-6" />, title: "Team Collaboration", desc: "Multi-user dashboard access" },
              { icon: <Award className="h-6 w-6" />, title: "Certifications", desc: "Generate compliance reports" },
              { icon: <Monitor className="h-6 w-6" />, title: "API Integration", desc: "Connect existing systems" }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 md:p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-green-600 mb-3 flex justify-center">{item.icon}</div>
                <h4 className="font-semibold mb-2 text-sm md:text-base">{item.title}</h4>
                <p className="text-xs md:text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tailored Solutions for Every Industry
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Get industry-specific insights and recommendations designed for your sector's unique challenges and opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow border-0">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      {industry.icon}
                      <h3 className="font-semibold">{industry.name}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm md:text-base">{industry.description}</p>
                  <Button variant="ghost" className="mt-4 p-0 h-auto text-green-600 hover:text-green-700">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Carbon Control?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Join over 1,200 companies worldwide who trust our platform to manage their environmental impact and achieve their sustainability goals.
              </p>
              
              <div className="space-y-6">
                {[
                  "Reduce operational costs by up to 30%",
                  "Meet compliance requirements automatically",
                  "AI-powered optimization recommendations",
                  "Real-time monitoring and alerts",
                  "Industry-leading data security",
                  "24/7 expert support and training"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="mt-8 bg-green-600 hover:bg-green-700"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1600226105158-b27c51d53905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGNpdHklMjBzdXN0YWluYWJpbGl0eSUyMGdyZWVuJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU1ODc5MzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Sustainable Smart City"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <TrendingDown className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="font-bold text-2xl text-gray-900">-45%</div>
                    <div className="text-sm text-gray-600">Average Reduction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-16 md:py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Reduce Your Carbon Footprint?
          </h2>
          <p className="text-lg md:text-xl text-green-100 mb-8">
            Join thousands of companies already making a difference. Start your free trial today and see the impact in 30 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onLogin}
              className="text-white border-white hover:bg-white/10 text-lg px-8 py-3"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white">🌱</span>
                </div>
                <span className="font-bold">Carbon Control</span>
              </div>
              <p className="text-gray-400 text-sm">
                Leading carbon emission management platform for sustainable business operations.
              </p>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Industries", "Pricing", "API"]
              },
              {
                title: "Company",
                links: ["About", "Careers", "Contact", "Blog"]
              },
              {
                title: "Support",
                links: ["Help Center", "Documentation", "Status", "Security"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="text-sm">&copy; 2024 Carbon Control. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
