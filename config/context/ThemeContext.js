import React, { useContext, useReducer } from "react";

export const ThemeContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "setCount":
      return { count: JSON.parse(localStorage.getItem("cart")).length };
      break;
    default:
      return state;
      break;
  }
};

const ThemeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { count: "+" });

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
