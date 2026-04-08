import { useNavigate } from "@tanstack/react-router";
import { Clock, MapPin, Users } from "lucide-react";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 opacity-90" />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTEyIDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yNCAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl px-8 py-6 sm:px-12 sm:py-8 shadow-2xl">
                <div className="flex flex-col items-center">
                  <span className="font-black text-6xl sm:text-7xl lg:text-8xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight leading-none">
                    KIDS
                  </span>
                  <span className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-semibold mt-2">
                    Indoor Play & Event
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {t.hero.title}
          </h1>
          <p className="text-xl sm:text-2xl text-white/95 mb-8 max-w-3xl mx-auto drop-shadow-md">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => navigate({ to: "/waiver" })}
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              {t.hero.signWaiver}
            </Button>
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              {t.hero.contactUs}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <Clock className="w-12 h-12 text-white mx-auto mb-4 drop-shadow-md" />
            <h3 className="text-white font-semibold text-lg mb-2">
              {t.hero.hours}
            </h3>
            <p className="text-white/95">{t.hero.hoursValue}</p>
            <p className="text-white/90 text-sm">{t.hero.daily}</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <Users className="w-12 h-12 text-white mx-auto mb-4 drop-shadow-md" />
            <h3 className="text-white font-semibold text-lg mb-2">
              {t.hero.ages}
            </h3>
            <p className="text-white/95">{t.hero.agesValue}</p>
            <p className="text-white/90 text-sm">{t.hero.safeFun}</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <MapPin className="w-12 h-12 text-white mx-auto mb-4 drop-shadow-md" />
            <h3 className="text-white font-semibold text-lg mb-2">
              {t.hero.location}
            </h3>
            <p className="text-white/95 text-sm">{t.hero.locationValue}</p>
            <p className="text-white/90 text-sm">Oklahoma City, OK</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
