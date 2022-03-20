export interface NavOption {
  icon: string;
  name: string;
  text: string;
  childrens?: string[];
}
export type NavOptions = [
  NavOption,
  NavOption,
  NavOption,
  NavOption,
  NavOption
];
