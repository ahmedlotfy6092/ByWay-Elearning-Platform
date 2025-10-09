import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl leading-tight mb-4">
              Unlock Your Potential with Byway
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Welcome to Byway, where learning knows no bounds. We believe that
              education is the key to personal and professional growth, and we're
              here to guide you on your journey to success.
            </p>
            <Button size="lg" className="px-8">
              Start your journey
            </Button>
          </div>

          {/* Right Content - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Top Left */}
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-red-400 to-red-500 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758874573116-2bc02232eef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBvbmxpbmV8ZW58MXx8fHwxNzU5ODY1MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Student learning"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Top Right */}
              <div className="relative pt-8">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbnN0cnVjdG9yJTIwdGVhY2hpbmd8ZW58MXx8fHwxNzU5OTE5NTc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Professional instructor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs">Live</span>
                  </div>
                </div>
              </div>

              {/* Bottom Right */}
              <div className="col-start-2">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTk4NTY1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Happy student"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-yellow-100 px-3 py-2 rounded-lg shadow-lg">
                  <p className="text-xs">250K</p>
                  <p className="text-xs text-muted-foreground">Assisted Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
