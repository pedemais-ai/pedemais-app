import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<>Loading...</>}>
            {children}
        </Suspense>
    );
}
