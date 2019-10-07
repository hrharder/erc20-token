[ERC-20 Token](README.md) › [Globals](globals.md)

# ERC-20 Token

# ERC20 Token (`erc20-token`)

_Inspired by the since-depreciated [`ERC20TokenWrapper`](https://github.com/0xProject/0x-monorepo/blob/b43c9f075cca28fceef937eae47ea02547707239/packages/contract-wrappers/src/contract_wrappers/erc20_token_wrapper.ts) wrapper from @0xProject._

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
yarn add erc20-token

# with npm
npm i --save erc20-token
```

### Import
See [`src/index.ts`](./src/index.ts) for all available exports.

TypeScript/ES6+ (recommended):
```typescript
import { ERC20Token, BigNumber, MAX_ALLOWANCE } from "erc20-token";
```

CommonJS:
```js
const { ERC20Token, BigNumber, MAX_ALLOWANCE } = require("erc20-token");
```

### Initialize

Instantiate a new `ERC20Token` instance with a supported Ethereum provider. Usage of `web3` is shown below, but any standard provider will work.

```typescript
import { ERC20Token } from "erc20-token";
import Web3 from "web3";

const web3 = new Web3("http://localhost:8545");
const erc20 = new ERC20Token(web3.currentProvider);
```

### Interact

Use `erc20` instances (see above) to perform on-chain transactions, view balances, etc.

Be sure to see [the documentation](./docs/classes/erc20token.md) for all available methods.
