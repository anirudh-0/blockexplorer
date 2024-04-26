import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import { JsonView } from "react-json-view-lite";
import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockData, setBlockData] = useState();

  useEffect(() => {
    async function getBlockData(blockNumber) {
      const blockData = await alchemy.core.getBlockWithTransactions(
        blockNumber
      );
      setBlockData(blockData);
    }

    async function getBlockNumber() {
      const blockNo = await alchemy.core.getBlockNumber();
      setBlockNumber(blockNo);
      getBlockData(blockNo);
    }

    getBlockNumber();
  }, []);

  return (
    <div className="App">
      <h1 className="block-title">Latest Block: {blockNumber}</h1>
      <JsonView data={blockData} style={{ basicChildStyle: "object-value" }} />
    </div>
  );
}

export default App;
