export declare class DeterministicUuidRegistry {
    private static readonly registry;
    /**
     * The next suffix to try for a given string. The ids of the smaller ones
     * are all taken, and stay taken until `clear()`, so they need not be
     * probed again on every call.
     */
    private static readonly nextIncrements;
    static get(str: string, inc?: number): string;
    static clear(): void;
    private static hashCode;
}
