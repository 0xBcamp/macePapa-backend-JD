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
      address: "0xb99599CBC593Bc283a4E9FC507A04cFDC9462094",
      network: "fantomTestnet",
    },
  },
});
