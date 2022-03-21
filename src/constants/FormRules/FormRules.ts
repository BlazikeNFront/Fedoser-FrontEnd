export class FormRules {
  static required = (v: string) => !!v || "Pusty string";
  static maxLength = (number: number) => (v: string) =>
    v.length < number || "Za dlugi";
}
