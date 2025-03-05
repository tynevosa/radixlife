import { useEffect, useState } from "react";
import { GatewayApiClient } from "@radixdlt/babylon-gateway-api-sdk";
import {
  RadixDappToolkit,
  RadixNetwork,
  Logger,
  DataRequestBuilder,
  generateRolaChallenge,
} from "@radixdlt/radix-dapp-toolkit";

const logger = Logger();
const dAppDefinitionAddress = import.meta.env.VITE_DAPP_DEFINITION_ADDRESS;
const networkId = RadixNetwork.Stokenet;

// Lazy initialization to prevent SSR errors
let dAppToolkitInstance: RadixDappToolkit | null = null;

export function useRadixDappToolkit() {
  const [dAppToolkit, setDAppToolkit] = useState<RadixDappToolkit | null>(null);
  const [gatewayApi, setGatewayApi] = useState<GatewayApiClient | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !dAppToolkitInstance) {
      const toolkit = RadixDappToolkit({
        dAppDefinitionAddress,
        networkId,
        logger,
      });

      toolkit.walletApi.provideChallengeGenerator(async () =>
        generateRolaChallenge()
      );

      toolkit.walletApi.setRequestData(
        DataRequestBuilder.persona().withProof(),
        DataRequestBuilder.accounts().atLeast(1)
      );

      const gateway = GatewayApiClient.initialize(
        toolkit.gatewayApi.clientConfig
      );

      dAppToolkitInstance = toolkit;
      setDAppToolkit(toolkit);
      setGatewayApi(gateway);
    }
  }, []);

  return { dAppToolkit, gatewayApi };
}
