import React from 'react';
import { ShieldAlert, ShoppingBag } from 'lucide-react';

export default function SafetyNotice() {
  return (
    <section id="safety-notice" className="py-16 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-orange-300 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6">
            <div className="flex items-center justify-center space-x-4">
              <ShieldAlert className="w-12 h-12 text-white" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white text-center">
                Important Safety Notice
              </h2>
            </div>
          </div>
          
          <div className="p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Grip Socks Required
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      All children must wear grip socks for safety while playing in our facility. 
                      This helps prevent slips and falls on our play equipment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-8 border-2 border-orange-300">
                <div className="flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                  Grip Socks Available
                </h3>
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Children's Grip Socks</p>
                    <div className="text-5xl font-bold text-orange-600 mb-2">
                      $2 <span className="text-2xl">+ Tax</span>
                    </div>
                    <p className="text-lg text-gray-700">per pair</p>
                  </div>
                  <div className="border-t border-orange-200 pt-4">
                    <p className="text-sm text-gray-600 mb-1">Adult Socks</p>
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      $2.50 <span className="text-xl">+ Tax</span>
                    </div>
                    <p className="text-lg text-gray-700">per pair</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Available for purchase at our front desk
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <p className="text-center text-gray-700 text-lg">
                <strong className="text-orange-600">Please Note:</strong> Grip socks are mandatory for all children. 
                If you don't have grip socks, you can purchase them at our facility before play begins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
