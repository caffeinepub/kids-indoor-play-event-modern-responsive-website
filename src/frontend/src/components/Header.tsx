import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Languages, Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const routerState = useRouterState();
  const isMainPage = routerState.location.pathname === "/";
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isMainPage) {
        const sections = [
          "home",
          "about",
          "play-areas",
          "safety-notice",
          "daily-admission",
          "group-discounts",
          "birthday-packages",
          "private-events",
          "monthly-passes",
          "requirements",
          "gallery",
          "contact",
        ];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMainPage]);

  const scrollToSection = (sectionId: string) => {
    if (!isMainPage) {
      navigate({ to: "/" });
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "play-areas", label: t.nav.playAreas },
    { id: "daily-admission", label: t.nav.admission },
    {
      id: "private-events",
      label: language === "en" ? "Private Events" : "Eventos Privados",
    },
    { id: "requirements", label: t.nav.requirements },
    { id: "gallery", label: t.nav.gallery },
    { id: "contact", label: t.nav.contact },
    { id: "waiver", label: t.nav.waiver, isRoute: true },
  ];

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.isRoute) {
      navigate({ to: "/waiver" });
      setIsMobileMenuOpen(false);
    } else {
      scrollToSection(item.id);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/80 backdrop-blur-sm shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex items-center space-x-2 group transition-transform hover:scale-105 duration-200"
          >
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-2xl lg:text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight leading-none">
                KIDS
              </span>
              <span className="text-[10px] sm:text-xs lg:text-sm text-gray-600 font-medium -mt-0.5">
                Indoor Play & Event
              </span>
            </div>
          </button>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center space-x-2 hover:bg-gray-100 transition-colors"
              title={
                language === "en" ? "Switch to Spanish" : "Cambiar a Inglés"
              }
            >
              <Languages className="w-4 h-4" />
              <span className="font-medium">
                {language === "en" ? "Español" : "English"}
              </span>
            </Button>

            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-3 xl:px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    activeSection === item.id && isMainPage && !item.isRoute
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="px-4 py-4 space-y-2 max-h-[calc(100vh-64px)] sm:max-h-[calc(100vh-80px)] overflow-y-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center space-x-2 mb-2"
            >
              <Languages className="w-4 h-4" />
              <span className="font-medium">
                {language === "en" ? "Español" : "English"}
              </span>
            </Button>
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all touch-manipulation ${
                  activeSection === item.id && isMainPage && !item.isRoute
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
