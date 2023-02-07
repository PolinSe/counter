import React from 'react';
import './App.css';


export const setToLocalStorage = (key: string, value: number) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = (key: string): string | null => {

    let valueAsString = localStorage.getItem(key)

    if (valueAsString) {
        let newValue = JSON.parse(valueAsString)
        return newValue
    }

    return null
}

