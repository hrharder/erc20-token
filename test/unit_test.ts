import { web3Factory, BlockchainLifecycle, tokenUtils, devConstants } from "@0x/dev-utils";
import { BigNumber } from "@0x/utils";
import * as artifacts from "@0x/contract-artifacts";
import assert from "assert";

import { MAX_ALLOWANCE, ETHEREUM_ADDRESS_REGEX, normalizeAddress, ETHEREUM_ADDRESS_REGEX_CHECKSUMMED, ERC20Token } from "../src";
import { Web3ProviderEngine } from "@0x/subproviders";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { ERC20TokenContract, DummyERC20TokenContract } from "@0x/abi-gen-wrappers";

const CHECKSUMMED_ADDRESS = "0x01EaCc3Ae59eE7fBBC191d63E8e1ccfdAc11628C";
const UNCHECKSUMMED_LOWER_ADDRESS = "0x01eacc3ae59ee7fbbc191d63e8e1ccfdac11628c";
const UNCHECKSUMMED_UPPER_ADDRESS = "0x01EACC3AE59EE7FBBC191D63E8E1CCFDAC11628C";

describe("Unit tests for exported classes, functions, and constants.", function (): void {
    describe("Constants unit tests", function (): void {
        describe("#MAX_ALLOWANCE", function (): void {
            it("should be equal to the maximum 256-bit integer (bignumber.js)", function (): void {
                const maximumUint256 = new BigNumber(2).pow(256).minus(1);
                const actual = new BigNumber(MAX_ALLOWANCE);
                assert(actual.isEqualTo(maximumUint256), "expect max allowance to be (2^256)-1");
            });
        });

        describe("#ETHEREUM_ADDRESS_REGEX", function (): void {
            it("should match a non-checksummed (all lowercase) address", function (): void {
                assert(ETHEREUM_ADDRESS_REGEX.test(UNCHECKSUMMED_LOWER_ADDRESS));
            });
            it("should not match a non-checksummed (all uppercase) address", function (): void {
                assert(!ETHEREUM_ADDRESS_REGEX.test(UNCHECKSUMMED_UPPER_ADDRESS));
            });
            it("should not match a checksummed address", function (): void {
                assert(!ETHEREUM_ADDRESS_REGEX.test(CHECKSUMMED_ADDRESS));
            });
        });

        describe("#ETHEREUM_ADDRESS_REGEX_CHECKSUMMED", function (): void {
            it("should match a non-checksummed (all lowercase) address", function (): void {
                assert(ETHEREUM_ADDRESS_REGEX_CHECKSUMMED.test(UNCHECKSUMMED_LOWER_ADDRESS));
            });
            it("should match a non-checksummed (all uppercase) address", function (): void {
                assert(ETHEREUM_ADDRESS_REGEX_CHECKSUMMED.test(UNCHECKSUMMED_UPPER_ADDRESS));
            });
            it("should match a checksummed address", function (): void {
                assert(ETHEREUM_ADDRESS_REGEX_CHECKSUMMED.test(CHECKSUMMED_ADDRESS));
            });
        });
    });

    describe("Function unit tests", function (): void {
        describe("#normalizeAddress", function (): void {
            it("normalized checksummed should match un-checksummed lower", function (): void {
                const normalized = normalizeAddress(CHECKSUMMED_ADDRESS);
                assert.strictEqual(normalized, UNCHECKSUMMED_LOWER_ADDRESS);
            });
            it("normalized un-checksummed (lower) should match un-checksummed lower", function (): void {
                const normalized = normalizeAddress(UNCHECKSUMMED_LOWER_ADDRESS);
                assert.strictEqual(normalized, UNCHECKSUMMED_LOWER_ADDRESS);
            });
            it("normalized un-checksummed (upper) should match un-checksummed lower", function (): void {
                const normalized = normalizeAddress(UNCHECKSUMMED_UPPER_ADDRESS);
                assert.strictEqual(normalized, UNCHECKSUMMED_LOWER_ADDRESS);
            });
            it("should throw for a non-address string", function (): void {
                assert.throws(() => normalizeAddress("nop"));
            });
            it("should throw for a hex string thats too long", function (): void {
                assert.throws(() => normalizeAddress("0x01EaCc3Ae59eE7fBBC191d63E8e1ccfdAc11628C1"));
            });
            it("should throw for a hex string thats too short", function (): void {
                assert.throws(() => normalizeAddress("0xfeed"));
            });
        });
    });

    describe("Class unit tests", function (): void {
        describe("ERC20Token", function (): void {
            let provider: Web3ProviderEngine;
            let blockchain: BlockchainLifecycle;
            let web3Wrapper: Web3Wrapper;

            let dummyTokenA: DummyERC20TokenContract;
            let dummyTokenB: DummyERC20TokenContract;

            let addresses: string[];

            let erc20Token: ERC20Token;

            this.beforeAll(async () => {
                provider = web3Factory.getRpcProvider({ shouldUseInProcessGanache: true });
                provider.start();

                erc20Token = new ERC20Token(provider);
                web3Wrapper = new Web3Wrapper(provider);
                blockchain = new BlockchainLifecycle(web3Wrapper);

                await blockchain.startAsync();

                addresses = await web3Wrapper.getAvailableAddressesAsync();
            });

            this.beforeEach(async () => {

                // setup dummy tokens
                dummyTokenA = await DummyERC20TokenContract.deployFrom0xArtifactAsync(
                    artifacts.DummyERC20Token as any,
                    provider,
                    { from: addresses[2] },
                    artifacts as any,
                    "dummy token A",
                    "TKA",
                    new BigNumber(18),
                    new BigNumber("1e8").times("1e18"),
                );
                dummyTokenB = await DummyERC20TokenContract.deployFrom0xArtifactAsync(
                    artifacts.DummyERC20Token as any,
                    provider,
                    { from: addresses[2] },
                    artifacts as any,
                    "dummy token B",
                    "TKB",
                    new BigNumber(18),
                    new BigNumber("1e8").times("1e18"),
                );
            });

            this.afterAll(() => {
                provider.stop();
            });

            describe("#getBalanceAsync", function (): void {
                it("should correctly show a zero balance before any mint", async () => {
                    const userAddress = addresses[0];
                    const tokenAddress = dummyTokenA.address;

                    const expected = new BigNumber(0);
                    const fromLibrary = await erc20Token.getBalanceAsync(tokenAddress, addresses[0]);
                    const fromContract = await dummyTokenA.balanceOf.callAsync(userAddress);

                    assert(expected.isEqualTo(fromLibrary), "balance from library should be zero");
                    assert(expected.isEqualTo(fromContract), "balance from contract wrapper should be zero");
                });
                it("should get a balance that matches direct read from contract", async () => {
                    const userAddress = addresses[0];
                    const tokenAddress = dummyTokenA.address;
                    const mintValue = Web3Wrapper.toWei(new BigNumber(12));

                    // mint tokens
                    await dummyTokenA.mint.awaitTransactionSuccessAsync(mintValue, { from: userAddress });

                    const supplyAfterMint = await dummyTokenA.totalSupply.callAsync();
                    const balanceFromToken = await dummyTokenA.balanceOf.callAsync(userAddress);
                    const balanceFromClass = await erc20Token.getBalanceAsync(tokenAddress, userAddress);

                    assert(supplyAfterMint.isEqualTo(mintValue), "total supply should match mint value");
                    assert(mintValue.isEqualTo(balanceFromToken), "balance from wrapper should match mint value");
                    assert(balanceFromToken.isEqualTo(balanceFromClass), "balance from wrapper should match balance from helper");
                });
                it("should get a balance from a non-0 indexed address", async () => {
                    const userAddress = addresses[3];
                    const tokenAddress = dummyTokenA.address;
                    const mintValue = Web3Wrapper.toWei(new BigNumber(14));

                    // mint tokens
                    await dummyTokenA.mint.awaitTransactionSuccessAsync(mintValue, { from: userAddress });

                    const balanceFromToken = await dummyTokenA.balanceOf.callAsync(userAddress);
                    const balanceFromClass = await erc20Token.getBalanceAsync(tokenAddress, userAddress);

                    assert(mintValue.isEqualTo(balanceFromToken), "balance from wrapper should match mint value");
                    assert(balanceFromToken.isEqualTo(balanceFromClass), "balance from wrapper should match balance from helper");
                });
                it("should throw if supplied only an invalid user address", async () => {
                    await assert.rejects(erc20Token.getBalanceAsync(dummyTokenA.address, "0xfoo"));
                });
                it("should throw if supplied only an invalid token address", async () => {
                    await assert.rejects(erc20Token.getBalanceAsync("0xfoo", dummyTokenA.address));
                });
            });
        });
    });
});
