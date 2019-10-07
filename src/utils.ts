import { BigNumber } from "@0x/utils";
import assert from "assert";

/**
 * Represents the maximum ERC-20 approval (maximum 256-bit unsigned integer).
 */
export const MAX_ALLOWANCE = new BigNumber(2).exponentiatedBy(256).minus(1);

/**
 * Matches Ethereum addresses (non-checksummed, all lowercase).
 */
export const ETHEREUM_ADDRESS_REGEX = /^0x[a-f0-9]{40}$/;

/**
 * Matches all Ethereum addresses (checksummed, capital, or lowercase).
 */
export const ETHEREUM_ADDRESS_REGEX_CHECKSUMMED = /^0x[a-fA-F0-9]{40}$/;

/**
 * Validate address (checksummed or not) and return un-checksummed lowercase.
 *
 * @param address A 20-byte address as a hex-encoded string.
 */
export function normalizeAddress(address: string): string {
    assert(ETHEREUM_ADDRESS_REGEX.test(address), "ERC20Token: invalid Ethereum address");
    return address.toString();
}