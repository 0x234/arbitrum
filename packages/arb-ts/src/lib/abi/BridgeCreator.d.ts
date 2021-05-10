/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from 'ethers'
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface BridgeCreatorInterface extends ethers.utils.Interface {
  functions: {
    'createBridge(address,address,uint256,uint256)': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'createBridge',
    values: [string, string, BigNumberish, BigNumberish]
  ): string

  decodeFunctionResult(
    functionFragment: 'createBridge',
    data: BytesLike
  ): Result

  events: {}
}

export class BridgeCreator extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: BridgeCreatorInterface

  functions: {
    createBridge(
      rollup: string,
      sequencer: string,
      sequencerDelayBlocks: BigNumberish,
      sequencerDelaySeconds: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'createBridge(address,address,uint256,uint256)'(
      rollup: string,
      sequencer: string,
      sequencerDelayBlocks: BigNumberish,
      sequencerDelaySeconds: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>
  }

  createBridge(
    rollup: string,
    sequencer: string,
    sequencerDelayBlocks: BigNumberish,
    sequencerDelaySeconds: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'createBridge(address,address,uint256,uint256)'(
    rollup: string,
    sequencer: string,
    sequencerDelayBlocks: BigNumberish,
    sequencerDelaySeconds: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  callStatic: {
    createBridge(
      rollup: string,
      sequencer: string,
      sequencerDelayBlocks: BigNumberish,
      sequencerDelaySeconds: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, string, string, string, string]>

    'createBridge(address,address,uint256,uint256)'(
      rollup: string,
      sequencer: string,
      sequencerDelayBlocks: BigNumberish,
      sequencerDelaySeconds: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, string, string, string, string]>
  }

  filters: {}

  estimateGas: {
    createBridge(
      rollup: string,
      sequencer: string,
      sequencerDelayBlocks: BigNumberish,
      sequencerDelaySeconds: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>

    'createBridge(address,address,uint256,uint256)'(
      rollup: string,
      sequencer: string,
      sequencerDelayBlocks: BigNumberish,
      sequencerDelaySeconds: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>
  }

  populateTransaction: {
    createBridge(
      rollup: string,
      sequencer: string,
      sequencerDelayBlocks: BigNumberish,
      sequencerDelaySeconds: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'createBridge(address,address,uint256,uint256)'(
      rollup: string,
      sequencer: string,
      sequencerDelayBlocks: BigNumberish,
      sequencerDelaySeconds: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>
  }
}