import { Search, ShoppingCart, MessageSquare } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Footer } from "../components/Footer";

export function PurchaseComplete() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg"></div>
              <span className="text-xl">Byway</span>
            </a>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search courses"
                className="pl-10 bg-input-background border-transparent"
              />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <a href="#courses" className="text-foreground hover:text-muted-foreground transition-colors">
                Courses
              </a>
              <a href="#cart">
                <ShoppingCart className="w-5 h-5 text-foreground cursor-pointer" />
              </a>
              <MessageSquare className="w-5 h-5 text-foreground cursor-pointer" />
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
                J
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Success Content */}
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-32 h-32 bg-green-500 rounded-full mb-8">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-4xl mb-4">Purchase Complete</h1>
          <p className="text-muted-foreground mb-8">
            You Will Receive a confirmation email soon!
          </p>

          <Button 
            size="lg"
            className="px-12"
            onClick={() => window.location.hash = 'home'}
          >
            Back to home
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
