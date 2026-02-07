import React, { useState } from "react";

function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    topic: "Schedule Service",
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
    setFormData({
      topic: "Schedule Service",
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto max-md:max-w-full max-md:rounded-none max-md:max-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center max-md:px-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
            <p className="text-gray-600 text-sm mt-1">
              Have questions or feedback? Fill in the form below and we will
              reach out to you soon.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold flex-shrink-0 ml-4"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-8 py-6 max-md:px-6 space-y-6"
        >
          {/* Topic Dropdown */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Topic
            </label>
            <select
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
            >
              <option>Schedule Service</option>
              <option>Spare Parts Inquiry</option>
              <option>General Question</option>
              <option>Feedback</option>
              <option>Bug Report</option>
            </select>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Obafemi Oluwatobiloba"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="youremail@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+234 912 875 2343"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;
