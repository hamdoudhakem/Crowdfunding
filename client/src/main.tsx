import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import {
  coinbaseWallet,
  metamaskWallet,
  ThirdwebProvider,
  walletConnect,
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { App } from "./App";
import "./index.css";

import { StateContextProvider } from "./context";

const docRoot = document.getElementById("root")!;
const root = ReactDOM.createRoot(docRoot);

root.render(
  <ThirdwebProvider
    activeChain={Sepolia}
    supportedWallets={[
      metamaskWallet({
        recommended: true,
      }),
      coinbaseWallet(),
      walletConnect(),
    ]}
    // clientId="714e9827ce9001db6eeb5062d46d3c17"
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
