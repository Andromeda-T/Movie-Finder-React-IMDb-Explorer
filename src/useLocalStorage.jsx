import { useState, useEffect } from "react";

export function useLocalStorage(intialState, key) {
    const [value, setValue] = useState(function () {
        const stored = localStorage.getItem(`${key}`);
        return stored ? JSON.parse(stored) : intialState;
    });

    useEffect(() => {
        localStorage.setItem(`${key}`, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}
