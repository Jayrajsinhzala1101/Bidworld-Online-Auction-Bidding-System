import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Terms and Conditions</h1>
      <p className="text-gray-500 text-sm text-center mb-6">Last Updated: February 2025</p>

      <p className="text-gray-700 mb-4">
        Welcome to Bidworld! By using our platform, you agree to comply with these Terms and Conditions. Please read them carefully.
      </p>

      <h2 className="text-2xl font-semibold mt-6">1. Introduction</h2>
      <p className="text-gray-600">
        These Terms govern your use of Bidworld’s website and services. By accessing our platform, you acknowledge that you have read, understood, and agree to these terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6">2. Eligibility</h2>
      <ul className="list-disc ml-6 text-gray-600">
        <li>You must be at least 18 years old to create an account.</li>
        <li>Providing false information during registration may lead to account termination.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">3. User Accounts</h2>
      <p className="text-gray-600">
        You are responsible for maintaining the confidentiality of your login credentials. Unauthorized access to your account must be reported immediately.
      </p>

      <h2 className="text-2xl font-semibold mt-6">4. Bidding & Transactions</h2>
      <ul className="list-disc ml-6 text-gray-600">
        <li>All bids placed are final and cannot be retracted.</li>
        <li>Payments must be completed within the time frame specified.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">5. Prohibited Activities</h2>
      <p className="text-gray-600">Users are prohibited from:</p>
      <ul className="list-disc ml-6 text-gray-600">
        <li>Manipulating bids or engaging in fraudulent activities.</li>
        <li>Uploading illegal or misleading content.</li>
        <li>Using bots or automated bidding systems.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">6. Termination of Accounts</h2>
      <p className="text-gray-600">
        Bidworld reserves the right to suspend or terminate accounts that violate our terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6">7. Changes to Terms</h2>
      <p className="text-gray-600">
        We may update these terms periodically. Continued use of our platform after updates constitutes acceptance of the revised terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6">8. Contact Us</h2>
      <p className="text-gray-600">
        If you have any questions, please contact us at  
        <a href="mailto:support@bidworld.com" className="text-blue-500"> support@bidworld.com</a>.
      </p>
    </div>
  );
};

export default Terms;
