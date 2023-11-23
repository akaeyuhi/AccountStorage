export enum ValidationErrors {
  Username = 'username',
  Password = 'password',
}

export enum ValidationDescriptions {
  Username = 'Invalid username',
  PasswordShort = 'Password is shorter than 8 symbols',
  PasswordEmpty = 'Password is required',
}

export default class ValidationError {
  type: string;
  description: string;
  constructor(type: ValidationErrors, description: ValidationDescriptions) {
    this.type = type;
    this.description = description;
  }
  static defaultPasswordLength = 8;
  static validate(data: { username: string; password: string }) {
    const validationErrors = [];
    if (!data.username || !data.username.length)
      validationErrors.push(
        new ValidationError(
          ValidationErrors.Username,
          ValidationDescriptions.Username,
        ),
      );
    if (data.password.length < ValidationError.defaultPasswordLength)
      validationErrors.push(
        new ValidationError(
          ValidationErrors.Password,
          ValidationDescriptions.PasswordShort,
        ),
      );
    if (!data.password || !data.password.length)
      validationErrors.push(
        new ValidationError(
          ValidationErrors.Password,
          ValidationDescriptions.PasswordEmpty,
        ),
      );
    return validationErrors;
  }
}
