import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ScrambleText from "./scrambler";

function getState(st: ScrambleText) {
  return st as unknown as { scrambledIndexes: Set<number> };
}

describe("ScrambleText", () => {
  let element: HTMLElement;
  let scrambleText: ScrambleText;

  beforeEach(() => {
    element = document.createElement("div");
    element.textContent = "Hello World";
    document.body.appendChild(element);
    scrambleText = new ScrambleText(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it("should initialize with default options", () => {
    expect(scrambleText).toBeDefined();
    const cfg = (scrambleText as unknown as { config: unknown }).config;
    expect(cfg).toEqual({
      characters: "!#_-*0+^.".split(""),
      changes: 3,
      sfps: 6,
      speed: 100,
    });
  });

  it("should throw error if element is not found", () => {
    expect(() => new ScrambleText(null)).toThrow("Element not found");
  });

  it("should scramble text on start", async () => {
    scrambleText.start();

    await vi.waitFor(
      () => {
        expect(getState(scrambleText).scrambledIndexes.size).toBeGreaterThan(0);
        expect(element.textContent).not.toEqual("Hello World");
      },
      { timeout: 2000, interval: 20 },
    );
  });

  it("should restore text on restoreNow", async () => {
    scrambleText.start();

    await vi.waitFor(
      () => {
        expect(getState(scrambleText).scrambledIndexes.size).toBeGreaterThan(0);
      },
      { timeout: 2000, interval: 20 },
    );

    scrambleText.restoreNow();
    expect(element.textContent).toEqual("Hello World");
  });

  it("should call done when all characters are restored", async () => {
    scrambleText.start();

    await vi.waitFor(
      () => {
        expect(getState(scrambleText).scrambledIndexes.size).toBeGreaterThan(0);
      },
      { timeout: 2000, interval: 20 },
    );

    scrambleText.restoreNow();
    const isScrambling = (scrambleText as unknown as { isScrambling: boolean }).isScrambling;
    expect(isScrambling).toBe(false);
  });
});
