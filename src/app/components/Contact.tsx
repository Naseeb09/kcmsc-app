import { Phone, Mail, MapPin, Globe, Clock, AlertCircle, Printer } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';
import { contactInfo } from '@/data/mockData';

export function Contact() {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-600 to-rose-800 text-white px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-semibold">Contact Us</h1>
          </div>
          <p className="text-rose-50 text-sm">
            Get in touch with our school administration
          </p>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto space-y-4">
        {/* Main Contact Card */}
        <Card className="border-gray-200">
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="space-y-4">
              {/* Phone */}
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-0.5">Main Phone</p>
                  <p className="font-medium text-gray-900">{contactInfo.phone}</p>
                </div>
              </a>

              <Separator />

              {/* Email */}
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-0.5">Email Address</p>
                  <p className="font-medium text-gray-900 break-all">{contactInfo.email}</p>
                </div>
              </a>

              <Separator />

              {/* Address */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-0.5">School Address</p>
                  <p className="font-medium text-gray-900 leading-relaxed">{contactInfo.address}</p>
                </div>
              </a>

              <Separator />

              {/* Website */}
              <a
                href={`https://${contactInfo.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-0.5">Website</p>
                  <p className="font-medium text-gray-900">{contactInfo.website}</p>
                </div>
              </a>

              <Separator />

              {/* Fax */}
              <div className="flex items-start gap-3 p-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Printer className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-0.5">Fax</p>
                  <p className="font-medium text-gray-900">{contactInfo.fax}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Office Hours */}
        <Card className="border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-900">Office Hours</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">School Hours</span>
                <span className="font-medium text-gray-900">{contactInfo.hours.weekdays}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Office Hours</span>
                <span className="font-medium text-gray-900">{contactInfo.hours.office}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Weekends</span>
                <span className="font-medium text-gray-900">Closed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Emergency Contact</h3>
                <p className="text-sm text-gray-700 mb-2">
                  For urgent matters outside of school hours:
                </p>
                <a
                  href={`tel:${contactInfo.emergencyContact}`}
                  className="inline-flex items-center gap-2 text-red-700 font-medium hover:text-red-800"
                >
                  <Phone className="w-4 h-4" />
                  {contactInfo.emergencyContact}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visit Information */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Planning a Visit?</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              We welcome parents and visitors to tour our campus. Please call or email ahead to schedule an appointment with our admissions team.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call to Schedule
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <Card className="border-gray-200 overflow-hidden">
          <div className="h-48 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Interactive map coming soon</p>
            </div>
          </div>
          <CardContent className="p-4">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Open in Google Maps →
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
