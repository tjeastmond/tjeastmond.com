export interface ScrableOptions {
  characters: string[];
  changes: number;
  sfps: number;
  speed: number;
}

export type OptionalOptions = Partial<ScrableOptions>;

export const DefaultOptions: ScrableOptions = {
  characters: "!#_-*0+^.".split(""),
  changes: 3,
  sfps: 6,
  speed: 100,
};
