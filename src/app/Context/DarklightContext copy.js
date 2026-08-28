"use client";

import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
    const [K, setk] = useState(false);
    const [nightLight, setNightLight] = useState(false);
    const [is12Hours, setIs12Hours] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [monthEver, setMonthEverState] = useState(false);

    useEffect(() => {
        try {
            const savedK = localStorage.getItem("prayersync_darkmode");
            if (savedK !== null) {
                setk(savedK === "true");
            }
            const savedNightLight = localStorage.getItem("prayersync_nightlight");
            if (savedNightLight !== null) {
                setNightLight(savedNightLight === "true");
            }
            const saved12H = localStorage.getItem("prayersync_12hours");
            if (saved12H !== null) {
                setIs12Hours(saved12H === "true");
            }
            const savedMonthEver = localStorage.getItem("prayersync_monthever");
            if (savedMonthEver !== null) {
                setMonthEverState(savedMonthEver === "true");
            }
        } catch (e) {
            console.error("Failed to read preferences from localStorage", e);
        }
        setMounted(true);
    }, []);

    const updateK = (val) => {
        setk(val);
        try {
            localStorage.setItem("prayersync_darkmode", String(val));
        } catch (e) {}
    };

    const updateNightLight = (val) => {
        setNightLight(val);
        try {
            localStorage.setItem("prayersync_nightlight", String(val));
        } catch (e) {}
    };

    const updateIs12Hours = (val) => {
        setIs12Hours(val);
        try {
            localStorage.setItem("prayersync_12hours", String(val));
        } catch (e) {}
    };

    const updateMonthEver = (val) => {
        setMonthEverState(val);
        try {
            localStorage.setItem("prayersync_monthever", String(val));
        } catch (e) {}
    };

    useEffect(() => {
        if (!mounted) return;
        if (nightLight) {
            document.documentElement.classList.add("night-light-active");
        } else {
            document.documentElement.classList.remove("night-light-active");
        }
    }, [nightLight, mounted]);

    useEffect(() => {
        if (!mounted) return;
        if (K) {
            document.documentElement.classList.add("dark-theme");
            document.documentElement.classList.remove("light-theme");
            document.body.style.backgroundColor = "#0f1412";
        } else {
            document.documentElement.classList.add("light-theme");
            document.documentElement.classList.remove("dark-theme");
            document.body.style.backgroundColor = "#f5faf9";
        }
    }, [K, mounted]);

    return (
        <DataContext.Provider value={{
            K,
            setk: updateK,
            nightLight,
            setNightLight: updateNightLight,
            is12Hours,
            setIs12Hours: updateIs12Hours,
            monthEver,
            Month: monthEver,
            setMonth: updateMonthEver,
            setmonth: updateMonthEver,
            mounted
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}