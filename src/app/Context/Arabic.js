"use client";

import { createContext, useContext, useState } from "react";

const DataAContext = createContext();

export function DataAProvider({ children }) {

    const [isarabic, setArabic] = useState(false)
    return (
        <DataAContext.Provider value={{ isarabic, setArabic }}>
            {children}
        </DataAContext.Provider>
    );
}

export function useData2() {
    return useContext(DataAContext);
}