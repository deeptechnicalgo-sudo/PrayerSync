"use client";

export default function TermsPage() {
    return (
        <div className="page-container">
            <button type="button" onClick={() => window.close()} className="back-button">Back</button>
            <h1>Terms of Service</h1>
            <p>By accessing or using this application, you agree to these Terms of Service.</p>

            <h2>1. Changes to These Terms</h2>
            <p>We reserve the right to change, update, or modify these Terms of Service at any time without prior approval from users. Updated Terms may be published within the application or on our website. Your continued use of the application after changes are published constitutes acceptance of the updated Terms.</p>

            <h2>2. Ownership and Copyright</h2>
            <p>This application and its original materials are our property or are used under appropriate authorization. This includes, but is not limited to: Source code, Software, User interface, Designs, Graphics, Logos and branding, and Text and other original content. All such materials are protected by applicable copyright and intellectual property laws.</p>

            <h2>3. Prohibited Copying</h2>
            <p>You may <strong>not copy, reproduce, duplicate, modify, distribute, publish, sell, or redistribute the source code or any substantial portion of the source code of this application</strong> without our prior written permission. You may not use our source code to create, distribute, or operate another application or service. You may not attempt to obtain, extract, or reproduce the source code through unauthorized means.</p>

            <h2>4. Legal Enforcement</h2>
            <p>If you violate these Terms or unlawfully use our copyrighted materials or source code, we reserve the right to take appropriate legal action and seek any remedies available under applicable law.</p>

            <h2>5. Acceptance</h2>
            <p>By using this application, you acknowledge that you have read and agreed to these Terms of Service. If you do not agree to these Terms, you must not use the application.</p>
        </div>
    );
}