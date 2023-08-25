import { createContext, useState, useContext } from "react";
import { themeOptions } from "../Utils/themeOptions";

const ThemeContext = createContext();

export const ThemeContextProvider = ({children})=> {

const defaultTheme = JSON.parse(localStorage.getItem('theme')) || themeOptions[0].value ; // if user opens website for
//  first time then by default the 1st theme is applied but if user changes its it become permanent and stored in local storage.

const [theme, setTheme] =  useState(defaultTheme);

const values = {
    theme,
    setTheme
};

    return(
<ThemeContext.Provider value = {values}>{children}</ThemeContext.Provider>
    )
};

export const useTheme=()=> useContext(ThemeContext);