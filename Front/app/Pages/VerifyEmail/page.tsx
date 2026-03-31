"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [timer, setTimer] = useState(60);
    const { user, verifyEmail, resendOTP } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/Pages/Login");
            return;
        }
        if (user.isVerified) {
            router.push("/");
        }
    }, [user, router]);

    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value[0];
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join("");
        if (code.length !== 6) {
            setError("Please enter the full 6-digit code.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            await verifyEmail(code);
            setSuccess(true);
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid or expired OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (timer > 0) return;
        try {
            await resendOTP();
            setTimer(60);
            setError(null);
        } catch (err: any) {
            setError("Failed to resend OTP. Please try again later.");
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 text-center"
                >
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-4">Email Verified!</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        Your account has been successfully verified. Welcome to the platform!
                    </p>
                    <div className="flex items-center justify-center gap-2 text-primary-600 font-bold animate-pulse">
                        Redirecting to home <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white">Verify Email</h2>
                    <p className="text-slate-600 dark:text-slate-400 mt-3">
                        We've sent a 6-digit verification code to <span className="font-bold text-slate-900 dark:text-white">{user?.email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex justify-between gap-2">
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                id={`otp-${idx}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(idx, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(idx, e)}
                                className="w-12 h-14 text-center text-2xl font-bold bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary-500 focus:ring-0 transition-all dark:text-white"
                                required
                            />
                        ))}
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm border border-red-100 dark:border-red-800"
                        >
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Verify Account
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Didn't receive the code?{" "}
                        <button
                            onClick={handleResend}
                            disabled={timer > 0}
                            className={`font-bold transition-colors ${timer > 0 ? "text-slate-400 cursor-not-allowed" : "text-primary-600 hover:text-primary-700"}`}
                        >
                            {timer > 0 ? `Resend in ${timer}s` : "Resend Now"}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
