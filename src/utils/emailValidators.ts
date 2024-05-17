import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsEmailDomainConstraint implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    // Define the allowed domains
    const allowedDomains = ['.com', '.co.uk', '.ng', '.org', 'co.za'];

    // Extract the domain from the email
    const emailDomain = email.split('@')[1];

    // Check if the email domain is in the list of allowed domains
    return allowedDomains.includes(emailDomain);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email domain is not allowed. Allowed domains are: .com, .co.uk, .ng, .org, co.za';
  }
}

export function IsEmailDomain(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailDomainConstraint,
    });
  };
}
