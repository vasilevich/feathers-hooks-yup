import { ObjectSchema, ValidateOptions } from "yup";
import { Hook } from '@feathersjs/feathers';
interface IFormattedErrors {
    [key: string]: string[];
}
/**
 *
 * @param yupSchemaObject the yup schema object
 * @param yupOptions  for things like for example: abortEarly: false
 * @param translations a custom optional method you can use which gives you the object before it enters the "new BadRequest", which is ultimately sent out to the clients. for translations etc...
 */
declare const yupValidationHook: (yupSchemaObject: ObjectSchema, yupOptions?: ValidateOptions, translations?: (formattedErrors: IFormattedErrors) => IFormattedErrors) => Hook;
export default yupValidationHook;
