import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg"></div>
              <span className="text-xl">Byway</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Alison© 2025. All Rights Reserved. Byway is a leading online
              learning platform helping over 17 million learners and empowering
              them with knowledge to succeed.
            </p>
          </div>

          {/* Get Help */}
          <div>
            <h3 className="mb-4">Get Help</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Latest Articles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-4">Programs</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Art & Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Business
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  IT & Software
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Languages
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Programming
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="mb-4">Contact Us</h3>
            <p className="text-slate-400 text-sm mb-4">
              Address: 123 Main Street Anytown, CA 12345
            </p>
            <p className="text-slate-400 text-sm mb-4">
              Tel: +(123) 456-7890
            </p>
            <p className="text-slate-400 text-sm mb-4">
              Mail: bywayedu@webkul.in
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
