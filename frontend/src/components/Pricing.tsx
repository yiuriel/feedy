import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

const tiers = [
  {
    name: "Free",
    id: "free",
    href: "/register",
    price: { monthly: "$0" },
    description: "Perfect for collecting simple anonymous feedback.",
    features: [
      "1 feedback form",
      "Up to 50 responses per month",
      "Basic response analytics",
      "Customizable feedback form",
      "Anonymous responses",
      "Basic spam protection"
    ],
    featured: false,
  },
  {
    name: "Pro",
    id: "pro",
    href: "/register?plan=pro",
    price: { monthly: "$29" },
    description: "Advanced features for comprehensive feedback collection.",
    features: [
      "Unlimited feedback forms",
      "Unlimited responses",
      "Advanced analytics and trends",
      "Custom form themes",
      "Enhanced spam protection",
      "QR code generation",
      "Custom thank you pages",
      "Export responses to CSV",
      "Password-protected forms",
      "Form embedding support"
    ],
    featured: true,
  },
];

export default function Pricing() {
  return (
    <div id="pricing" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Start collecting valuable feedback today with our flexible pricing options
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 xl:gap-x-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 ring-1 ring-gray-200 ${
                tier.featured
                  ? "bg-gray-900 ring-gray-900"
                  : "bg-white ring-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold leading-8 ${
                  tier.featured ? "text-white" : "text-gray-900"
                }`}
              >
                {tier.name}
              </h3>
              <p
                className={`mt-4 text-sm leading-6 ${
                  tier.featured ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={`text-4xl font-bold tracking-tight ${
                    tier.featured ? "text-white" : "text-gray-900"
                  }`}
                >
                  {tier.price.monthly}
                </span>
                <span
                  className={`text-sm font-semibold leading-6 ${
                    tier.featured ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  /month
                </span>
              </p>
              <Link
                to={tier.href}
                className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.featured
                    ? "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600"
                    : "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600"
                }`}
              >
                Get started
              </Link>
              <ul
                role="list"
                className={`mt-8 space-y-3 text-sm leading-6 ${
                  tier.featured ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className={`h-6 w-5 flex-none ${
                        tier.featured ? "text-white" : "text-indigo-600"
                      }`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
