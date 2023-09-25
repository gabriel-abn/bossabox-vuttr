import { GetToolUseCase } from "../get-tool-use-case";
import { mockTool } from "./mocks/mock-tool";
import { ToolRepositoryInMemory } from "./mocks/tool-repository-in-memory";

const makeSut = () => {
  const repository = new ToolRepositoryInMemory();
  const sut = new GetToolUseCase(repository);

  return { sut, repository };
};

describe("Use case: Get tool", () => {
  it("should return a tool by id", async () => {
    const { sut, repository } = makeSut();
    const tool = mockTool();

    const result = await repository.add(tool).then(() => sut.execute({ id: tool.id }).then((tool) => tool));

    expect(result).toEqual({ ...tool.props, id: tool.id });
  });

  it("should throw if tool does not exists", () => {
    const { sut } = makeSut();

    expect(async () => await sut.execute({ id: "invalid-id" })).rejects.toThrow();
  });
});
