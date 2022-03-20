export class SignUpDTO {
  constructor(
    private email: string,
    private password: string,
    private repeatedPassword: string
  ) {}
}
