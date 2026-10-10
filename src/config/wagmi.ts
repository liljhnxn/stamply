import { http, createConfig, injected } from "wagmi";
import { botchainTestnet } from "./contract";

export const wagmiConfig = createConfig({
  chains: [botchainTestnet],
  connectors: [
    injected(),
  ],
  transports: {
    [botchainTestnet.id]: http(),
  },
  ssr: true,
});
