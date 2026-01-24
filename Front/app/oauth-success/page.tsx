'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/Context/AuthContext';

const OAuthContent = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const { oauthLogin } = useAuth();
    const initialized = useRef(false);

    useEffect(() => {
        if (!token || initialized.current) return;
        initialized.current = true;
        oauthLogin(token);
    }, [token, oauthLogin]);

    return (
        <div className="flex h-screen items-center justify-center bg-white dark:bg-slate-900">
            <div className="flex flex-col items-center gap-4">
                {/* Simple spinner */}
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
                    Authenticating with provider...
                </p>
            </div>
        </div>
    );
};

const OAuthSuccessPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OAuthContent />
        </Suspense>
    );
};

export default OAuthSuccessPage;
