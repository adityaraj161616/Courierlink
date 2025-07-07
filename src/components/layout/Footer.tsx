
import { Link } from 'react-router-dom';
import { Package, MapPin, Clock, Contact } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">CourierLink™</span>
            </div>
            <p className="text-gray-300">
              Professional courier and logistics services for all your delivery needs.
              Fast, reliable, and secure.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Services', path: '/services' },
                { name: 'Track Shipment', path: '/track' },
                { name: 'Book Pickup', path: '/book-pickup' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Local Courier</li>
              <li>Domestic Shipping</li>
              <li>International Delivery</li>
              <li>Express Delivery</li>
              <li>B2B Logistics</li>
              <li>Same Day Delivery</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5" />
                <div className="text-gray-300">
                  <p>123 Business District</p>
                  <p>Downtown, City 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Contact className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CourierLink™. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/faq" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
                FAQ
              </Link>
              <Link to="/testimonials" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
                Testimonials
              </Link>
              <Link to="/gallery" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
                Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
