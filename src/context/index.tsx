import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch, useEffect } from "react";

import { GatewayApiClient, ProgrammaticScryptoSborValueString, ProgrammaticScryptoSborValueTuple } from "@radixdlt/babylon-gateway-api-sdk";
import {
  RadixDappToolkit,
  RadixNetwork,
  Logger,
  DataRequestBuilder,
  generateRolaChallenge,
} from "@radixdlt/radix-dapp-toolkit";
import { fetchCharacterInfo, CHARACTER_INFO } from "../api/character_info";
import { NFT_INFO } from "../type/character";

const logger = Logger();
const dAppDefinitionAddress = import.meta.env.VITE_DAPP_DEFINITION_ADDRESS;
const networkId = RadixNetwork.Stokenet;

const NFT_ADDRESS = import.meta.env.VITE_NFT_ADDRESS;

// Lazy initialization to prevent SSR errors
let dAppToolkitInstance: RadixDappToolkit | null = null;


// Define the type for the context
interface RadixianContextType {
  info?: CHARACTER_INFO,
  setInfo: Dispatch<SetStateAction<any>>,
  dAppToolkit?: RadixDappToolkit,
  gatewayApi?: GatewayApiClient,
  NFTs: NFT_INFO[],
  setNFTs: Dispatch<SetStateAction<NFT_INFO[]>>,
  selectedNFT?: NFT_INFO,
  setSelectedNFT: Dispatch<SetStateAction<NFT_INFO | undefined>>,
}


// Create the context with an initial value
const RadixianContext: React.Context<RadixianContextType | undefined> = createContext<RadixianContextType | undefined>(undefined);

const RadixianProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfo] = useState<CHARACTER_INFO>();
  const [dAppToolkit, setDAppToolkit] = useState<RadixDappToolkit>();
  const [gatewayApi, setGatewayApi] = useState<GatewayApiClient>();
  const [NFTs, setNFTs] = useState<NFT_INFO[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFT_INFO>();

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

  useEffect(() => {
    if (dAppToolkit && gatewayApi) {
      dAppToolkit.buttonApi.setMode('dark');
      dAppToolkit.walletApi.walletData$.subscribe(async (data) => {
        if (data.accounts.length) {
          const entity = await gatewayApi.state.getEntityDetailsVaultAggregated(data.accounts[0].address);
          const { non_fungible_resources } = entity;
          const { items } = non_fungible_resources;
          const item = items.find(item => item.resource_address === NFT_ADDRESS);
          const ids = item?.vaults.items[0].items || [];
          if (ids.length) {
            const nfts = await gatewayApi.state.getNonFungibleData(NFT_ADDRESS, ids);
            const mapped_nfts: NFT_INFO[] = nfts.map(nft => ({
              id: nft.non_fungible_id,
              name: ((nft.data?.programmatic_json as ProgrammaticScryptoSborValueTuple).fields.find(field => field.field_name === "name") as ProgrammaticScryptoSborValueString).value
            }))
            setNFTs(mapped_nfts);
            setSelectedNFT(mapped_nfts[0]);
          }
        }
      });
    }
  }, [dAppToolkit, gatewayApi]);

  useEffect(() => {
    if (!selectedNFT) return
    fetchCharacterInfo(selectedNFT.id).then(data => {
      setInfo(data);
    })
  }, [selectedNFT]);

  return (
    <RadixianContext.Provider
      value={{
        info, setInfo,
        dAppToolkit,
        gatewayApi,
        NFTs, setNFTs,
        selectedNFT, setSelectedNFT,
      }}
    >
      {children}
    </RadixianContext.Provider>
  )
};

// Custom hook to use the Radixian context
export const useRadixian = () => {
  const context = useContext(RadixianContext);
  // Throw an error if the hook is used outside of a RadixianProvider
  if (!context) {
    throw new Error("Radixian must be used within a RadixianProvider");
  }
  return context;
};

export default RadixianProvider