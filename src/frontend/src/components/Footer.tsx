import { useNavigate } from "@tanstack/react-router";
import { Heart, Shield } from "lucide-react";
import React from "react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export default function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleAdminClick = () => {
    navigate({ to: "/admin" });
  };

  const handleEmployeeWaiverCheckClick = () => {
    navigate({ to: "/employee-waiver-check" });
  };

  const handleEmployeeCheckInClick = () => {
    navigate({ to: "/employee-check-in" });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex flex-col items-start mb-4">
              <div className="relative group mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all" />
                <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-700/50 shadow-xl">
                  <div className="flex flex-col">
                    <span className="font-black text-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight leading-none">
                      KIDS
                    </span>
                    <span className="text-sm text-gray-400 font-medium mt-1">
                      Indoor Play & Event
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Oklahoma City's premier indoor playground where fun meets safety!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <SiFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <SiInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <SiX className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "home",
                "about",
                "play-areas",
                "daily-admission",
                "requirements",
                "gallery",
                "contact",
              ].map((section) => (
                <li key={section}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(section)}
                    className="text-gray-400 hover:text-white transition-colors capitalize"
                  >
                    {section.replace("-", " ")}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <strong className="text-white">Address:</strong>
                <br />
                1624 W I-240 Service Rd
                <br />
                Oklahoma City, OK 73159
              </li>
              <li>
                <strong className="text-white">Phone:</strong>
                <br />
                <a
                  href="tel:4057249947"
                  className="hover:text-white transition-colors"
                >
                  (405) 724-9947
                </a>
              </li>
              <li>
                <strong className="text-white">Email:</strong>
                <br />
                <a
                  href="mailto:kids405llc@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  kids405llc@gmail.com
                </a>
              </li>
              <li>
                <strong className="text-white">Hours:</strong>
                <br />
                9:30 AM - 8:30 PM Daily
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleAdminClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all border border-gray-700 hover:border-gray-600 shadow-md hover:shadow-lg"
              >
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Admin Login</span>
              </button>

              <p className="flex items-center justify-center gap-2 text-gray-400 text-sm sm:text-base">
                © 2025. Built with{" "}
                <Heart className="w-4 h-4 text-red-500 fill-current" /> using{" "}
                <a
                  href="https://caffeine.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>

          {/* Hidden Employee Links */}
          <div className="mt-6 text-center flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleEmployeeWaiverCheckClick}
              className="text-xs text-gray-600 hover:text-gray-500 transition-colors"
            >
              Employee Waiver Check
            </button>
            <span className="text-gray-700">•</span>
            <button
              type="button"
              onClick={handleEmployeeCheckInClick}
              className="text-xs text-gray-600 hover:text-gray-500 transition-colors"
            >
              Employee Check-In
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
