[ERC-20 Token](README.md) › [Globals](globals.md)

# ERC-20 Token

# ERC20 Token (`erc20-token`)

_Inspired by the since-depreciated [`ERC20TokenWrapper`](https://github.com/0xProject/0x-monorepo/blob/b43c9f075cca28fceef937eae47ea02547707239/packages/contract-wrappers/src/contract_wrappers/erc20_token_wrapper.ts) from @0xProject._

Exports `ERC20Token`, a helper class for working with multiple ERC-20 tokens without having to instantiate a new wrapper for each token.

Instances of `ERC20Token` include helper methods for interacting with the 0x ERC-20 AssetProxy contract to get and set ERC-20 proxy allowances for trading in the 0x ecosystem.

Source maps and type declaration are files included in published builds.

View the [documentation here.](./docs)

## Usage

Use the `ERC20Token` class to perform any action on an underlying ERC-20 contract via simple JavaScript (TypeScript) abstractions.

### Install

Add to your project:

```bash
# with yarn
yarn add @habsyr/erc20-token

# with npm
npm i --save @habsyr/erc20-token
```

### Import
See [`src/index.ts`](./src/index.ts) for all available exports.

TypeScript/ES6+ (recommended):
```typescript
import { ERC20Token, BigNumber, MAX_ALLOWANCE } from "@habsyr/erc20-token";
```

CommonJS:
```js
const { ERC20Token, BigNumber, MAX_ALLOWANCE } = require("@habsyr/erc20-token");
```

### Initialize

Instantiate a new `ERC20Token` instance with a supported Ethereum provider. Usage of `web3` is shown below, but any standard provider will work.

```typescript
import { ERC20Token } from "@habsyr/erc20-token";
import Web3 from "web3";

const web3 = new Web3("http://localhost:8545");
const erc20 = new ERC20Token(web3.currentProvider);
```

### Interact

Use `erc20` instances (see above) to perform on-chain transactions, view balances, etc.

All methods accept the ERC-20 token's address as the first parameter. Under the hood, it maintains a cache of `address => wrapper contract` so the first time you call a method for a given token, it will be _slightly_ slower than subsequent calls.

Be sure to see [the documentation](./docs/classes/erc20token.md) for all available methods.

```typescript
// Made up user addresses
const MY_ADDRESS = "0x0a66b68a0d22d4d5c22012ec3b9855a7d7194019";
const YOUR_ADDRESS = "0x39755356759ce0d7f32dc8dc45414bca409ae24e";

// Mainnet DAI stablecoin (v1) address
const DAI_ADDRESS = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359";

// Get a balance
const balance = await erc20.getBalanceAsync(DAI_ADDRESS, MY_ADDRESS);

// Check a spender allowance
const allowance = await erc20.getAllowanceAsync(DAI_ADDRESS, MY_ADDRESS, YOUR_ADDRESS);

// Set an unlimited ERC-20 proxy allowance (for 0x trading)
const txId = await erc20.setUnlimitedProxyAllowanceAsync(DAI_ADDRESS);

// Transfer some tokens (after converting to token base units - 18 decimals for DAI)
const amount = new BigNumber(10).times("1e18");
const txId = await erc20.transferAsync(
    DAI_ADDRESS,
    YOUR_ADDRESS,
    amount,
    {
        from: MY_ADDRESS,
    },
);
```

View the [`docs/`](./docs) folder for more documentation.

## Develop

Instructions for working with `hrharder/erc20-token` (contributions welcome).

### Build

Compile the TypeScript source, and generate artifacts (source maps, declaration files):

```
yarn build
```

### Documentation

Re-generate documentation:

```
yarn docs
```

### Test

Start a 0x ganache snapshot RPC server and run tests (requires `docker`):
```
yarn test
```

Run tests with a custom RPC (CI, etc.):
```
WEB3_URL=http://localhost:8545 yarn test:ci
```

## License

Originally written by [Henry Harder](https://git.io/hrharder) (c) 2019.

Licensed under an MIT license.

## Contributing

All contributions welcome, subject to review and sanity checks (is this helpful, etc.)

Feel free to open an issue or PR as needed.
