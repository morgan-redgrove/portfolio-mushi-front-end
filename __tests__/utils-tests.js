const { addMonthsToGraph } = require("../utils/utils");

//takes an empty months array, returns
//takes a single item months in the array, returns [{value: 1, label: month}]
//takes more than one month, returns multiple objects
// return an object with all 12 months
// only add months

describe("addMonthsToGraph", () => {
  test("takes an empty array, returns non updated graph data", () => {
    const outputObject = [
      { value: 0, label: "Jan" },
      { value: 0, label: "Feb" },
      { value: 0, label: "Mar" },
      { value: 0, label: "Apr" },
      { value: 0, label: "May" },
      { value: 0, label: "Jun" },
      { value: 0, label: "Jul" },
      { value: 0, label: "Aug" },
      { value: 0, label: "Sep" },
      { value: 0, label: "Oct" },
      { value: 0, label: "Nov" },
      { value: 0, label: "Dec" },
    ];
    expect(addMonthsToGraph([])).toEqual(outputObject);
  });

  test("returns an object with value key with property of 1 for the months present in the string", () => {
    const months = ["Jan"];

    const outputObject = [{ value: 1, label: "Jan" }];
    expect(addMonthsToGraph(months)).toEqual(outputObject);
  });
  test("takes more than one month, returns an array of multiple objects", () => {
    const months = ["Jan", "May", "Oct"];

    const outputObject = [
      { value: 1, label: "Jan" },
      { value: 1, label: "May" },
      { value: 1, label: "Oct" },
    ];
    expect(addMonthsToGraph(months)).toEqual(outputObject);
  });
  test("takes more than one month, returns an array of multiple objects", () => {
    const months = ["Jan", "May", "Oct"];

    const outputObject = [
      { value: 1, label: "Jan" },
      { value: 0, label: "Feb" },
      { value: 0, label: "Mar" },
      { value: 0, label: "Apr" },
      { value: 1, label: "May" },
      { value: 0, label: "Jun" },
      { value: 0, label: "Jul" },
      { value: 0, label: "Aug" },
      { value: 0, label: "Sep" },
      { value: 1, label: "Oct" },
      { value: 0, label: "Nov" },
      { value: 0, label: "Dec" },
    ];
    expect(addMonthsToGraph(months)).toEqual(outputObject);
  });
});
