import {
  getTimeline,
  infinityNaNguard,
  tickModifier,
  dataExtentFilter,
  formattedTitle,
  formattedCSSClassName,
} from "utils";

describe("getTimeline", () => {
  it("returns correct timeline information for valid data", () => {
    const data = [
      { startTime: new Date("2023-01-01T09:00:00") },
      { startTime: new Date("2023-01-02T13:30:00") },
      { startTime: new Date("2023-01-03T17:45:00") },
    ];

    const result = getTimeline(data);

    expect(result.days).toBe(2);
    expect(result.hours).toBe(8);
    expect(result.minutes).toBe(45);
    expect(result.minutesTotal).toBe(3405);
    expect(result.timeDifference).toBeGreaterThan(0);
  });
});

describe("infinityNaNguard", () => {
  it("returns 0 if data is NaN", () => {
    expect(infinityNaNguard(NaN)).toBe(0);
  });

  it("returns 0 if data is Infinity", () => {
    expect(infinityNaNguard(Infinity)).toBe(0);
  });

  it("returns the same value for non-Infinity and non-Nan input", () => {
    expect(infinityNaNguard(10)).toBe(10);
    expect(infinityNaNguard(-5.5)).toBe(-5.5);
  });
});

describe("tickModifier", () => {
  it("returns 8 when data is greater than or equal to 825", () => {
    expect(tickModifier(825)).toBe(8);
    expect(tickModifier(1000)).toBe(8);
    expect(tickModifier(824)).not.toBe(8);
  });

  it("returns 7 when data is greater than or equal to 690", () => {
    expect(tickModifier(690)).toBe(7);
    expect(tickModifier(800)).toBe(7);
    expect(tickModifier(689)).not.toBe(7);
  });

  it("returns 6 when data is greater than or equal to 510", () => {
    expect(tickModifier(510)).toBe(6);
    expect(tickModifier(600)).toBe(6);
    expect(tickModifier(509)).not.toBe(6);
  });

  it("returns 4 when data is greater than or equal to 400", () => {
    expect(tickModifier(400)).toBe(4);
    expect(tickModifier(450)).toBe(4);
    expect(tickModifier(399)).not.toBe(4);
  });

  it("returns 2 for any other data value", () => {
    expect(tickModifier(300)).toBe(2);
    expect(tickModifier(100)).toBe(2);
  });
});

describe("dataExtentFilter", () => {
  const data = [
    { id: 1, date: new Date("2023-01-01") },
    { id: 2, date: new Date("2023-01-02") },
    { id: 3, date: new Date("2023-01-03") },
  ];

  const xValue = (d) => d.date;

  it("filters data based on dataExtent", () => {
    const dataExtent = [new Date("2023-01-01"), new Date("2023-01-03")];
    const filteredData = dataExtentFilter(dataExtent, data, xValue);

    expect(filteredData).toEqual([{ id: 2, date: new Date("2023-01-02") }]);
  });

  it("returns the original data when dataExtent is not defined", () => {
    const filteredData = dataExtentFilter(undefined, data, xValue);

    expect(filteredData).toEqual(data);
  });
});

describe("formattedTitle", () => {
  it("returns the correctly formatted title without 'professional' word", () => {
    const input = "hello_world_professional";
    const expectedOutput = "Hello World";

    const result = formattedTitle(input);

    expect(result).toBe(expectedOutput);
  });
});

describe("formattedCSSClassName", () => {
  it("returns the correctly formatted CSS class name", () => {
    const input = "Some_Class_Name";
    const expectedOutput = "some-class-name";

    const result = formattedCSSClassName(input);

    expect(result).toBe(expectedOutput);
  });
});
