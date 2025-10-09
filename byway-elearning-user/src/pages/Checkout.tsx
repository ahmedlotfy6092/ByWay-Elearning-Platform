/* eslint-disable @typescript-eslint/no-unused-vars */
import { Search, ShoppingCart, Bell, MessageSquare, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Footer } from "../components/Footer";

export function Checkout() {
  const orderItems = [
    "Introduction to User Experience and Cus...",
    "Introduction to User Experience and Cus...",
    "Introduction to User Experience and Cus...",
  ];

  const subtotal = 135.0;
  const discount = 0;
  const tax = 20.25;
  const total = 155.25;

  return (
    <div className="min-h-screen bg-background">
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
              <div className="relative">
                <a href="#cart">
                  <ShoppingCart className="w-5 h-5 text-foreground cursor-pointer" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </a>
              </div>
              <Bell className="w-5 h-5 text-foreground cursor-pointer" />
              <MessageSquare className="w-5 h-5 text-foreground cursor-pointer" />
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
                J
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-4">Checkout Page</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="#course-detail" className="hover:text-foreground">Details</a>
            <span>/</span>
            <a href="#cart" className="hover:text-foreground">Shopping Cart</a>
            <span>/</span>
            <span className="text-foreground">Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Enter Country"
                  className="mt-2 bg-input-background border-transparent"
                />
              </div>
              <div>
                <Label htmlFor="state">State/Union Territory</Label>
                <Input
                  id="state"
                  placeholder="Enter State"
                  className="mt-2 bg-input-background border-transparent"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="mb-4">Payment Method</h3>
              <RadioGroup defaultValue="card" className="space-y-4">
                {/* Credit/Debit Card */}
                <div className="border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="cursor-pointer">
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex gap-2">
                      <svg className="w-10 h-6" viewBox="0 0 40 24" fill="none">
                        <rect width="40" height="24" rx="4" fill="#1434CB"/>
                        <path d="M15 8h10v8H15z" fill="#FF5F00"/>
                        <circle cx="14" cy="12" r="6" fill="#EB001B"/>
                        <circle cx="26" cy="12" r="6" fill="#F79E1B"/>
                      </svg>
                      <svg className="w-10 h-6" viewBox="0 0 40 24" fill="none">
                        <rect width="40" height="24" rx="4" fill="#0066B2"/>
                        <path d="M12 12h16M20 8v8" stroke="white" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name of Card</Label>
                      <Input
                        id="cardName"
                        placeholder="Name of card"
                        className="mt-2 bg-input-background border-transparent"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="Card Number"
                        className="mt-2 bg-input-background border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="Enter Country"
                          className="mt-2 bg-input-background border-transparent"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC/CVV</Label>
                        <Input
                          id="cvc"
                          placeholder="Enter Country"
                          className="mt-2 bg-input-background border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* PayPal */}
                <div className="border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="cursor-pointer">
                        PayPal
                      </Label>
                    </div>
                    <svg className="w-20 h-6" viewBox="0 0 80 24" fill="none">
                      <path d="M20 6c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4v-4c0-2.2-1.8-4-4-4h-8zm0 2h8c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2h-8c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2z" fill="#003087"/>
                      <path d="M36 8h8v2h-8v4h8v2h-8v2h-2V8h2z" fill="#009CDE"/>
                      <path d="M48 8c-2.2 0-4 1.8-4 4s1.8 4 4 4h4v2h-4c-3.3 0-6-2.7-6-6s2.7-6 6-6h4v2h-4z" fill="#012169"/>
                    </svg>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Right Column - Order Details */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-6 sticky top-8">
              <h3 className="mb-4">Order Details (3)</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                {orderItems.map((item, index) => (
                  <p key={index} className="text-sm text-foreground">
                    {item}
                  </p>
                ))}
              </div>

              <button className="flex items-center gap-2 text-sm mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path d="M12 8v4m0 4h.01" strokeLinecap="round" strokeWidth="2"/>
                </svg>
                APPLY COUPON CODE
              </button>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span>${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6 pt-4 border-t border-border">
                <span>Total</span>
                <span className="text-xl">${total.toFixed(2)}</span>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={() => window.location.hash = 'purchase-complete'}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
