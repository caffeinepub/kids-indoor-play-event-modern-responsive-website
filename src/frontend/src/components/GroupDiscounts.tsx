import { DollarSign, Phone, School, Users } from "lucide-react";
import React from "react";

export default function GroupDiscounts() {
  return (
    <section
      id="group-discounts"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Group Discounts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Special pricing for schools, daycares, and large groups
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 sm:p-12 border-2 border-green-200 shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-block bg-white rounded-2xl px-6 py-3 mb-6 shadow-md">
                <p className="text-gray-700 font-semibold text-lg">
                  Groups of 10+ Children
                </p>
              </div>
              <div className="text-6xl sm:text-7xl font-bold text-green-600 mb-4">
                $9 <span className="text-3xl">+ Tax</span>
              </div>
              <p className="text-2xl text-gray-700 font-medium">per child</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center space-x-3 mb-3">
                  <School className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Perfect For
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Schools & Field Trips</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Daycare Centers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Summer Camps</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Youth Organizations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center space-x-3 mb-3">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Benefits</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Save $1-$3 per child</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>All-day play access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Supervised environment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Safe, clean facility</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <div className="flex items-start space-x-4">
                <Phone className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Call Ahead to Book Your Group Visit
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Please contact us in advance to schedule your group visit
                    and ensure we can accommodate your party.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <strong>Phone:</strong>{" "}
                      <a
                        href="tel:4057249947"
                        className="text-green-600 font-semibold hover:underline"
                      >
                        (405) 724-9947
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:kids405llc@gmail.com"
                        className="text-green-600 font-semibold hover:underline"
                      >
                        kids405llc@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
