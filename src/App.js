import Router from "./routes/Router";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GlobalContext } from "./contexts/GlobalContext";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("cookenu-token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const context = { isAuth, setIsAuth };

  return (
    <GlobalContext.Provider value={context}>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </GlobalContext.Provider>
  );
}

export default App;
