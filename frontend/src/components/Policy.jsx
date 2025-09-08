import React from "react";

const Policy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Privacy Policy</h1>
      <p className="text-gray-500 text-sm text-center mb-6">Last Updated: February 2025</p>

      <p className="text-gray-700 mb-4">
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
      <ul className="list-disc ml-6 text-gray-600">
        <li><strong>Personal Data:</strong> Name, email, phone number, payment details.</li>
        <li><strong>Usage Data:</strong> IP address, browser type, and interactions with our platform.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 text-gray-600">
        <li>To provide and improve our services.</li>
        <li>To process transactions securely.</li>
        <li>To send updates and promotional offers (you can opt out at any time).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">3. Data Protection</h2>
      <p className="text-gray-600">
        We implement encryption and strict security measures to safeguard your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-6">4. Data Sharing</h2>
      <p className="text-gray-600">We do not sell your data. However, we may share information with:</p>
      <ul className="list-disc ml-6 text-gray-600">
        <li><strong>Service Providers:</strong> Payment processors, fraud prevention systems.</li>
        <li><strong>Legal Authorities:</strong> If required by law.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">5. Cookies & Tracking</h2>
      <p className="text-gray-600">
        We use cookies to enhance your experience. You can manage your cookie preferences in your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-6">6. Your Rights</h2>
      <ul className="list-disc ml-6 text-gray-600">
        <li>Access, update, or delete your personal data.</li>
        <li>Request data portability.</li>
        <li>Opt-out of marketing communications.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">7. Policy Updates</h2>
      <p className="text-gray-600">
        We may update this policy from time to time. Changes will be communicated on our website.
      </p>

      <h2 className="text-2xl font-semibold mt-6">8. Contact Us</h2>
      <p className="text-gray-600">
        For privacy-related concerns, contact us at  
        <a href="mailto:privacy@bidworld.com" className="text-blue-500"> privacy@bidworld.com</a>.
      </p>
    </div>
  );
};

export default Policy;
