import {AsFieldElements, method, SmartContract, state} from "snarkyjs";

export function declareState<T extends typeof SmartContract>(
    SmartContract: T,
    states: Record<string, AsFieldElements<unknown>>
) {
    for (let key in states) {
        let CircuitValue = states[key];
        state(CircuitValue)(SmartContract.prototype, key);
    }
}

export function declareMethodArguments<T extends typeof SmartContract>(
    SmartContract: T,
    methodArguments: Record<string, AsFieldElements<unknown>[]>
) {
    for (let key in methodArguments) {
        let argumentTypes = methodArguments[key];
        Reflect.metadata('design:paramtypes', argumentTypes)(
            SmartContract.prototype,
            key
        );
        method(SmartContract.prototype, key as any);
    }
}
