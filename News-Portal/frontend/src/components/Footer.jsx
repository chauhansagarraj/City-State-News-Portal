import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">

      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* About */}
        <div>
          <h2 className="text-white text-xl font-bold mb-3">
            NewsPortal
          </h2>
          <p className="text-sm">
            Your trusted source for latest news, politics,
            technology, sports and more.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Categories
          </h3>

          <ul className="space-y-2 text-sm">
            <li><Link to="#">Politics</Link></li>
            <li><Link to="#">Sports</Link></li>
            <li><Link to="#">Technology</Link></li>
            <li><Link to="#">Business</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Contact
          </h3>

          <p className="text-sm">
            Email: newsportal@email.com
          </p>

          <p className="text-sm mt-2">
            Phone: +91 9876543210
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} NewsPortal. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;