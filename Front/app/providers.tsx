'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AuthProvider } from './Context/AuthContext';
import { JobProvider } from './Context/JobContext';
import { CompanyProvider } from './Context/CompanyContext';
import { ArticleProvider } from './Context/ArticleContext';
import { ApplicationProvider } from './Context/ApplicationContext';
import { NotificationProvider } from './Context/NotificationContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AuthProvider>
                <JobProvider>
                    <CompanyProvider>
                        <ArticleProvider>
                            <ApplicationProvider>
                                <NotificationProvider>
                                    {children}
                                </NotificationProvider>
                            </ApplicationProvider>
                        </ArticleProvider>
                    </CompanyProvider>
                </JobProvider>
            </AuthProvider>
        </NextThemesProvider>
    );
}
