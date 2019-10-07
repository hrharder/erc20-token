[ERC-20 Token](README.md) › [Globals](globals.md)

# ERC-20 Token

## Index

### Classes

* [ERC20Token](classes/erc20token.md)

### Variables

* [ETHEREUM_ADDRESS_REGEX](globals.md#const-ethereum_address_regex)
* [ETHEREUM_ADDRESS_REGEX_CHECKSUMMED](globals.md#const-ethereum_address_regex_checksummed)
* [MAX_ALLOWANCE](globals.md#const-max_allowance)

### Functions

* [normalizeAddress](globals.md#normalizeaddress)

## Variables

### `Const` ETHEREUM_ADDRESS_REGEX

• **ETHEREUM_ADDRESS_REGEX**: *RegExp* =  /^0x[a-f0-9]{40}$/

Defined in utils.ts:12

Matches Ethereum addresses (non-checksummed, all lowercase).

___

### `Const` ETHEREUM_ADDRESS_REGEX_CHECKSUMMED

• **ETHEREUM_ADDRESS_REGEX_CHECKSUMMED**: *RegExp* =  /^0x[a-fA-F0-9]{40}$/

Defined in utils.ts:17

Matches all Ethereum addresses (checksummed, capital, or lowercase).

___

### `Const` MAX_ALLOWANCE

• **MAX_ALLOWANCE**: *BigNumber* =  new BigNumber(2).exponentiatedBy(256).minus(1)

Defined in utils.ts:7

Represents the maximum ERC-20 approval (maximum 256-bit unsigned integer).

## Functions

###  normalizeAddress

▸ **normalizeAddress**(`address`: string): *string*

Defined in utils.ts:24

Validate address (checksummed or not) and return un-checksummed lowercase.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | A 20-byte address as a hex-encoded string.  |

**Returns:** *string*
