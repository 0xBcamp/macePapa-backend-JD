import { createConfig } from "@ponder/core";
import { http } from "viem";

import { R8RAbi } from "./abis/R8RAbi";

export default createConfig({
  networks: {
    fantomTestnet: {
      chainId: 4002,
      transport: http(process.env.PONDER_RPC_URL_4002),
    },
  },
  contracts: {
    R8R: {
      abi: R8RAbi,
      address: "0xF906cAFF80049E09c3Da47d42e7D38920CD1b8f1",
      network: "fantomTestnet",
    },
  },
});
