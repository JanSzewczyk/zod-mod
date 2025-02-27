import { getPath } from "./path";

describe("getPath function", () => {
  test("should return empty array", ({}) => {
    expect(getPath()).toEqual([]);
    expect(getPath("")).toEqual([]);
    expect(getPath([])).toEqual([]);
  });

  test("should return path array", () => {
    expect(getPath("id")).toEqual(["id"]);
    expect(getPath("cat.head.eye")).toEqual(["cat", "head", "eye"]);
    expect(getPath("a.b.c.0")).toEqual(["a", "b", "c", "0"]);
    expect(getPath("a.b.[1].c")).toEqual(["a", "b", "1", "c"]);
    expect(getPath("a.b[1].c")).toEqual(["a", "b", "1", "c"]);
    expect(getPath(["a", "b", "0"])).toEqual(["a", "b", "0"]);
  });

  test("should not change original path value", () => {
    const path = "a.b.c";
    expect(getPath(path)).toEqual(["a", "b", "c"]);
    expect(path).toEqual("a.b.c");
  });
});
