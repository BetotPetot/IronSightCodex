export declare function registerClassRef(classRef: Function): void;
/**
 * Returns the class the given instance was created from. Falls back to the
 * `constructor` property for objects whose class was not registered.
 */
export declare function getClassRef(instance: object): Function;
/**
 * Returns the class on which the parameter decorators of the given method
 * stored their metadata: the `constructor` of the prototype that declared the
 * method. That is `classRef.prototype.constructor` as long as the method is
 * the one that class has, which holds for an ordinary class, for a class that
 * a class decorator wrapped in a `Proxy`, and for a method that a mixin helper
 * copied together with `constructor`. A method that the class declares next
 * to such a mixin has its metadata on the class itself.
 */
export declare function getParamsHost(classRef: Function, methodName: string | symbol): Function;
