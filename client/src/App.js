import abi from "./contracts/Charity.json"
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import "./App.css"
import Donate from "./components/Donate";
import Donations from "./components/Donations";
import img from "./img/img.jpg"

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState("No account connected");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x3326863dA468c98767cd28B8b9Ad0175286aC0f7";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress, contractABI, signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        }
        else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, [])
  // console.table(state);
  return (
    <>
      <div style={{ backgroundColor: "#5943B6", height: "100%" ,paddingBottom:"5px"}}>
        <img src={img} className="img-fluid" alt="donate" width="100%" height="50%" />
        <p
          className="text-muted lead "
          style={{ marginTop: "10px", marginLeft: "5px" }}
        >
          <small style={{color:"#ffffff"}}>Connected Account : {account}</small>
        </p>
        <div className="container">
          <Donate state={state} />
          <Donations state={state} />
        </div>
      </div>

    </>
  )
}

export default App;