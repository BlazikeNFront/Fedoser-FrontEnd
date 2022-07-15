export class AuthPayloadDto {
  constructor(readonly email: string, readonly password: string) {}
}
export class SignUpDto {
  constructor(
    readonly email: string,
    readonly password: string,
    readonly repeatedPassword: string
  ) {}
}
