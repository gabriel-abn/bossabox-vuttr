import { Tool } from "../tool";

describe("Tool", () => {
  it("should throw if tags is empty", () => {
    expect(() =>
      Tool.create({
        title: "any_title",
        link: "any_link.com",
        description: "any_description",
        tags: [],
      }),
    ).toThrow("NO_TAGS");
  });
});
