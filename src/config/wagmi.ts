import { http, createConfig, injected } from "wagmi";
import { botchainMainnet } from "./contract";

export const wagmiConfig = createConfig({
  chains: [botchainMainnet],
  connectors: [
    injected(),
  ],
  transports: {
    [botchainMainnet.id]: http(),
  },
  ssr: true,
});

