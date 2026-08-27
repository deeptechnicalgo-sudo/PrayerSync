"use client";

import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
    const [K, setk] = useState(false);
    const [is12Hours, setIs12Hours] = useState(true);

    return (
        <DataContext.Provider value={{ K, setk, is12Hours, setIs12Hours }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}