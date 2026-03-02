import React from 'react';
import { FileText, ShieldCheck, Users, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

export default function Requirements() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="requirements" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <ShieldCheck className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Requirements & Policies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please review our facility requirements before your visit
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Waiver Requirement</h3>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                <strong>All children must have a signed waiver before play.</strong>
              </p>
              <p>
                Parents or legal guardians must complete and sign a comprehensive liability waiver for each child before they can access our play areas. This waiver includes:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Acknowledgment of inherent risks in physical play activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Release of liability for injuries or accidents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Photo and video release authorization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Agreement to supervise children during play</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button
                  onClick={scrollToContact}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Sign Waiver Online
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Grip Socks Policy</h3>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                <strong>Grip socks are required for all children.</strong>
              </p>
              <p>
                For safety and hygiene reasons, all children must wear grip socks while playing in our facility. This policy helps:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Prevent slips and falls on play equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Maintain cleanliness of play areas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Provide better traction during active play</span>
                </li>
              </ul>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 mt-6 space-y-3">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Children's Grip Socks</p>
                  <p className="text-2xl font-bold text-purple-600">$2/pair + Tax</p>
                </div>
                <div className="border-t border-purple-200 pt-3">
                  <p className="font-semibold text-gray-900 mb-1">Adult Socks</p>
                  <p className="text-2xl font-bold text-purple-600">$2.50/pair + Tax</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">Available for purchase at our front desk</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Adult Admission Policy</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Included Adults</h4>
              <p className="text-gray-700 mb-2">
                Each child admission includes <strong>2 free adults</strong> to supervise and accompany the child during play.
              </p>
              <p className="text-sm text-gray-600">
                Adults must remain on premises to supervise their children at all times.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Additional Adults</h4>
              <p className="text-3xl font-bold text-red-600 mb-2">$5 + Tax</p>
              <p className="text-gray-700">
                Each additional adult beyond the 2 included adults requires a separate admission fee.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Important Reminders</h3>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Parents/guardians must remain on premises during their child's visit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Children must be supervised by an adult at all times</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Facility is designed for children ages 6 months to 10 years</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Food and drinks are allowed in designated areas only</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Please follow all posted safety rules and staff instructions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Questions about our requirements? Contact us at{' '}
            <a href="tel:4057249947" className="text-blue-600 font-semibold hover:underline">
              (405) 724-9947
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
