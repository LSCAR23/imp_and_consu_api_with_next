"use client";

import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center text-white" style={{ color: 'var(--foreground)', backgroundColor: 'var(--background)' }}>
            <div className="max-w-md w-full p-6">
                <RegisterForm></RegisterForm>
            </div>
        </div>
    );
}