"use client";

import Background from "@/components/background";
import { Check } from "@/components/icons/check";
import { Minus } from "@/components/icons/minus";
import Link from "next/link";
import { useState } from "react";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number | string;
    yearly: number | string;
  };
  features: PricingFeature[];
  cta: string;
  href: string;
  popular: boolean;
}

const TIERS: PricingTier[] = [
  {
    id: "self-hosted",
    name: "Self-Hosted",
    description:
      "Perfect for developers and teams who want full control over their infrastructure.",
    price: { monthly: 0, yearly: 0 },
    features: [
      { text: "Self-hosted deployment", included: true },
      { text: "Unlimited projects", included: true },
      { text: "Unlimited collaborators", included: true },
      { text: "Access to all core features", included: true },
      { text: "Manual updates", included: true },
      { text: "Community support", included: true },
      { text: "Priority support", included: false },
      { text: "Dedicated training", included: false },
    ],
    cta: "Get Started for Free",
    href: "/download",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    description:
      "All features included, fully managed hosting, no maintenance required.",
    price: { monthly: 12, yearly: 9 },
    features: [
      { text: "Managed hosting", included: true },
      { text: "Unlimited projects", included: true },
      { text: "Unlimited storage", included: true },
      { text: "Unlimited collaborators", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom domains", included: true },
      { text: "Single Sign-On (SSO)", included: true },
      { text: "Standard support", included: true },
      { text: "Dedicated training", included: false },
    ],
    cta: "Start Free Trial",
    href: "/register?plan=pro",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description:
      "Enterprise-grade solution with premium support and onboarding.",
    price: { monthly: "Custom", yearly: "Custom" },
    features: [
      { text: "All Pro features", included: true },
      { text: "Priority support", included: true },
      { text: "Dedicated onboarding & training", included: true },
      { text: "Dedicated success manager", included: true },
      { text: "Custom SLA", included: true },
      { text: "Audit logs", included: true },
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-white/5 rounded-[100%] blur-[120px] pointer-events-none opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-xs font-bold tracking-[0.2em] text-orange-400 uppercase">
            Pricing
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Simple, transparent pricing.
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed">
            Choose the plan that fits your needs.
            <br className="hidden md:block" />
            Always know what you'll pay.
          </p>

          <div className="flex items-center justify-center gap-4 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span
              className={`text-sm font-medium transition-colors ${!isAnnual ? "text-white" : "text-neutral-500"}`}
            >
              Monthly
            </span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 bg-neutral-900 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-white/10 transition-colors"
              aria-label="Toggle billing cycle"
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            <span
              className={`text-sm font-medium transition-colors ${isAnnual ? "text-white" : "text-neutral-500"}`}
            >
              Yearly
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-linear-to-r from-emerald-500/20 to-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier) => (
            <div key={tier.id} className="relative group flex flex-col">
              {tier.popular && (
                <div className="absolute -inset-px bg-linear-to-b from-orange-500/40 via-purple-500/10 to-transparent rounded-3xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              )}

              <div
                className={`
                relative flex flex-col h-full p-8 rounded-3xl border transition-all duration-300
                ${
                  tier.popular
                    ? "bg-[#0A0A0A] border-white/10 shadow-2xl scale-[1.02] z-10"
                    : "bg-[#0A0A0A]/40 border-white/5 hover:border-white/10 hover:bg-[#0A0A0A]/60"
                }
              `}
              >
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {tier.name}
                    </h3>
                    {tier.popular && (
                      <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-wide">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-400 min-h-10">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-8 flex items-baseline gap-1">
                  {typeof tier.price.monthly === "number" ? (
                    <>
                      <span className="text-5xl font-bold text-white tracking-tighter">
                        ${isAnnual ? tier.price.yearly : tier.price.monthly}
                      </span>
                      <span className="text-neutral-500 text-sm font-medium">
                        /month
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-white tracking-tighter">
                      {tier.price.monthly}
                    </span>
                  )}
                </div>

                <div className="w-full h-px bg-white/5 mb-8"></div>

                <ul className="space-y-4 mb-8 grow">
                  {tier.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-3 text-sm ${feature.included ? "text-neutral-300" : "text-neutral-600 line-through decoration-neutral-700"}`}
                    >
                      {feature.included ? (
                        <Check
                          size={20}
                          className={`shrink-0 ${tier.popular ? "text-orange-400" : "text-white"}`}
                        />
                      ) : (
                        <Minus
                          size={20}
                          className="shrink-0 text-neutral-700"
                        />
                      )}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={`
                    w-full py-4 rounded-xl text-sm font-bold text-center transition-all duration-200
                    ${
                      tier.popular
                        ? "bg-white text-black hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                    }
                  `}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 pt-16 border-t border-white/5">
          <h3 className="text-2xl font-bold text-white text-center mb-16">
            Frequently Asked Questions
          </h3>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes, you can upgrade or downgrade at any time. If you upgrade, you'll be charged the prorated difference.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, Amex) and PayPal for annual plans.",
              },
              {
                q: "Is there a long-term contract?",
                a: "No. You can cancel your monthly subscription at any time. Annual subscriptions are paid upfront for a discount.",
              },
              {
                q: "Do you offer discounts for open source?",
                a: "Yes! If you're building open source software, contact us for a free Pro plan license.",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-3">
                <h4 className="font-medium text-white">{item.q}</h4>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
