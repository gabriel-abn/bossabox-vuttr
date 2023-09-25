import { DeleteToolUseCase } from "../delete-tool-use-case";
import { mockTool } from "./mocks/mock-tool";
import { ToolRepositoryInMemory } from "./mocks/tool-repository-in-memory";

const makeSut = () => {
  const repository = new ToolRepositoryInMemory();
  const sut = new DeleteToolUseCase(repository);

  return { sut, repository };
};

describe("Use case: Delete tool", () => {
  afterEach(() => {
    const { repository } = makeSut();

    repository.tools = [];
    repository.tags.clear();
  });

  it("should return true if tool is deleted", async () => {
    const { sut, repository } = makeSut();

    const tool = mockTool();
    repository.tools.push(tool);

    const res = await sut.execute({ id: tool.id });

    expect(res).toBeTruthy();
  });

  it("should delete tool and tags from repository", () => {
    const { sut, repository } = makeSut();
    const tool = mockTool({ tags: ["tag1", "tag2"] });

    repository
      .add(tool)
      .then(() => sut.execute({ id: tool.id }))
      .then(() => {
        expect(repository.tools.length).toBe(0);
        expect(repository.tags.size).toBe(0);
      });
  });

  it("should delete tool from tags", () => {
    const { sut, repository } = makeSut();

    const tools = [
      mockTool({ tags: ["tag1", "tag2"] }),
      mockTool({ tags: ["tag1", "tag2", "tag3"] }),
      mockTool({ tags: ["tag1"] }),
      mockTool({ tags: ["tag1", "tag3"] }),
    ];

    tools.forEach((tool) => repository.add(tool));

    sut.execute({ id: tools[0].id }).then(() => {
      expect(
        repository.tags.get("tag1").split(";").includes(tools[0].id),
      ).toBeFalsy();
      expect(repository.tags.get("tag1").split(";").length).toBe(3);
    });
  });

  it("should return false if tool does not exist", async () => {
    const { sut } = makeSut();
    const res = await sut.execute({ id: "any_id" });

    expect(res).toBeFalsy();
  });
});
