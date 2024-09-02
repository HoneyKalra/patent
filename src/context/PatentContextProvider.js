import React, { useState } from "react";
import { createContext } from "react";
import { patentsInfo } from "../constants/PatentsData";
export const PatentContext = createContext();
export default function PatentContextProvider({ children }) {
  const [patentsData, setPatentsData] = useState(patentsInfo);
  const [selectedPatent, setSelectedPatent] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(patentsData, "fgdshfdgsfds");
  // useEffect
  //     (() => {
  //         async function fetchPatents() {
  //             setError("");
  //             try {
  //                 const response = await fetch("http://localhost:8000/patents");
  //                 if (!response.ok) {
  //                     throw new Error("Something Went Wrong");

  //                 }
  //                 const data = await response.json();
  //                 setPatentsData(data);

  //             }
  //             catch (err) {
  //                 console.log(err)
  //             }
  //             finally { setLoading(false) }

  //         }
  //         fetchPatents();

  //     }, [])

  const patentSelected = (patentId) => {
    const choosenPatent = patentsData.find(
      (patent) => patent.patentId === patentId
    );
    if (choosenPatent) {
      setSelectedPatent(choosenPatent);
    }
  };
  console.log(selectedPatent, "ariff");

  return (
    <PatentContext.Provider
      value={{
        patentsData,
        setPatentsData,
        isLoading,
        setLoading,
        error,
        setError,
        selectedPatent,
        patentSelected,
      }}
    >
      {children}
    </PatentContext.Provider>
  );
}
