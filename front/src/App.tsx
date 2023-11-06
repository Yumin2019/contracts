import { useEffect, useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MyAnimal from "./routes/my-animal";
import Main from "./routes/main";

function App() {
  const [account, setAccount] = useState<string>("");

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
  }, [account]);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Main account={account} />} />
            <Route path="my-animal" element={<MyAnimal account={account} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
