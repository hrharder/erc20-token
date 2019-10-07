import { BigNumber } from "@0x/utils";
import assert from "assert";
import { MAX_ALLOWANCE, ETHEREUM_ADDRESS_REGEX, normalizeAddress, ETHEREUM_ADDRESS_REGEX_CHECKSUMMED } from "../src";

const CHECKSUMMED_ADDRESS = "0x01EaCc3Ae59eE7fBBC191d63E8e1ccfdAc11628C";
const UNCHECKSUMMED_LOWER_ADDRESS = "0x01eacc3ae59ee7fbbc191d63e8e1ccfdac11628c";
const UNCHECKSUMMED_UPPER_ADDRESS = "0x01EACC3AE59EE7FBBC191D63E8E1CCFDAC11628C";

describe("Helper functions and constants unit tests", function (): void {
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
