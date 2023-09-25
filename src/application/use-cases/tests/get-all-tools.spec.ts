import { GetAllToolsUseCase } from "../get-all-tools-use-case";
import { ToolRepositoryInMemory } from "./mocks/tool-repository-in-memory";

const makeSut = () => {
  const repository = new ToolRepositoryInMemory();
  const sut = new GetAllToolsUseCase(repository);

  return { sut, repository };
};

describe("Use Case: Get All Tools", () => {
  it("should return all tools", async () => {
    const { sut, repository } = makeSut();

    const tools = await sut.execute();

    expect(tools).toEqual(repository.tools);
  });

  it("should return empty array if there is no tools", async () => {
    const { sut } = makeSut();

    const tools = await sut.execute();

    expect(tools).toEqual([]);
  });
});
