import {
    registerDecorator,
    ValidationOptions,
    isEmail,
    isAlphanumeric,
    ValidationArguments,
  } from "class-validator";
import { httpMessage } from "../messages";
import { BadRequestException } from "@nestjs/common";

export const IsValidUsername = (validationOptions?: ValidationOptions) => {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: "IsValidUsername",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if (isEmail(value)) return true;
                    return isAlphanumeric(value);
                },
                defaultMessage({ value }: ValidationArguments) {
                    if (isEmail(value)) {
                        throw new BadRequestException(httpMessage["0F002"]);
                    }
                    throw new BadRequestException(httpMessage["0F003"]);
                },
            },
        });
    };
};
  