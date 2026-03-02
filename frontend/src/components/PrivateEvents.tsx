import React from 'react';
import { Building2, Users, Clock, DollarSign, Phone, CalendarCheck, Star, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';

export default function PrivateEvents() {
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
    <section id="private-events" className="py-20 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Book the Whole Space
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reserve the entire facility exclusively for your group — perfect for school events, corporate outings, church groups, and large private parties!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 2-Hour Rental */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-3xl p-8 border-2 border-indigo-200 hover:shadow-2xl transition-shadow">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">2-Hour Rental</h3>
              <p className="text-gray-600">Great for focused events and celebrations</p>
            </div>

            <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
              <div className="flex items-center justify-center mb-2">
                <div className="text-center">
                  <p className="text-3xl font-bold text-indigo-600">$650</p>
                  <p className="text-sm text-gray-600">+ Tax</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Up to 100 Guests</p>
                  <p className="text-sm text-gray-600">Entire facility reserved exclusively for you</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">2 Hours Exclusive Access</p>
                  <p className="text-sm text-gray-600">Full use of all play areas and party room</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Dedicated Staff</p>
                  <p className="text-sm text-gray-600">Our team ensures a smooth, safe event</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <DollarSign className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">$200 Deposit Required</p>
                  <p className="text-sm text-gray-600">Secures your reservation date</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              onClick={scrollToContact}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-lg py-6 rounded-full shadow-lg"
            >
              Book 2-Hour Rental
            </Button>
          </div>

          {/* 3-Hour Rental */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-100 rounded-3xl p-8 border-2 border-violet-200 hover:shadow-2xl transition-shadow relative">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Best Value
            </div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">3-Hour Rental</h3>
              <p className="text-gray-600">More time for bigger events and celebrations</p>
            </div>

            <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
              <div className="flex items-center justify-center mb-2">
                <div className="text-center">
                  <p className="text-3xl font-bold text-violet-600">$800</p>
                  <p className="text-sm text-gray-600">+ Tax</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Up to 100 Guests</p>
                  <p className="text-sm text-gray-600">Entire facility reserved exclusively for you</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">3 Hours Exclusive Access</p>
                  <p className="text-sm text-gray-600">Full use of all play areas and party room</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Dedicated Staff</p>
                  <p className="text-sm text-gray-600">Our team ensures a smooth, safe event</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <DollarSign className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">$200 Deposit Required</p>
                  <p className="text-sm text-gray-600">Secures your reservation date</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              onClick={scrollToContact}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-lg py-6 rounded-full shadow-lg"
            >
              Book 3-Hour Rental
            </Button>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-lg mb-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What's Included with Every Rental</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Building2, text: 'Exclusive use of the entire facility' },
              { icon: Users, text: 'All play areas open for your group' },
              { icon: CalendarCheck, text: 'Private party room access' },
              { icon: ShieldCheck, text: 'Dedicated staff for your event' },
              { icon: Star, text: 'No other guests during your rental' },
              { icon: Clock, text: 'Flexible scheduling available' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-xl">
                <Icon className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 max-w-4xl mx-auto text-white text-center shadow-xl">
          <Phone className="w-10 h-10 mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl font-bold mb-3">Ready to Reserve the Whole Space?</h3>
          <p className="text-indigo-100 mb-6 text-lg">
            Contact us today to check availability and secure your date with a $200 deposit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="tel:4057249947"
              className="text-white font-bold text-xl hover:text-indigo-200 transition-colors"
            >
              📞 (405) 724-9947
            </a>
            <span className="hidden sm:block text-indigo-300">|</span>
            <a
              href="mailto:kids405llc@gmail.com"
              className="text-white font-bold text-xl hover:text-indigo-200 transition-colors"
            >
              ✉️ kids405llc@gmail.com
            </a>
          </div>
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-lg px-10 py-6 rounded-full shadow-lg"
          >
            Contact Us to Book
          </Button>
        </div>
      </div>
    </section>
  );
}
