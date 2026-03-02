import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600">
            Get in touch with us for bookings, questions, or visit information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
            <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Address</h4>
              <p className="text-gray-700 text-base">
                1624 W I-240 Service Rd<br />
                Oklahoma City, OK 73159
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
            <Phone className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Phone</h4>
              <a
                href="tel:4057249947"
                className="text-purple-600 text-base font-semibold hover:underline"
              >
                (405) 724-9947
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl border border-pink-200">
            <Mail className="w-8 h-8 text-pink-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Email</h4>
              <a
                href="mailto:kids405llc@gmail.com"
                className="text-pink-600 text-base font-semibold hover:underline break-all"
              >
                kids405llc@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
            <Clock className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Hours</h4>
              <p className="text-gray-700 text-base">
                9:30 AM - 8:00 PM<br />
                Daily
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
