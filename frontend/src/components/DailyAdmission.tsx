import React from 'react';
import { Calendar, Users, DollarSign, Clock } from 'lucide-react';
import { Button } from './ui/button';

export default function DailyAdmission() {
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
    <section id="daily-admission" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <DollarSign className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Daily Admission
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            All-day play access with unlimited fun for your little ones!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-8 border-2 border-blue-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-6">
              Weekday Admission
            </h3>
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                $10 <span className="text-2xl">+ Tax</span>
              </div>
              <p className="text-gray-700 font-medium text-lg">per child</p>
              <p className="text-gray-600 mt-2">Monday - Thursday</p>
            </div>
            <div className="bg-white rounded-xl p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-gray-700">All-day play access</p>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-gray-700">2 free adults per child</p>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-gray-700">Additional adults: $5 + Tax each</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 border-2 border-purple-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-6">
              Weekend Admission
            </h3>
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-purple-600 mb-2">
                $12 <span className="text-2xl">+ Tax</span>
              </div>
              <p className="text-gray-700 font-medium text-lg">per child</p>
              <p className="text-gray-600 mt-2">Friday - Sunday</p>
            </div>
            <div className="bg-white rounded-xl p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <p className="text-gray-700">All-day play access</p>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <p className="text-gray-700">2 free adults per child</p>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <p className="text-gray-700">Additional adults: $5 + Tax each</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What's Included
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h4 className="font-semibold text-gray-900 mb-2">All-Day Access</h4>
              <p className="text-gray-600">Play as long as you want during operating hours</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">👨‍👩‍👧</div>
              <h4 className="font-semibold text-gray-900 mb-2">2 Free Adults</h4>
              <p className="text-gray-600">Two adults included with each child admission</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🏰</div>
              <h4 className="font-semibold text-gray-900 mb-2">All Play Areas</h4>
              <p className="text-gray-600">Access to every zone in our facility</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200 mb-8">
          <div className="text-center">
            <h4 className="text-xl font-bold text-gray-900 mb-3">Time Definitions</h4>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-gray-700">
              <div>
                <span className="font-semibold text-blue-600">Weekdays:</span> Monday - Thursday
              </div>
              <div className="hidden sm:block text-gray-400">|</div>
              <div>
                <span className="font-semibold text-purple-600">Weekends:</span> Friday - Sunday
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-full shadow-lg"
          >
            Sign Waiver & Visit Today
          </Button>
        </div>
      </div>
    </section>
  );
}
