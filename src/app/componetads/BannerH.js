'use client';

import { useEffect, useRef } from 'react';

export default function BannerAd() {
    const adContainerRef = useRef(null);

    useEffect(() => {
        if (!adContainerRef.current) return;

        // إنشاء عنصر script جديد
        const script = document.createElement('script');

        // إصلاح المسار بالبادئة الشاملة https
        script.src = "https://conventionalresponse.com/bpX/VBs.dGGvlr0FYHWbcp/ceLmq9eu/ZqUyljk-P/TYcTznOADocox/NYDFkXtTNyzmM/4hN/z/EY1BMLwb";
        script.async = true;
        script.referrerPolicy = 'no-referrer-when-downgrade';
        script.settings = {}; // إعدادات الإعلان

        // إدراج السكريبت مباشرة داخل حاوية الإعلان
        adContainerRef.current.appendChild(script);

        return () => {
            // تنظيف عند مغادرة الصفحة لمنع تكرار الإعلانات
            if (adContainerRef.current) {
                adContainerRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div ref={adContainerRef} className="banner-ad-box">
            {/* سيتم حقن الإعلان هنا تلقائياً */}
        </div>
    );
}