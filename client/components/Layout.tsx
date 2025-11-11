import { Link } from "react-router-dom";
import { Menu, X, Smile, Globe } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES, type Language } from "@/lib/languages";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/assess", label: t("assessTeeth") },
    { href: "/doctors", label: t("findDoctor") },
    { href: "/ambulance", label: t("ambulance") },
    { href: "/reports", label: t("myReports") },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLanguageOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition flex-shrink-0"
            >
              <div className="bg-primary p-2 rounded-lg">
                <Smile className="w-6 h-6 text-white" />
              </div>
              <span className="hidden sm:inline text-gray-900">SmileCare</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary transition"
                  aria-label={link.label}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition flex items-center gap-1"
                  aria-label={t("selectLanguage")}
                  title={t("selectLanguage")}
                >
                  <Globe className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">
                    {LANGUAGES[language]?.nativeName || language}
                  </span>
                </button>

                {languageOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border-2 border-gray-200 shadow-lg z-40">
                    <div className="p-3 border-b border-gray-200">
                      <div className="text-xs font-semibold text-gray-600">
                        {t("selectLanguage")}
                      </div>
                    </div>
                    <div className="space-y-1 p-2">
                      {Object.entries(LANGUAGES).map(([code, lang]) => (
                        <button
                          key={code}
                          onClick={() => handleLanguageChange(code as Language)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-sm transition",
                            language === code
                              ? "bg-primary text-white font-semibold"
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          <span className="mr-2">{lang.flag}</span>
                          {lang.nativeName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop CTA */}
              <Link
                to="/consult"
                className="hidden sm:block px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition"
              >
                {t("consultNow")}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pb-4 space-y-2 border-t border-gray-200 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/consult"
                className="block px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("consultNow")}
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-gray-50 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-primary mb-4">
                <Smile className="w-5 h-5" />
                SmileCare
              </div>
              <p className="text-sm text-gray-600">
                Your trusted dental health companion
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                Services
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link
                    to="/assess"
                    className="hover:text-primary transition"
                  >
                    {t("assessTeeth")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/doctors"
                    className="hover:text-primary transition"
                  >
                    {t("findDoctor")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ambulance"
                    className="hover:text-primary transition"
                  >
                    {t("ambulance")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                Support
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                Contact
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Email: info@smilecare.com</li>
                <li>Phone: 1-800-SMILE-NOW</li>
                <li>24/7 Emergency Support</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>
              &copy; 2025 SmileCare. All rights reserved. Dedicated to your
              dental health.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
