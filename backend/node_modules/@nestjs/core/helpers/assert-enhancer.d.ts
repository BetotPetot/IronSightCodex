export type EnhancerKind = 'guard' | 'interceptor' | 'pipe';
/**
 * Throws when the given value can't run as an enhancer of the given kind.
 * Such a value used to be dropped without an error, which left the handlers
 * it was bound to without it (e.g., unguarded).
 *
 * @param description what was bound, for the message (by default, the value)
 */
export declare function assertEnhancer(enhancer: unknown, kind: EnhancerKind, description?: string): void;
/**
 * Warns when the given value can't run as an exception filter. Unlike the
 * other enhancers, such a filter is still skipped rather than rejected: the
 * exceptions it was meant to handle get the default response, so no handler
 * runs without a check it relies on.
 *
 * @param description what was bound, for the message (by default, the value)
 */
export declare function warnOnInvalidFilter(filter: unknown, description?: string): void;
export declare function describeEnhancer(value: unknown): string;
