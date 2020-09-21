import {ObjectSchema, ValidateOptions} from "yup";
import {Hook, HookContext} from '@feathersjs/feathers';
import {BadRequest} from '@feathersjs/errors';

interface IFormattedErrors {
    [key: string]: string[];
}

/**
 *
 * @param yupSchemaObject the yup schema object
 * @param yupOptions  for things like for example: abortEarly: false
 * @param translations a custom optional method you can use which gives you the object before it enters the "new BadRequest", which is ultimately sent out to the clients. for translations etc...
 */
const yupValidationHook = (yupSchemaObject: ObjectSchema, yupOptions: ValidateOptions = {}, translations = (formattedErrors: IFormattedErrors) => formattedErrors): Hook => {
    return async (context: HookContext) => {
        const {data} = context;
        try {
            await yupSchemaObject.validate(data, yupOptions);
            // Best practice: hooks should always return the context
        } catch (errors) {
            const formattedErrors: IFormattedErrors = {};
            for (const inner of errors.inner) {
                formattedErrors[inner.path] = inner.errors.join(",");
            }
            throw new BadRequest("Invalid Form", {
                errors: translations(formattedErrors),
            });
        }
        return context;
    };
}

export default yupValidationHook;
