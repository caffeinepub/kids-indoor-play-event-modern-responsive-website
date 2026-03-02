import React from 'react';
import { Cake, Users, Clock, Gift, Phone } from 'lucide-react';
import { Button } from './ui/button';

export default function BirthdayPackages() {
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
    <section id="birthday-packages" className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Cake className="w-12 h-12 text-pink-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Birthday Party Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make your child's birthday unforgettable with our all-inclusive party packages!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Basic Birthday Package */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl p-8 border-2 border-blue-200 hover:shadow-2xl transition-shadow">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Basic Birthday Package
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Weekday</p>
                  <p className="text-3xl font-bold text-blue-600">$165</p>
                  <p className="text-sm text-gray-600">+ Tax</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Weekend</p>
                  <p className="text-3xl font-bold text-cyan-600">$255</p>
                  <p className="text-sm text-gray-600">+ Tax</p>
                </div>
              </div>
              <p className="text-center text-gray-500 text-sm">Mon-Thu | Fri-Sun</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">11 Passes + Guest of Honor</p>
                  <p className="text-sm text-gray-600">Perfect for smaller celebrations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Gift className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">12 Grip Socks Included</p>
                  <p className="text-sm text-gray-600">All kids ready to play safely</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">100 Minutes Party Room</p>
                  <p className="text-sm text-gray-600">Plenty of time for cake and fun</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Additional Children</p>
                  <p className="text-sm text-gray-600">$11 + Tax per child</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              onClick={scrollToContact}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg py-6 rounded-full shadow-lg"
            >
              Book This Package
            </Button>
          </div>

          {/* Plus Birthday Package */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl p-8 border-2 border-purple-200 hover:shadow-2xl transition-shadow relative">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
                <Cake className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Plus Birthday Package
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Weekday</p>
                  <p className="text-3xl font-bold text-purple-600">$260</p>
                  <p className="text-sm text-gray-600">+ Tax</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Weekend</p>
                  <p className="text-3xl font-bold text-pink-600">$350</p>
                  <p className="text-sm text-gray-600">+ Tax</p>
                </div>
              </div>
              <p className="text-center text-gray-500 text-sm">Mon-Thu | Fri-Sun</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">20 Kids + Guest of Honor</p>
                  <p className="text-sm text-gray-600">Perfect for bigger celebrations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Gift className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">21 Grip Socks Included</p>
                  <p className="text-sm text-gray-600">Everyone ready to play safely</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">100 Minutes Party Room</p>
                  <p className="text-sm text-gray-600">Plenty of time for cake and fun</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Additional Children</p>
                  <p className="text-sm text-gray-600">$11 + Tax per child</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              onClick={scrollToContact}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 rounded-full shadow-lg"
            >
              Book This Package
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200 max-w-4xl mx-auto">
          <div className="flex items-start space-x-4">
            <Phone className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Ready to Book Your Party?
              </h3>
              <p className="text-gray-700 mb-4">
                Contact us today to reserve your party date and make your child's birthday celebration extra special!
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Phone:</strong>{' '}
                  <a
                    href="tel:4057249947"
                    className="text-pink-600 font-semibold hover:underline"
                  >
                    (405) 724-9947
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:kids405llc@gmail.com"
                    className="text-pink-600 font-semibold hover:underline"
                  >
                    kids405llc@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
