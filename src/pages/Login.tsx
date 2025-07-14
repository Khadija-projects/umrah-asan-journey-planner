import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
// Fixed imports to use default exports
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Demo credentials
  const demoCredentials = [
    { type: "Admin", email: "admin@umrahasan.com", password: "admin123" },
    { type: "Partner", email: "partner@umrahasan.com", password: "partner123" },
    { type: "Guest", email: "guest@umrahasan.com", password: "guest123" }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Check demo credentials
    const credential = demoCredentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (credential) {
      // Simulate login delay
      setTimeout(() => {
        localStorage.setItem("umrah_user", JSON.stringify({
          email: credential.email,
          type: credential.type.toLowerCase(),
          name: `Demo ${credential.type}`
        }));
        
        // Redirect based on user type
        if (credential.type === "Admin") {
          navigate("/admin-dashboard");
        } else if (credential.type === "Partner") {
          navigate("/partner-dashboard");
        } else {
          navigate("/guest-dashboard");
        }
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setError("Invalid email or password. Please try demo credentials.");
        setIsLoading(false);
      }, 1000);
    }
  };

  const fillDemoCredentials = (type: string) => {
    const cred = demoCredentials.find(c => c.type === type);
    if (cred) {
      setEmail(cred.email);
      setPassword(cred.password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <Card className="shadow-lg border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your Umrah Asan account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Demo Credentials Section */}
              <div className="bg-muted/50 p-4 rounded-lg border">
                <h3 className="font-semibold text-sm mb-3 text-center">Demo Credentials</h3>
                <div className="space-y-2">
                  {demoCredentials.map((cred, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="text-xs">
                        <div className="font-medium">{cred.type}</div>
                        <div className="text-muted-foreground">{cred.email}</div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fillDemoCredentials(cred.type)}
                        className="text-xs"
                      >
                        Use
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary hover:underline">
                    Register here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;