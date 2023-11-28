import { RegisterDto } from 'services/interfaces/RegisterDto';
import { LoginDto } from 'services/interfaces/LoginDto';

export enum InputFields {
  Name = 'name',
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
  Group = 'group',
  Variant = 'variant',
  Telephone = 'telephone',
  Gender = 'gender',
}

export enum ValidationDescriptions {
  Name = 'Invalid name',
  Email = 'Invalid email',
  PasswordShort = 'Password is shorter than 8 symbols',
  PasswordEmpty = 'Password is required',
  ConfirmPassword = 'Passwords don\'t match',
  Group = 'Group doesn\'t match the following pattern: \'AA-00\'',
  Variant = 'Variant must consist of two numbers',
  Telephone = 'Invalid telephone number'
}

export const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export default class ValidationError {
  type: string;
  description: string;
  constructor(type: InputFields, description: ValidationDescriptions) {
    this.type = type;
    this.description = description;
  }
  static defaultPasswordLength = 8;
  static validate(data: RegisterDto | LoginDto) {
    const groupRegex = /[A-Z]{2}-[0-9]{2}/;
    const variantRegex = /[0-9]{2}/;
    const validationErrors = [];
    if (!data.email || !data.email.length)
      validationErrors.push(
        new ValidationError(
          InputFields.Email,
          ValidationDescriptions.Email,
        ),
      );
    if (data.password.length < ValidationError.defaultPasswordLength)
      validationErrors.push(
        new ValidationError(
          InputFields.Password,
          ValidationDescriptions.PasswordShort,
        ),
      );
    if (!data.password || !data.password.length)
      validationErrors.push(
        new ValidationError(
          InputFields.Password,
          ValidationDescriptions.PasswordEmpty,
        ),
      );
    if (InputFields.ConfirmPassword in data &&
      InputFields.Group in data &&
      InputFields.Variant in data &&
      InputFields.Telephone in data) {
      if (!data.name || !data.name.length)
        validationErrors.push(
          new ValidationError(
            InputFields.Name,
            ValidationDescriptions.Name,
          ),
        );
      if (data.confirmPassword && data.confirmPassword !== data.password)
        validationErrors.push(new ValidationError(
          InputFields.ConfirmPassword, ValidationDescriptions.ConfirmPassword,
        ));
      if (!data.group || !data.group.match(groupRegex))
        validationErrors.push(
          new ValidationError(
            InputFields.Group,
            ValidationDescriptions.Group,
          ),
        );
      if (!data.variant || !data.variant.match(variantRegex))
        validationErrors.push(
          new ValidationError(
            InputFields.Variant,
            ValidationDescriptions.Variant,
          ),
        );
      if (!data.telephone || !data.telephone.match(phoneRegex))
        validationErrors.push(
          new ValidationError(
            InputFields.Telephone,
            ValidationDescriptions.Telephone,
          ),
        );
    }

    return validationErrors;
  }
}

export class ValidationErrors {
}
