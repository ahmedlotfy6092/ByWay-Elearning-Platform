import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function SignIn() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border">
          <div className="max-w-2xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <a href="#home" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg"></div>
                <span className="text-xl">Byway</span>
              </a>
              <div className="flex items-center gap-4">
                <a href="#courses" className="text-foreground hover:text-muted-foreground transition-colors">
                  Courses
                </a>
                <Button variant="outline" onClick={() => window.location.hash = 'signin'}>
                  Log In
                </Button>
                <Button onClick={() => window.location.hash = 'signup'}>Sign Up</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-md">
            <h1 className="text-3xl mb-8">Sign in to your account</h1>

            <form className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Username or Email ID"
                  className="mt-2 bg-input-background border-transparent"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  className="mt-2 bg-input-background border-transparent"
                />
              </div>

              <Button className="w-fit px-8 gap-2" size="lg">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-muted-foreground">
                  Sign in with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="gap-2 bg-input-background border-transparent hover:bg-muted"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                Facebook
              </Button>

              <Button
                variant="outline"
                className="gap-2 bg-input-background border-transparent hover:bg-muted"
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
                Google
              </Button>

              <Button
                variant="outline"
                className="gap-2 bg-input-background border-transparent hover:bg-muted"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#00A4EF"
                    d="M0 0h11.377v11.372H0z"
                  />
                  <path
                    fill="#FFB900"
                    d="M12.623 0H24v11.372H12.623z"
                  />
                  <path
                    fill="#05A6F0"
                    d="M0 12.628h11.377V24H0z"
                  />
                  <path
                    fill="#FFBA08"
                    d="M12.623 12.628H24V24H12.623z"
                  />
                </svg>
                Microsoft
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1625297670911-8311cd5e7832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB0eXBpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzU5ODM0NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Person typing on laptop"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
