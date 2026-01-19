'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AuthProvider } from './Context/AuthContext';
import { JobProvider } from './Context/JobContext';
import { CompanyProvider } from './Context/CompanyContext';
import { ApplicationProvider } from './Context/ApplicationContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AuthProvider>
                <JobProvider>
                    <CompanyProvider>
                        <ApplicationProvider>
                            {children}
                        </ApplicationProvider>
                    </CompanyProvider>
                </JobProvider>
            </AuthProvider>
        </NextThemesProvider>
    );
}
