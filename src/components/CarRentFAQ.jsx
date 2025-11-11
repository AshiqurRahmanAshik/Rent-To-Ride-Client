import React, { useState, useMemo } from 'react';

// CarRentFAQComponent.jsx
// Professional, accessible FAQ component for a car rental website.
// - Tailwind CSS for styling
// - Search + category filter
// - Keyboard accessible accordion
// - Easy to extend: modify the `FAQ_DATA` array

const FAQ_DATA = [
  {
    id: 1,
    category: 'Booking & Reservations',
    question: 'How do I book a car?',
    answer:
      'You can book a car online by selecting your pick-up and drop-off dates, choosing a vehicle, and completing the reservation form. We will send a confirmation email with your booking details and a reservation number.',
  },
  {
    id: 2,
    category: 'Booking & Reservations',
    question: 'Can I modify or cancel my reservation?',
    answer:
      'Yes. Modifications and cancellations can be made through your booking page or by contacting our support team. Fees may apply depending on the rate type and how close to the pickup date the change is requested.',
  },
  {
    id: 3,
    category: 'Pricing & Payment',
    question: 'What payment methods do you accept?',
    answer:
      'We accept major credit and debit cards (Visa, MasterCard, American Express) and selected local payment methods. Full payment may be required at booking or at pickup depending on the rate.',
  },
  {
    id: 4,
    category: 'Pricing & Payment',
    question: 'Are there any hidden fees?',
    answer:
      'Prices shown include the base rental charge and applicable taxes. Additional fees may apply for extras such as additional drivers, young driver surcharge, fuel charges, tolls, and late returns. All applicable fees are disclosed during checkout.',
  },
  {
    id: 5,
    category: 'Pickup & Return',
    question: 'What do I need to bring at pickup?',
    answer:
      "Please bring a valid driver's license, the credit/debit card used for booking (or acceptable alternate payment), and your booking confirmation. International customers may need to present an international driving permit.",
  },
  {
    id: 6,
    category: 'Pickup & Return',
    question: 'What is your fuel policy?',
    answer:
      'Most rentals are supplied with a full tank. You may return the vehicle full (no fee) or choose our pre-paid fuel option. If returned with less fuel, a refueling charge will apply.',
  },
  {
    id: 7,
    category: 'Insurance & Coverage',
    question: 'Is insurance included in the rental price?',
    answer:
      'Basic insurance coverage is included with every rental. You can purchase additional protection (e.g., Collision Damage Waiver, Theft Protection) during booking for greater peace of mind. Coverage specifics are provided in the terms and conditions.',
  },
  {
    id: 8,
    category: 'Drivers & Eligibility',
    question: 'What are the age requirements?',
    answer:
      'Drivers must meet the minimum age requirement and present a valid driving license. A young driver surcharge may apply to drivers under a specified age. Please check the rental terms for age-related restrictions.',
  },
  {
    id: 9,
    category: 'Vehicle & Extras',
    question: 'Can I request child seats or GPS?',
    answer:
      'Yes — child seats, GPS units, and other extras are available for an additional fee and can be added during reservation if available. We recommend reserving extras in advance.',
  },
  {
    id: 10,
    category: 'Support & Assistance',
    question: 'What should I do in case of an accident or breakdown?',
    answer:
      "If you are involved in an accident or the vehicle breaks down, first ensure everyone's safety. Contact emergency services if needed, then call our 24/7 roadside assistance number provided in your booking confirmation. Report the incident to our support team as soon as possible.",
  },
];

export default function CarRentFAQ() {
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(FAQ_DATA.map((f) => f.category)));
    return ['All', ...cats];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ_DATA.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesQuery =
        q === '' ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="max-w-4xl mx-auto my-10 p-6 rounded-2xl shadow-md">
      <header className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm ">
          Answers to common questions about booking, pickup, payment and
          policies.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-3 md:items-center mb-6">
        <div className="flex-1">
          <label htmlFor="faq-search" className="sr-only">
            Search FAQs
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="w-full md:w-56">
          <label htmlFor="faq-category" className="sr-only">
            Filter by category
          </label>
          <select
            id="faq-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="p-4 bg-gray-50 rounded-lg ">
            No matching FAQs. Try different keywords or select another category.
          </div>
        )}

        {filtered.map((item) => (
          <article key={item.id} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggle(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle(item.id);
                }
              }}
              aria-expanded={openId === item.id}
              aria-controls={`faq-panel-${item.id}`}
              className="w-full text-left px-4 py-3 flex items-center justify-between gap-4  focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
              <div>
                <h3 className="text-base font-medium">{item.question}</h3>
                <p className="text-sm  mt-1 hidden md:block">{item.category}</p>
              </div>

              <div className="flex items-center">
                <svg
                  className={`w-5 h-5 transform transition-transform duration-200 ${
                    openId === item.id ? 'rotate-180' : 'rotate-0'
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M5 8l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-button-${item.id}`}
              className={`${
                openId === item.id ? 'max-h-96 p-4' : 'max-h-0 p-0'
              } overflow-hidden transition-all duration-300 border border-gray-300  `}
            >
              <p className="text-sm leading-relaxed">{item.answer}</p>
            </div>
          </article>
        ))}
      </div>

      <footer className="mt-6 text-sm ">
        <p>
          Can't find what you're looking for? Mail us at{' '}
          <strong>renttodrive@gmail.com</strong> for immediate assistance.
        </p>
      </footer>
    </section>
  );
}
