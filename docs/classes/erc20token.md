[ERC-20 Token](../README.md) › [Globals](../globals.md) › [ERC20Token](erc20token.md)

# Class: ERC20Token

Convenience class for interacting with multiple ERC-20 tokens through a single
class, without needing to instantiate new contract instances for each token
address used.

Instances of the `ERC20Token` class provide methods for checking balances,
allowances, and proxy allowances for the 0x ERC-20 asset proxy contract. It
also provides methods for setting arbitrary or unlimited ERC-20 proxy allowances
without needing to manually specify the asset proxy address.

## Hierarchy

* **ERC20Token**

## Index

### Constructors

* [constructor](erc20token.md#constructor)

### Properties

* [UNLIMITED_ALLOWANCE](erc20token.md#static-unlimited_allowance)

### Methods

* [getAllowanceAsync](erc20token.md#getallowanceasync)
* [getBalanceAsync](erc20token.md#getbalanceasync)
* [getNetworkIdAsync](erc20token.md#getnetworkidasync)
* [getProxyAddressAsync](erc20token.md#getproxyaddressasync)
* [getProxyAllowanceAsync](erc20token.md#getproxyallowanceasync)
* [setAllowanceAsync](erc20token.md#setallowanceasync)
* [setProxyAllowanceAsync](erc20token.md#setproxyallowanceasync)
* [setUnlimitedProxyAllowanceAsync](erc20token.md#setunlimitedproxyallowanceasync)
* [transferAsync](erc20token.md#transferasync)
* [transferFromAsync](erc20token.md#transferfromasync)

## Constructors

###  constructor

\+ **new ERC20Token**(`provider`: SupportedProvider, `callAndTxDefaults?`: Partial‹CallData›): *[ERC20Token](erc20token.md)*

Defined in erc20_token.ts:30

Create a new `ERC20Token` instance with a Web3 provider to access convenience
methods for interacting with arbitrary ERC-20 tokens and the 0x ERC-20 asset
proxy contract.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`provider` | SupportedProvider | A supported Web3 JSONRPC provider  |
`callAndTxDefaults?` | Partial‹CallData› | - |

**Returns:** *[ERC20Token](erc20token.md)*

## Properties

### `Static` UNLIMITED_ALLOWANCE

▪ **UNLIMITED_ALLOWANCE**: *BigNumber* =  new BigNumber(MAX_ALLOWANCE)

Defined in erc20_token.ts:21

## Methods

###  getAllowanceAsync

▸ **getAllowanceAsync**(`tokenAddress`: string, `userAddress`: string, `spenderAddress`: string): *Promise‹BigNumber›*

Defined in erc20_token.ts:69

Fetch user's ERC-20 allowance for a specific spender in base units (wei).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tokenAddress` | string | The ERC-20 token contract address. |
`userAddress` | string | User's address to fetch allowance for. |
`spenderAddress` | string | The spender address to fetch allowance for. |

**Returns:** *Promise‹BigNumber›*

A promise that resolves to the spender's allowance for the user's tokens in base units (wei).

___

###  getBalanceAsync

▸ **getBalanceAsync**(`tokenAddress`: string, `userAddress`: string): *Promise‹BigNumber›*

Defined in erc20_token.ts:55

Fetch user's ERC-20 token balance in base units (wei).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tokenAddress` | string | The ERC-20 token contract address. |
`userAddress` | string | User's address to fetch balance for. |

**Returns:** *Promise‹BigNumber›*

A promise that resolves to the users balance of the provided token in base units (wei).

___

###  getNetworkIdAsync

▸ **getNetworkIdAsync**(): *Promise‹number›*

Defined in erc20_token.ts:206

Fetch the current detected networkId.

**Returns:** *Promise‹number›*

___

###  getProxyAddressAsync

▸ **getProxyAddressAsync**(): *Promise‹string›*

Defined in erc20_token.ts:214

Fetch the 0x ERC-20 asset proxy address for the current network.

**Returns:** *Promise‹string›*

___

###  getProxyAllowanceAsync

▸ **getProxyAllowanceAsync**(`tokenAddress`: string, `userAddress`: string): *Promise‹BigNumber›*

Defined in erc20_token.ts:83

Fetch user's 0x ERC-20 proxy allowance for a given token in base units (wei).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tokenAddress` | string | The ERC-20 token contract address. |
`userAddress` | string | User's address to fetch 0x ERC-20 proxy allowance for. |

**Returns:** *Promise‹BigNumber›*

A promise that resolves to the users 0x ERC20 proxy allowance for the given token in base units (wei).

___

###  setAllowanceAsync

▸ **setAllowanceAsync**(`tokenAddress`: string, `spenderAddress`: string, `allowance`: BigNumber, `txOptions`: Partial‹TxData›): *Promise‹string›*

Defined in erc20_token.ts:97

Set user's 0x ERC-20 allowance for a given address in base units (wei).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`tokenAddress` | string | - | The ERC-20 token contract address. |
`spenderAddress` | string | - | The address of the desired spender to set allowance for. |
`allowance` | BigNumber | - | The desired allowance (in wei) to set for the ERC-20 proxy. |
`txOptions` | Partial‹TxData› |  {} | Optional transaction options (gas price, etc). |

**Returns:** *Promise‹string›*

A promise that resolves to the resulting transaction hash (TX ID).

___

###  setProxyAllowanceAsync

▸ **setProxyAllowanceAsync**(`tokenAddress`: string, `allowance`: BigNumber, `txOptions`: Partial‹TxData›): *Promise‹string›*

Defined in erc20_token.ts:116

Set user's 0x ERC-20 proxy allowance for a given token in base units (wei).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`tokenAddress` | string | - | The ERC-20 token contract address. |
`allowance` | BigNumber | - | The desired allowance (in wei) to set for the ERC-20 proxy. |
`txOptions` | Partial‹TxData› |  {} | Optional transaction options (gas price, etc). |

**Returns:** *Promise‹string›*

A promise that resolves to the resulting transaction hash (TX ID).

___

###  setUnlimitedProxyAllowanceAsync

▸ **setUnlimitedProxyAllowanceAsync**(`tokenAddress`: string, `txOptions`: Partial‹TxData›): *Promise‹string›*

Defined in erc20_token.ts:138

Set an unlimited allowance for the 0x ERC-20 proxy allowance for a given
token and user address.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`tokenAddress` | string | - | The ERC-20 token contract address. |
`txOptions` | Partial‹TxData› |  {} | Optional transaction options (gas price, etc). |

**Returns:** *Promise‹string›*

A promise that resolves to the resulting transaction hash (TX ID).

___

###  transferAsync

▸ **transferAsync**(`tokenAddress`: string, `toAddress`: string, `amount`: BigNumber, `txOptions`: Partial‹TxData›): *Promise‹string›*

Defined in erc20_token.ts:188

Call the `transfer` method on an ERC20 token contract to transfer some
amount of tokens.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`tokenAddress` | string | - | The ERC-20 token contract address. |
`toAddress` | string | - | The address to transfer assets to (receiver). |
`amount` | BigNumber | - | The amount to transfer in base units (wei). |
`txOptions` | Partial‹TxData› |  {} | Optional transaction options (gas price, etc). |

**Returns:** *Promise‹string›*

A promise that resolves to the resulting transaction hash (TX ID).

___

###  transferFromAsync

▸ **transferFromAsync**(`tokenAddress`: string, `toAddress`: string, `fromAddress`: string, `amount`: BigNumber, `txOptions`: Partial‹TxData›): *Promise‹string›*

Defined in erc20_token.ts:160

Call the `transferFrom` method on an ERC20 token contract (allowance must
be set for the spender).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`tokenAddress` | string | - | The ERC-20 token contract address. |
`toAddress` | string | - | The address to transfer assets to (receiver). |
`fromAddress` | string | - | The spender address (must be approved). |
`amount` | BigNumber | - | The amount to transfer in base units (wei). |
`txOptions` | Partial‹TxData› |  {} | Optional transaction options (gas price, etc). |

**Returns:** *Promise‹string›*

A promise that resolves to the resulting transaction hash (TX ID).
