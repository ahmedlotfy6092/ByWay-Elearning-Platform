import { Star, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Footer } from "../components/Footer";

export function ShoppingCart() {
  const cartItems = [
    {
      id: 1,
      title: "Introduction to User Experience Design",
      instructor: "John Doe",
      rating: 4.6,
      hours: 22,
      lectures: 155,
      level: "All levels",
      price: 45.0,
    },
    {
      id: 2,
      title: "Introduction to User Experience Design",
      instructor: "John Doe",
      rating: 4.6,
      hours: 22,
      lectures: 155,
      level: "All levels",
      price: 45.0,
    },
    {
      id: 3,
      title: "Introduction to User Experience Design",
      instructor: "John Doe",
      rating: 4.6,
      hours: 22,
      lectures: 155,
      level: "All levels",
      price: 45.0,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = 0;
  const tax = subtotal * 0.15;
  const total = subtotal - discount + tax;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg"></div>
                <span className="text-xl">Byway</span>
              </div>
              <div className="relative flex-1 max-w-md">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search courses"
                  className="w-full pl-10 pr-4 py-2 bg-input-background border-transparent rounded-md"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/#courses" className="text-foreground hover:text-muted-foreground transition-colors">
                Courses
              </a>
              <div className="relative">
                <svg className="w-5 h-5 text-foreground cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <svg className="w-5 h-5 text-foreground cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              <svg className="w-5 h-5 text-foreground cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <a href="/#courses" className="hover:text-foreground">
              Courses
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Shopping Cart</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl mb-8">Shopping Cart</h1>

        {/* Tabs */}
        <Tabs defaultValue="cart" className="mb-8">
          <TabsList className="border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="courses"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="cart"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Shopping Cart
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cart" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Cart Items */}
              <div className="lg:col-span-2">
                <p className="text-muted-foreground mb-6">{cartItems.length} Courses in cart</p>

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-border">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1740663173325-c3000e33c830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB0ZWFjaGluZyUyMGxhcHRvcCUyMGRlc2lnbnxlbnwxfHx8fDE3NTk5MjM5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt={item.title}
                        className="w-48 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">By {item.instructor}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-amber-500">{item.rating}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-4 h-4 fill-amber-500 text-amber-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.hours} Total Hours. {item.lectures} Lectures. {item.level}
                        </p>
                        <button className="text-sm text-red-500 mt-2 hover:text-red-600">Remove</button>
                      </div>
                      <div className="text-xl">${item.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Order Details */}
              <div className="lg:col-span-1">
                <div className="border border-border rounded-lg p-6">
                  <h3 className="mb-6">Order Details</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span>${discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pb-4 border-b border-border">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span className="text-xl">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => window.location.hash = 'checkout'}>Proceed to Checkout</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses">
            <p className="text-muted-foreground">Courses tab content...</p>
          </TabsContent>

          <TabsContent value="details">
            <p className="text-muted-foreground">Details tab content...</p>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
