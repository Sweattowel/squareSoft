import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export function MyProvider({ children }) {
  const [selectedSave, setSelectedSave] = useState(0);

  return (
    <MyContext.Provider value={{ selectedSave, setSelectedSave }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  const { selectedSave, setSelectedSave } = useContext(MyContext);
  return [selectedSave, setSelectedSave];
}
