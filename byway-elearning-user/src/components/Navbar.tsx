import { Search, ShoppingCart, Bell, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg"></div>
            <span className="text-xl">Byway</span>
          </Link>

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
            <Link to="/courses" className="text-foreground hover:text-muted-foreground transition-colors">
              Courses
            </Link>
            <div className="relative cursor-pointer">
              <Link to="/cart">
                <ShoppingCart className="w-5 h-5 text-foreground" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Link>
            </div>
            <Bell className="w-5 h-5 text-foreground cursor-pointer" />
            <MessageSquare className="w-5 h-5 text-foreground cursor-pointer" />
            
            <Button variant="outline" onClick={()=>navigate("/signin")}>
              Log In
            </Button>
            <Button onClick={()=>navigate("/signup")}>Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
