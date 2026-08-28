"use client";

import { createContext, useContext, useState, useEffect } from "react";

const DataAContext = createContext();

export function DataAProvider({ children }) {
    const [isarabic, setArabicState] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        try {
            const savedArabic = localStorage.getItem("prayersync_arabic");
            if (savedArabic !== null) {
                setArabicState(savedArabic === "true");
            }
        } catch (e) {
            console.error("Failed to read language preference from localStorage", e);
        }
        setMounted(true);
    }, []);

    const setArabic = (val) => {
        setArabicState(val);
        try {
            localStorage.setItem("prayersync_arabic", String(val));
        } catch (e) {}
    };

    useEffect(() => {
        if (!mounted) return;
        document.documentElement.dir = isarabic ? "rtl" : "ltr";
        document.documentElement.lang = isarabic ? "ar" : "en";
    }, [isarabic, mounted]);

    return (
        <DataAContext.Provider value={{ isarabic, setArabic, mounted }}>
            {children}
        </DataAContext.Provider>
    );
}

export function useData2() {
    return useContext(DataAContext);
}