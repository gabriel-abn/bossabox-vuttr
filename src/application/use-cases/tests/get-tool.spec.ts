import { mockTool } from "./mocks/mock-tool";
import { ToolRepositoryInMemory } from "./mocks/tool-repository-in-memory";

const makeSut = () => {
  const repository = new ToolRepositoryInMemory();
  const sut = new GetToolUseCase(repository);

  return { sut, repository };
};

describe("Use case: Get tool", () => {
  it("should return a tool by id", () => {
    const { sut, repository } = makeSut();
    const tool = mockTool();

    const result = repository.add(tool).then(async () => await sut.execute(tool.id));

    expect(result).toEqual(tool);
  });

  it("should throw if tool does not exists", () => {
    const { sut } = makeSut();

    expect(async () => await sut.execute("invalid-id")).rejects.toThrow();
  });
});
