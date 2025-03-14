//

import { ValidationException } from "../exceptions/validation.exception";

/**
 * Decorator to validate if the property is a string.
 */
export function IsString() {
    return function (target: any, propertyName: string) {
        let value: any;
        console.log(target);
        console.log(target);
        console.log(target);

        const getter = () => value;
        const setter = (newVal: any) => {
            if (typeof newVal !== 'string') {
                throw new ValidationException(`${propertyName} must be a string!`);
            }
            value = newVal;
        };

        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}
