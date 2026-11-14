/**
 * Returns the items of `array` in order, without its gaps (`[, 'a', , 'b']`
 * gives `['a', 'b']`), as a new array, or `array` itself when it has none.
 * The work depends on the number of items rather than on the length, which
 * a sparse array (e.g. one built from a multipart field named `tags[1000]`)
 * may set far beyond it.
 */
export declare function withoutArrayGaps<T>(array: T[]): T[];
/**
 * Closes the gaps of the sparse arrays in `value`, in place, keeping the
 * order of the items, as `qs` does for a urlencoded body. A copy of a sparse
 * array made by `forEach()` or `map()` (as class-transformer makes) skips
 * the gaps, so the copy would not be the array it was made from. Arrays
 * that cannot be changed (frozen or sealed) are left as they are.
 *
 * Like `stripProtoKeys()`, the traversal keeps its own stack and visits
 * each object once.
 */
export declare function closeArrayGaps(value: unknown): void;
