import { AlertCircle, Heart, Shield, Star } from "lucide-react";
import React from "react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About Our Facility
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oklahoma City's premier indoor playground designed with your child's
            safety and fun in mind
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Clean, Safe Play Areas
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our facility features state-of-the-art play equipment specifically
              designed for children's safety. Every area is regularly cleaned
              and maintained to ensure a hygienic environment for your little
              ones.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We provide a complete indoor play experience with various play
              zones including soft play areas, climbing structures, slides, and
              interactive games suitable for children aged 6 months to 10 years.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Safety First
              </h4>
              <p className="text-gray-700">
                All equipment meets safety standards and is regularly inspected
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
              <Heart className="w-12 h-12 text-purple-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Clean Environment
              </h4>
              <p className="text-gray-700">
                Daily deep cleaning and sanitization of all play areas
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border border-pink-200">
              <Star className="w-12 h-12 text-pink-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Age Appropriate
              </h4>
              <p className="text-gray-700">
                Designed for children 6 months to 10 years old
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
              <AlertCircle className="w-12 h-12 text-orange-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Supervised Play
              </h4>
              <p className="text-gray-700">
                Parents can relax while kids play in a safe environment
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Important Requirements
              </h4>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>
                    <strong>Waiver Required:</strong> All children must have a
                    signed waiver before play
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>
                    <strong>Grip Socks:</strong> Required for all children -
                    $2/pair + Tax (available for purchase)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>
                    <strong>Adult Policy:</strong> Each child admission includes
                    2 free adults. Additional adults $5 per person + Tax
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
