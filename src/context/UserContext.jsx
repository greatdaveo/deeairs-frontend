import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //   To check if user is logged in
  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo) {
        const response = await fetch("http://localhost:4000/profile", {
          credentials: "include",
        });
        const data = await response.json();
        setUserInfo(data);
        setIsLoading(true);
      }
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
