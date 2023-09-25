import { mockTool } from "./mocks/mock-tool";
import { ToolRepositoryInMemory } from "./mocks/tool-repository-in-memory";

const makeSut = () => {
  const repository = new ToolRepositoryInMemory();
  const sut = new SearchToolByTagUseCase(repository);

  return { sut, repository };
};

describe("Use Case: Search Tool", () => {
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
      expect(tools.lenght).toBe(2);
    });

    await sut.execute({ tag: "tag2" }).then((tools) => {
      expect(tools.lenght).toBe(1);
      expect(tools[0].id).toBe(tool.id);
    });
  });
});
