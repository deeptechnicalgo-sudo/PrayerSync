"use client";

import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const CALCULATION_METHODS = [
    { id: 4, nameEn: "Umm al-Qura University, Makkah", nameAr: "جامعة أم القرى، مكة المكرمة" },
    { id: 3, nameEn: "Muslim World League (MWL)", nameAr: "رابطة العالم الإسلامي" },
    { id: 2, nameEn: "Islamic Society of North America (ISNA)", nameAr: "الجمعية الإسلامية لأمريكا الشمالية" },
    { id: 5, nameEn: "Egyptian General Authority of Survey", nameAr: "الهيئة المصرية العامة للمساحة" },
    { id: 1, nameEn: "University of Islamic Sciences, Karachi", nameAr: "جامعة العلوم الإسلامية بكراتشي" },
    { id: 16, nameEn: "Dubai (UAE / General Authority)", nameAr: "دبي (الهيئة العامة للشؤون الإسلامية)" },
    { id: 9, nameEn: "Kuwait Ministry of Awqaf", nameAr: "وزارة الأوقاف والشؤون الإسلامية بالكويت" },
    { id: 10, nameEn: "Qatar Calendar", nameAr: "التقويم القطري" },
    { id: 13, nameEn: "Diyanet İşleri Başkanlığı, Turkey", nameAr: "رئاسة الشؤون الدينية، تركيا" },
    { id: 11, nameEn: "Majlis Ugama Islam Singapura, Singapore", nameAr: "مجلس أوغاما إسلام سينغابورا، سنغافورة" },
    { id: 12, nameEn: "Union des Organisations Islamiques de France", nameAr: "اتحاد المنظمات الإسلامية في فرنسا" },
    { id: 14, nameEn: "Spiritual Administration of Muslims of Russia", nameAr: "الإدارة الدينية لمسلمي روسيا" },
    { id: 15, nameEn: "Moonsighting Committee Worldwide", nameAr: "لجنة رؤية الهلال العالمية" },
    { id: 7, nameEn: "Institute of Geophysics, University of Tehran", nameAr: "معهد الجيوفيزياء، جامعة طهران" },
    { id: 8, nameEn: "Gulf Region", nameAr: "منطقة الخليج العربي" },
];

export function DataProvider({ children }) {
    const [K, setk] = useState(false);
    const [nightLight, setNightLight] = useState(false);
    const [is12Hours, setIs12Hours] = useState(true);
    const [mounted, setMounted] = useState(false);

    const [monthEver, setMonthEverState] = useState(false);
    const [eventBusy, setEventBusyState] = useState(true);

    const [calcMethod, setCalcMethodState] = useState(4);
    const [asrSchool, setAsrSchoolState] = useState(0);
    const [minuteOffsets, setMinuteOffsetsState] = useState({ Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 });

    const [preBuffer, setPreBufferState] = useState(0);
    const [postBuffer, setPostBufferState] = useState(30);
    const [selectedPrayers, setSelectedPrayersState] = useState({
        Fajr: true,
        Dhuhr: true,
        Asr: true,
        Maghrib: true,
        Isha: true,
    });
    const [exportRange, setExportRangeState] = useState("month");

    useEffect(() => {
        try {
            const savedK = localStorage.getItem("prayersync_darkmode");
            if (savedK !== null) setk(savedK === "true");

            const savedNightLight = localStorage.getItem("prayersync_nightlight");
            if (savedNightLight !== null) setNightLight(savedNightLight === "true");

            const saved12H = localStorage.getItem("prayersync_12hours");
            if (saved12H !== null) setIs12Hours(saved12H === "true");

            const savedMonthEver = localStorage.getItem("prayersync_monthever");
            if (savedMonthEver !== null) setMonthEverState(savedMonthEver === "true");

            const savedEventBusy = localStorage.getItem("prayersync_eventbusy");
            if (savedEventBusy !== null) setEventBusyState(savedEventBusy === "true");

            const savedMethod = localStorage.getItem("prayersync_calcmethod");
            if (savedMethod !== null) setCalcMethodState(Number(savedMethod));

            const savedSchool = localStorage.getItem("prayersync_asrschool");
            if (savedSchool !== null) setAsrSchoolState(Number(savedSchool));

            const savedPreBuffer = localStorage.getItem("prayersync_prebuffer");
            if (savedPreBuffer !== null) setPreBufferState(Number(savedPreBuffer));

            const savedPostBuffer = localStorage.getItem("prayersync_postbuffer");
            if (savedPostBuffer !== null) setPostBufferState(Number(savedPostBuffer));

            const savedExportRange = localStorage.getItem("prayersync_exportrange");
            if (savedExportRange !== null) setExportRangeState(savedExportRange);

            const savedSelectedPrayers = localStorage.getItem("prayersync_selectedprayers");
            if (savedSelectedPrayers !== null) {
                try {
                    setSelectedPrayersState(JSON.parse(savedSelectedPrayers));
                } catch (e) {}
            }

            const savedOffsets = localStorage.getItem("prayersync_minuteoffsets");
            if (savedOffsets !== null) {
                try {
                    setMinuteOffsetsState(JSON.parse(savedOffsets));
                } catch (e) {}
            }
        } catch (e) {
            console.error("Failed to read preferences from localStorage", e);
        }
        setMounted(true);
    }, []);

    const toggleTheme = (val) => {
        setk(val);
        try {
            localStorage.setItem("prayersync_darkmode", String(val));
        } catch (e) {}
    };

    const toggleNightLight = (val) => {
        setNightLight(val);
        try {
            localStorage.setItem("prayersync_nightlight", String(val));
        } catch (e) {}
    };

    const toggle12Hours = (val) => {
        setIs12Hours(val);
        try {
            localStorage.setItem("prayersync_12hours", String(val));
        } catch (e) {}
    };

    const setMonth = (val) => {
        setMonthEverState(val);
        try {
            localStorage.setItem("prayersync_monthever", String(val));
        } catch (e) {}
    };

    const setEventBusy = (val) => {
        setEventBusyState(val);
        try {
            localStorage.setItem("prayersync_eventbusy", String(val));
        } catch (e) {}
    };

    const setCalcMethod = (val) => {
        const num = Number(val);
        setCalcMethodState(num);
        try {
            localStorage.setItem("prayersync_calcmethod", String(num));
        } catch (e) {}
    };

    const setAsrSchool = (val) => {
        const num = Number(val);
        setAsrSchoolState(num);
        try {
            localStorage.setItem("prayersync_asrschool", String(num));
        } catch (e) {}
    };

    const setPreBuffer = (val) => {
        const num = Number(val);
        setPreBufferState(num);
        try {
            localStorage.setItem("prayersync_prebuffer", String(num));
        } catch (e) {}
    };

    const setPostBuffer = (val) => {
        const num = Number(val);
        setPostBufferState(num);
        try {
            localStorage.setItem("prayersync_postbuffer", String(num));
        } catch (e) {}
    };

    const setExportRange = (val) => {
        setExportRangeState(val);
        try {
            localStorage.setItem("prayersync_exportrange", String(val));
        } catch (e) {}
    };

    const setSelectedPrayers = (prayerKey, isSelected) => {
        const updated = { ...selectedPrayers, [prayerKey]: isSelected };
        setSelectedPrayersState(updated);
        try {
            localStorage.setItem("prayersync_selectedprayers", JSON.stringify(updated));
        } catch (e) {}
    };

    const setMinuteOffsets = (prayerKey, offsetMinutes) => {
        const updated = { ...minuteOffsets, [prayerKey]: offsetMinutes };
        setMinuteOffsetsState(updated);
        try {
            localStorage.setItem("prayersync_minuteoffsets", JSON.stringify(updated));
        } catch (e) {}
    };

    return (
        <DataContext.Provider
            value={{
                K,
                setk: toggleTheme,
                nightLight,
                setNightLight: toggleNightLight,
                is12Hours,
                setIs12Hours: toggle12Hours,
                mounted,
                monthEver,
                setMonth,
                eventBusy,
                setEventBusy,
                calcMethod,
                setCalcMethod,
                asrSchool,
                setAsrSchool,
                preBuffer,
                setPreBuffer,
                postBuffer,
                setPostBuffer,
                exportRange,
                setExportRange,
                selectedPrayers,
                setSelectedPrayers,
                minuteOffsets,
                setMinuteOffsets,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}