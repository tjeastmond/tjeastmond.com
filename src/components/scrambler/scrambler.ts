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

export default class ScrambleText {
  private ready: boolean = false;
  private isScrambling: boolean = false;
  private originalText: string;
  private validIndexes: number[] = [];
  private config: ScrableOptions;
  private scrambledIndexes = new Set<number>();
  private scrambleCounts = {} as { [key: number]: number };

  constructor(
    private element: HTMLElement | null,
    options?: OptionalOptions,
  ) {
    if (!this.element || !this.element.textContent) {
      throw new Error("Element not found");
    }
    this.config = { ...DefaultOptions, ...options };
    this.originalText = this.element.textContent;
    this.initializeValidIndexes();
    this.ready = this.validIndexes.length > 0;
  }

  private initializeValidIndexes(): void {
    for (let idx = 0; idx < this.originalText.length; idx++) {
      if (this.originalText[idx] !== " ") {
        this.validIndexes.push(idx);
      }
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  private getRandomChar(): string {
    return this.config.characters[
      Math.floor(Math.random() * this.config.characters.length)
    ];
  }

  private setTextContent(index: number, char: string): void {
    const text = this.element!.textContent!;
    this.element!.textContent =
      text.substring(0, index) + char + text.substring(index + 1);
  }

  private animateScrambling(): void {
    let frameCount = 0;

    const animateFrame = () => {
      if (!this.isScrambling) return;

      frameCount++;
      if (frameCount % this.config.sfps === 0) {
        for (const idx of this.scrambledIndexes) {
          if (this.scrambleCounts[idx] === 0) {
            this.restoreCharacter(idx);
            continue;
          }

          this.setTextContent(idx, this.getRandomChar());
          this.scrambleCounts[idx]--;
        }
      }

      requestAnimationFrame(animateFrame);
    };

    requestAnimationFrame(animateFrame);
  }

  restoreCharacter(idx: number): void {
    delete this.scrambleCounts[idx];
    this.scrambledIndexes.delete(idx);
    this.setTextContent(idx, this.originalText[idx]);
    if (this.scrambledIndexes.size === 0) this.done();
  }

  restoreNow(): void {
    if (!this.isScrambling) return;
    this.isScrambling = false;
    this.scrambleCounts = {};
    this.scrambledIndexes.clear();
    this.element!.textContent = this.originalText;
    this.done();
  }

  start(): void {
    if (!this.ready || this.isScrambling) return;
    this.isScrambling = true;

    this.shuffleArray(this.validIndexes).forEach((idx, i) => {
      setTimeout(() => {
        this.scrambledIndexes.add(idx);
        this.scrambleCounts[idx] = this.config.changes;
      }, this.config.speed * i);
    });

    this.animateScrambling();
  }

  done(): void {
    this.isScrambling = false;
  }
}

export { ScrambleText };
