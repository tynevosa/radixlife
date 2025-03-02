import { GatewayApiClient } from '@radixdlt/babylon-gateway-api-sdk';
import {
  RadixDappToolkit,
  RadixNetwork,
  Logger,
  DataRequestBuilder,
  generateRolaChallenge,
} from '@radixdlt/radix-dapp-toolkit'

function showRadixButton(show: boolean) {
  if (show) {
    document.getElementById('radix-connect-button')?.classList.remove('hidden');
  } else {
    document.getElementById('radix-connect-button')?.classList.add('hidden');
  }
}

const logger = Logger()
const dAppDefinitionAddress = import.meta.env.VITE_DAPP_DEFINITION_ADDRESS
const networkId = RadixNetwork.Stokenet

const dAppToolkit = RadixDappToolkit({
  dAppDefinitionAddress,
  networkId,
  logger,
})

dAppToolkit.walletApi.provideChallengeGenerator(async () =>
  generateRolaChallenge(),
)

dAppToolkit.walletApi.setRequestData(
  DataRequestBuilder.persona().withProof(),
  DataRequestBuilder.accounts().atLeast(1),
)

const gatewayApi = GatewayApiClient.initialize(
  dAppToolkit.gatewayApi.clientConfig,
)

export { dAppToolkit, gatewayApi, showRadixButton };