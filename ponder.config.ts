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
      address: "0x298C3B02db7661338f75AF0076134f4D1BFD8928",
      network: "fantomTestnet",
    },
  },
});
