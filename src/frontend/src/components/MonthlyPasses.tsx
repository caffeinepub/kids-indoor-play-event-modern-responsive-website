import {
  Calendar,
  CheckCircle,
  Infinity as InfinityIcon,
  Star,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export default function MonthlyPasses() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="monthly-passes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <InfinityIcon className="w-12 h-12 text-purple-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Monthly Passes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlimited play for a full month - the best value for frequent
            visitors!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-3xl p-2 shadow-2xl">
            <div className="bg-white rounded-2xl p-8 sm:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Unlimited Monthly Play
                </h3>
                <div className="text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  $50 <span className="text-3xl">+ Tax</span>
                </div>
                <p className="text-2xl text-gray-700 font-medium">per child</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border border-purple-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  Pass Benefits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Unlimited Visits
                      </p>
                      <p className="text-sm text-gray-600">
                        Come as often as you like
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        All-Day Access
                      </p>
                      <p className="text-sm text-gray-600">
                        Stay as long as you want
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Weekdays & Weekends
                      </p>
                      <p className="text-sm text-gray-600">
                        Valid any day we're open
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Best Value</p>
                      <p className="text-sm text-gray-600">
                        Pay once, play all month
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200 mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-3 text-center">
                  💰 Great Value!
                </h4>
                <p className="text-gray-700 text-center">
                  Visit just <strong>5 times</strong> and you've already saved
                  money compared to daily admission! Perfect for families who
                  love to play often.
                </p>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 rounded-full shadow-lg"
                >
                  Get Your Monthly Pass
                </Button>
                <p className="text-gray-600 mt-4 text-sm">
                  Contact us to purchase your monthly pass today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
