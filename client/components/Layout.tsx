import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { LANGUAGES } from "../lib/languages";
import { Globe } from "lucide-react";

const navItems = [
  { path: "/", key: "home" },
  { path: "/assess", key: "assessTeeth" },
  { path: "/doctors", key: "findDoctor" },
  { path: "/ambulance", key: "ambulance" },
  { path: "/reports", key: "myReports" },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--background))]">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              😁
            </div>
            <span className="font-extrabold text-lg tracking-tight">
              SmileCare
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition pb-0.5 border-b-2 ${
                  pathname === item.path
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600 hover:text-primary hover:border-primary/60"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Language selector */}
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <select
              className="text-xs sm:text-sm border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
            >
              {Object.entries(LANGUAGES).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.nativeName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-white py-4 mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} SmileCare. All rights reserved.</span>
          <span>AI-assisted, not a medical diagnosis. Always consult a dentist.</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
