import React from "react";

export const AppContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {},
});