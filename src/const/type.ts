import { ResultAsync, Result } from 'neverthrow';
import { SendTransactionResult as SendTransactionResultAsync } from '@radixdlt/radix-dapp-toolkit';

export type SendTransactionResult = SendTransactionResultAsync extends ResultAsync<infer T, infer E> ? Result<T, E> : never;
