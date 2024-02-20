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
      address: "0xa3F00Bc558A0Ef68a5Ee5Ffda924e7Ed95613328",
      network: "fantomTestnet",
    },
  },
});
