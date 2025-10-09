import { Facebook, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function SignUp() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1596443019365-eb263a588404?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2UlMjBsYXB0b3AlMjBtaW5pbWFsfGVufDF8fHx8MTc1OTkyMzY0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Workspace"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <a href="#home" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg"></div>
                <span className="text-xl">Byway</span>
              </a>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => (window.location.hash = "signin")}
                >
                  Log In
                </Button>
                <Button onClick={() => (window.location.hash = "signup")}>
                  Sign Up
                </Button>
              </div>
            </div>
            <h1 className="text-3xl mb-2">Create Your Account</h1>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block mb-2">Full Name</label>
              <div className="grid grid-cols-2 gap-3">
                <Input type="text" placeholder="First Name" />
                <Input type="text" placeholder="Last Name" />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block mb-2">Username</label>
              <Input type="text" placeholder="Username" />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2">Email</label>
              <Input type="email" placeholder="Email ID" />
            </div>

            {/* Password */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-2">Password</label>
                <Input type="password" placeholder="Enter Password" />
              </div>
              <div>
                <label className="block mb-2">Confirm Password</label>
                <Input type="password" placeholder="Confirm Password" />
              </div>
            </div>

            {/* Create Account Button */}
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Create Account
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">
                  Sign up with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Facebook className="w-5 h-5 text-blue-600" fill="currentColor" />
                <span>Facebook</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
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
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#F25022"
                    d="M11.4 11.4H0V0h11.4v11.4z"
                  />
                  <path
                    fill="#7FBA00"
                    d="M24 11.4H12.6V0H24v11.4z"
                  />
                  <path
                    fill="#00A4EF"
                    d="M11.4 24H0V12.6h11.4V24z"
                  />
                  <path
                    fill="#FFB900"
                    d="M24 24H12.6V12.6H24V24z"
                  />
                </svg>
                <span>Microsoft</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
