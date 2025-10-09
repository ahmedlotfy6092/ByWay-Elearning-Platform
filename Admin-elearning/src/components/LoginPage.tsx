import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Search, ArrowRight } from "lucide-react";
import loginBg from "../assets/loginImg.svg";
import { login } from "../api/services";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      let message = "Login failed";
      if (err instanceof Error) {
        message = err.message;
      } else if (err && typeof err === "object" && "response" in err) {
        const resp = (err as { response?: { data?: { message?: string } } }).response;
        if (resp?.data?.message) {
          message = resp.data.message;
        }
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // full viewport height and disable page scrolling; left column will scroll internally
    <div className="min-h-screen h-screen flex overflow-hidden">
      {/* Left side - Login form */}
      <div className="flex-1 flex flex-col overflow-auto min-h-0 min-w-0 lg:mr-[44%]">
        {/* Header */}
        <header className="px-12 py-6 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-sm"></div>
            </div>
            <span className="text-[20px] font-medium">Byway</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses"
                className="pl-10 w-[400px] bg-white border-border"
              />
            </div>
            <button className="text-foreground hover:text-foreground/80">
              Courses
            </button>
          </div>
        </header>

        {/* Login form */}
        <div className="flex-1 flex items-center justify-center px-12 min-h-0 overflow-hidden">
          <div className="w-full max-w-[480px]">
            <h1 className="mb-8">Sign in to your account</h1>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <Label htmlFor="email" className="mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Username or Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-border"
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="password" className="mb-2 block">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border-border"
                />
              </div>

              <Button
                type="submit"
                className="bg-[#030213] hover:bg-[#030213]/90 text-white px-6 py-2 rounded-md flex items-center gap-2"
              >
                {loading ? "Signing in…" : "Sign In"}
                <ArrowRight className="w-4 h-4" />
              </Button>
              {error && (
                <div className="text-sm text-red-500 mt-3">{error}</div>
              )}
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-muted-foreground text-sm">
                Sign in with
              </span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Social login buttons */}
            <div className="flex gap-4">
              <button className="flex-1 px-4 py-3 border border-border rounded-lg hover:bg-accent flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </button>
              <button className="flex-1 px-4 py-3 border border-border rounded-lg hover:bg-accent flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Google</span>
              </button>
              <button className="flex-1 px-4 py-3 border border-border rounded-lg hover:bg-accent flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
                  <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                  <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                  <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                  <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
                </svg>
                <span>Microsoft</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Background image */}
      {/* Right side - Background image (full-height, fixed within layout) */}
      <div className="hidden lg:block lg:fixed lg:top-0 lg:right-0 lg:h-screen lg:w-[44%] overflow-hidden">
        <img
          src={loginBg}
          alt="Person typing on laptop"
          className="block w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
