type Listener = () => void;
/**
 * Calls `listener` once, when `response` has finished, failed or closed, or
 * when the connection of its request has closed.
 *
 * `finished()` alone may never report the latter for the response of a
 * pipelined request (e.g. on Node.js 22): until the responses queued before it
 * are out, it has no socket, and it gets no "close" when the connection goes.
 */
export declare function onResponseClose(response: NodeJS.WritableStream & {
    req?: {
        socket?: unknown;
    };
}, listener: Listener): void;
export {};
