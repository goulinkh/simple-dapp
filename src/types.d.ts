import { Web3Provider } from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum: ExternalProvider & { on: any };
  }
}
