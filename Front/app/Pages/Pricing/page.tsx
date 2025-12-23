"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, HelpCircle, ArrowRight, Star, Zap, Shield, Globe } from "lucide-react";
import Link from "next/link";

const PricingPage = () => {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

    const plans = [
        {
            name: "Starter",
            description: "Perfect for small teams and startups looking to hire their first employees.",
            monthlyPrice: 0,
            yearlyPrice: 0,
            features: [
                "Post 1 active job",
                "Basic applicant tracking",
                "Standard job visibility (7 days)",
                "Email support",
                "Public company profile"
            ],
            cta: "Start for free",
            popular: false,
            icon: <Zap className="w-6 h-6 text-blue-500" />
        },
        {
            name: "Professional",
            description: "Scale your hiring with advanced tools and better visibility.",
            monthlyPrice: 59,
            yearlyPrice: 49,
            features: [
                "Post 10 active jobs",
                "Advanced filtration & sorting",
                "Enterprise job visibility (30 days)",
                "Priority email & chat support",
                "Custom company branding",
                "Analytics dashboard",
                "Featured job badge"
            ],
            cta: "Get started",
            popular: true,
            icon: <Star className="w-6 h-6 text-primary-500" />
        },
        {
            name: "Enterprise",
            description: "Tailored solutions for large organizations with complex needs.",
            monthlyPrice: "Custom",
            yearlyPrice: "Custom",
            features: [
                "Unlimited job posts",
                "Custom recruitment workflow",
                "Dedicated account manager",
                "API & Webhook access",
                "Premium integrations (Slack, HRIS)",
                "Multi-user collaboration",
                "SSO & Advanced Security"
            ],
            cta: "Contact Sales",
            popular: false,
            icon: <Shield className="w-6 h-6 text-purple-500" />
        }
    ];

    const faqs = [
        {
            question: "Can I upgrade or downgrade my plan at any time?",
            answer: "Yes, you can change your plan at any time from your dashboard. If you upgrade, the changes take effect immediately. If you downgrade, the changes will take effect at the end of your current billing cycle."
        },
        {
            question: "Do you offer a free trial?",
            answer: "We offer a 'Starter' plan which is free forever. For the Professional plan, we provide a 14-day trial period where you can explore all premium features."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and for Enterprise customers, we also support bank transfers and invoicing."
        },
        {
            question: "Is there a limit on how many applications I can receive?",
            answer: "No, we don't limit the number of applications you can receive on any of our plans. We believe in helping you find the best talent without any restrictions."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-16">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary-50/50 to-transparent -z-10" />

            <div className="container-custom">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-primary-600 uppercase bg-primary-50 rounded-full">
                            Pricing Plans
                        </span>
                        <h1 className="mb-6">Find the perfect plan for your business</h1>
                        <p className="text-lg text-slate-600">
                            Transform your hiring process with our powerful tools. Choose a plan that scales with your growth.
                        </p>
                    </motion.div>

                    {/* Billing Toggle */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-10 flex items-center justify-center gap-4"
                    >
                        <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
                        <button
                            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                            className="relative w-14 h-7 bg-slate-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                            <div
                                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${billingCycle === 'yearly' ? 'translate-x-7' : ''}`}
                            />
                        </button>
                        <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-500'}`}>
                            Yearly <span className="ml-1 text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">Save 20%</span>
                        </span>
                    </motion.div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index + 0.3 }}
                            className={`relative flex flex-col p-8 rounded-3xl ${plan.popular
                                    ? 'bg-white border-2 border-primary-500 shadow-2xl scale-105 z-10'
                                    : 'bg-white/60 backdrop-blur-sm border border-slate-200 shadow-xl'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className="mb-4 inline-flex p-3 rounded-2xl bg-slate-50 border border-slate-100">
                                    {plan.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold">
                                        {typeof plan.monthlyPrice === 'number'
                                            ? `$${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}`
                                            : plan.monthlyPrice}
                                    </span>
                                    {typeof plan.monthlyPrice === 'number' && (
                                        <span className="text-slate-500 font-medium">/mo</span>
                                    )}
                                </div>
                                {billingCycle === 'yearly' && typeof plan.monthlyPrice === 'number' && plan.monthlyPrice > 0 && (
                                    <p className="text-xs text-green-600 font-medium mt-1">Billed annually (${plan.yearlyPrice}/year)</p>
                                )}
                            </div>

                            <button className={`w-full py-3 px-6 rounded-xl font-bold transition-all mb-8 ${plan.popular
                                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30 active:scale-95'
                                    : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
                                }`}>
                                {plan.cta}
                            </button>

                            <div className="space-y-4 flex-grow">
                                <p className="text-sm font-bold text-slate-900 uppercase tracking-wider">What's included:</p>
                                <ul className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                                                <Check className="w-3.5 h-3.5 text-green-600" />
                                            </div>
                                            <span className="text-slate-600 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Badges */}
                <div className="text-center mb-24">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-8">Trusted by industry leaders globally</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* We can just use text for demos if no logos available */}
                        <div className="flex items-center gap-2 font-bold text-xl"><Globe className="w-6 h-6" /> TechNext</div>
                        <div className="flex items-center gap-2 font-bold text-xl"><Shield className="w-6 h-6" /> SafeHire</div>
                        <div className="flex items-center gap-2 font-bold text-xl"><Star className="w-6 h-6" /> FutureWorks</div>
                        <div className="flex items-center gap-2 font-bold text-xl"><Zap className="w-6 h-6" /> RapidFlow</div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto mb-24">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-600">Everything you need to know about our pricing and services.</p>
                    </div>
                    <div className="grid gap-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index + 0.5 }}
                                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center">
                                        <HelpCircle className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2">{faq.question}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-slate-900 rounded-[3rem] p-12 overflow-hidden text-center text-white"
                >
                    {/* Decorative gradients */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-white mb-6">Ready to find your next great hire?</h2>
                        <p className="text-slate-400 mb-10 text-lg">
                            Join 10,000+ companies already using ProjectX to build world-class teams.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/Pages/Register" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-primary-500/20 flex items-center gap-2">
                                Get Started Now <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl font-bold transition-all backdrop-blur-sm">
                                Schedule a Demo
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PricingPage;
