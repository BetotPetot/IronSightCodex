/**
 * The default of the `maxErrorMessagesLength` option of the validation pipes.
 */
export declare const DEFAULT_MAX_ERROR_MESSAGES_LENGTH = 1000000;
/**
 * The `maxErrorMessagesLength` to apply. One that is missing, or that is not
 * a number (e.g. NaN from "Number(process.env.UNSET)"), gets the default:
 * none of the checks on the limit trips for NaN, so keeping it would turn
 * the limit off. 0 and Infinity are kept.
 */
export declare function resolveMaxErrorMessagesLength(value: number | undefined): number;
/**
 * The last message of an error response that `maxErrorMessagesLength` cut
 * short.
 */
export declare const OMITTED_ERRORS_MESSAGE = "Further validation errors were omitted";
