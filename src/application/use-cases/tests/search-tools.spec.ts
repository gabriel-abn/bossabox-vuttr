import { SearchToolsUseCase } from "../search-tools-use-case";
import { mockTool } from "./mocks/mock-tool";
import { ToolRepositoryInMemory } from "./mocks/tool-repository-in-memory";

const makeSut = () => {
  const repository = new ToolRepositoryInMemory();
  const sut = new SearchToolsUseCase(repository);

  return { sut, repository };
};

describe("Use Case: Search Tool", () => {
  it("should throw if neither tag nor title is provided", () => {
    const { sut } = makeSut();

    expect(async () => await sut.execute({})).rejects.toThrow("INVALID_PARAMS");
  });

  describe("Search by tag", () => {
    it("should throw if tag does not exists", () => {
      const { sut } = makeSut();

      expect(
        async () => await sut.execute({ tag: "invalid-tag" }),
      ).rejects.toThrow("INVALID_TAG");
    });

    it("should return a list of tools by tag", async () => {
      const { sut, repository } = makeSut();

      const tool = mockTool({ tags: ["tag2"] });

      [
        mockTool({ tags: ["tag1"] }),
        mockTool(),
        mockTool({ tags: ["tag1"] }),
        mockTool(),
        tool,
      ].forEach((tool) => repository.add(tool));

      await sut.execute({ tag: "tag1" }).then((tools) => {
        expect(tools.length).toBe(2);
      });

      await sut.execute({ tag: "tag2" }).then((tools) => {
        expect(tools.length).toBe(1);
        expect(tools[0].id).toBe(tool.id);
      });
    });
  });

  describe("Search by title", () => {
    it("should throw if title does not exists", () => {
      const { sut } = makeSut();

      expect(
        async () => await sut.execute({ title: "invalid-title" }),
      ).rejects.toThrow("INVALID_TITLE");
    });

    it("should return a list of tools by title", async () => {
      const { sut, repository } = makeSut();

      const tool = mockTool({ title: "title2" });

      [
        mockTool({ title: "title1" }),
        mockTool(),
        mockTool({ title: "title1-addon" }),
        mockTool(),
        tool,
      ].forEach((tool) => repository.add(tool));

      await sut.execute({ title: "title1" }).then((tools) => {
        expect(tools.length).toBe(2);
      });

      await sut.execute({ title: "title2" }).then((tools) => {
        expect(tools.length).toBe(1);
        expect(tools[0].id).toBe(tool.id);
      });
    });
  });
});
