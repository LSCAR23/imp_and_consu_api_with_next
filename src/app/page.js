"use client";

import LoginForm from "@/components/LoginForm";

export default function HomePage() {
    return (
        <div className="min-h-screen flex items-center justify-center text-white" style={{ color: 'var(--foreground)', backgroundColor: 'var(--background)' }}>
            <div className="max-w-md w-full p-6">
                <LoginForm />
            </div>
        </div>
    );
}
