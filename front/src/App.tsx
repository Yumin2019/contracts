import { useEffect, useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./routes/main";

function App() {
  const [account, setAccount] = useState<String>("");

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
        console.log(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
