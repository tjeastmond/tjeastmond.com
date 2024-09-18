import ScrambleText from "./scrambler";

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

  test("should initialize with default options", () => {
    expect(scrambleText).toBeDefined();
    expect(scrambleText["config"]).toEqual({
      characters: "!#_-*0+^.".split(""),
      changes: 3,
      sfps: 6,
      speed: 100,
    });
  });

  test("should throw error if element is not found", () => {
    expect(() => new ScrambleText(null)).toThrow("Element not found");
  });

  test("should scramble text on start", (done) => {
    scrambleText.start();

    setTimeout(() => {
      expect(scrambleText["scrambledIndexes"].size).toBeGreaterThan(0);
      expect(scrambleText["element"]!.textContent).not.toEqual("Hello World");
      done();
    }, 500); // Wait for some time to see if scrambling happens
  });

  test("should restore text on restoreNow", (done) => {
    scrambleText.start();

    setTimeout(() => {
      scrambleText.restoreNow();
      expect(scrambleText["element"]!.textContent).toEqual("Hello World");
      done();
    }, 500);
  });

  test("should call done when all characters are restored", (done) => {
    scrambleText.start();

    setTimeout(() => {
      scrambleText.restoreNow();
      expect(scrambleText["isScrambling"]).toBe(false);
      done();
    }, 500);
  });
});
