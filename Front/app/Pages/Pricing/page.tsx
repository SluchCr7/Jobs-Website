"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, HelpCircle, ArrowRight, Star, Zap, Shield, Globe, Award, Briefcase } from "lucide-react";
import Link from "next/link";


interface Plan {
    name: string;
    description: string;
    monthlyPrice: number | string;
    yearlyPrice: number | string;
    features: string[];
    cta: string;
    popular: boolean;
    icon: React.ReactNode;
}

const PricingPage = () => {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

    const plans: Plan[] = [
        {
            name: "Free",
            description: "Essential tools for small businesses.",
            monthlyPrice: 0,
            yearlyPrice: 0,
            features: [
                "Post 1 active job",
                "Basic applicant tracking",
                "Standard visibility (7 days)",
                "Email support",
                "Company profile"
            ],
            cta: "Start Free",
            popular: false,
            icon: <Zap className="w-6 h-6 text-emerald-500" />
        },
        {
            name: "Pro",
            description: "Advanced features for growing teams.",
            monthlyPrice: 59,
            yearlyPrice: 49,
            features: [
                "Post 5 active jobs",
                "Advanced AI matching",
                "Priority visibility (30 days)",
                "24/7 Priority support",
                "Custom branding",
                "Team collaboration",
                "Detailed analytics"
            ],
            cta: "Upgrade to Pro",
            popular: true,
            icon: <Star className="w-6 h-6 text-primary-500" />
        },
        {
            name: "Premium",
            description: "Complete solution for large organizations.",
            monthlyPrice: 199,
            yearlyPrice: 159,
            features: [
                "Unlimited job posts",
                "Dedicated account manager",
                "Featured listing badge",
                "ATS Integration support",
                "Custom workflows",
                "In-depth market insights",
                "Priority support line"
            ],
            cta: "Get Premium",
            popular: false,
            icon: <Shield className="w-6 h-6 text-purple-500" />
        }
    ];

    const faqs = [
        {
            question: "Can I upgrade or downgrade anytime?",
            answer: "Absolutely. You can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the end of your billing cycle."
        },
        {
            question: "Is there a free trial?",
            answer: "Yes! Our Basic plan is free forever. For Professional features, we offer a 14-day free trial with no credit card required."
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept all major credit cards, PayPal, and wire transfers for Enterprise accounts."
        },
        {
            question: "Are there hidden fees?",
            answer: "No. The price you see is the price you pay. All taxes and fees are included in the listed price."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors pt-24 pb-20 font-sans overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary-50/80 dark:from-primary-900/10 to-transparent -z-10" />

            <div className="container-custom relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-sm font-bold mb-6 border border-primary-200 dark:border-primary-800">
                            <Award className="w-4 h-4" /> Simple Pricing
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                            Plans that grow with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">your business</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                            Choose the perfect plan to streamline your hiring process. No hidden fees, cancel anytime.
                        </p>
                    </motion.div>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 w-fit mx-auto">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${billingCycle === "monthly"
                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${billingCycle === "yearly"
                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                }`}
                        >
                            Yearly <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded ml-1">-20%</span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex flex-col p-8 rounded-[2rem] transition-all duration-300 ${plan.popular
                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl scale-105 z-10 ring-4 ring-primary-500/20"
                                : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl hover:shadow-2xl"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1.5">
                                    <Star className="w-3.5 h-3.5 fill-white" /> Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${plan.popular
                                    ? "bg-white/10 dark:bg-slate-100/10 border-white/10 dark:border-slate-900/10"
                                    : "bg-slate-50 dark:bg-slate-700 border-slate-100 dark:border-slate-600"
                                    }`}>
                                    {plan.icon}
                                </div>
                                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-white"}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm leading-relaxed ${plan.popular ? "text-slate-300 dark:text-slate-600" : "text-slate-500 dark:text-slate-400"}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-8 relative">
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-5xl font-bold tracking-tight ${plan.popular ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-white"}`}>
                                        {typeof plan.monthlyPrice === "number"
                                            ? `$${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}`
                                            : plan.monthlyPrice}
                                    </span>
                                    {typeof plan.monthlyPrice === "number" && (
                                        <span className={`font-medium ${plan.popular ? "text-slate-400 dark:text-slate-500" : "text-slate-400 dark:text-slate-500"}`}>/mo</span>
                                    )}
                                </div>
                                {billingCycle === "yearly" && typeof plan.monthlyPrice === "number" && typeof plan.yearlyPrice === "number" && plan.monthlyPrice > 0 && (
                                    <p className="text-xs text-green-500 font-bold mt-2">Billed ${plan.yearlyPrice * 12} yearly</p>
                                )}
                            </div>

                            <button className={`w-full py-4 rounded-xl font-bold mb-8 transition-transform active:scale-95 flex items-center justify-center gap-2 ${plan.popular
                                ? "bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/30"
                                : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white"
                                }`}>
                                {plan.cta} <ArrowRight className="w-4 h-4" />
                            </button>

                            <div className="space-y-4">
                                <p className={`text-xs font-bold uppercase tracking-widest ${plan.popular ? "text-slate-500 dark:text-slate-400" : "text-slate-400 dark:text-slate-500"}`}>
                                    Features
                                </p>
                                <ul className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <div className={`mt-0.5 shrink-0 rounded-full w-5 h-5 flex items-center justify-center ${plan.popular ? "bg-white/20 dark:bg-slate-900/10" : "bg-primary-50 dark:bg-primary-900/20"
                                                }`}>
                                                <Check className={`w-3 h-3 ${plan.popular ? "text-white dark:text-slate-900" : "text-primary-600 dark:text-primary-400"}`} />
                                            </div>
                                            <span className={`text-sm font-medium ${plan.popular ? "text-slate-200 dark:text-slate-600" : "text-slate-600 dark:text-slate-300"}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-500 dark:text-slate-400">Everything you need to know about our pricing.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
                            >
                                <div className="flex gap-4">
                                    <div className="mt-1 shrink-0 w-8 h-8 rounded-lg bg-primary-50 dark:bg-slate-700 flex items-center justify-center text-primary-600 dark:text-primary-400">
                                        <HelpCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="relative rounded-[2.5rem] bg-slate-900 dark:bg-primary-950 overflow-hidden px-8 py-20 text-center">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                            <Briefcase className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to scale your team?</h2>
                        <p className="text-slate-400 text-lg mb-10">Join thousands of companies finding their perfect candidates today.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/Pages/Register" className="btn-primary py-4 px-8 text-lg shadow-xl shadow-primary-500/20 hover:scale-105 transition-transform w-full sm:w-auto">
                                Start Hiring Now
                            </Link>
                            <button className="px-8 py-4 rounded-xl text-white font-bold border border-white/10 hover:bg-white/10 transition w-full sm:w-auto">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PricingPage;
