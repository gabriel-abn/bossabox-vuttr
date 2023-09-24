import { Tool, ToolProps } from "@domain/entities";
import { faker } from "@faker-js/faker";
import { afterEach, describe, expect, it } from "vitest";
import { AddToolUseCase } from "../add-tool-use-case";
import { AddToolRepositoryInMemory } from "./mocks/add-tool-repository-in-memory";

const mockTool = (mock?: ToolProps) =>
  Tool.create({
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    link: faker.internet.url(),
    tags: [faker.commerce.productMaterial(), faker.commerce.productMaterial()],
    ...mock,
  });

const makeSut = () => {
  const repository = new AddToolRepositoryInMemory();
  const sut = new AddToolUseCase(repository);

  return { sut, repository };
};

describe("Add Tool", () => {
  afterEach(() => {
    const { repository } = makeSut();

    repository.tools = [];
    repository.tags.clear();
  });

  it("should return id and tool title", async () => {
    const { sut } = makeSut();

    const res = await sut.execute({
      title: "any_title",
      link: "any_link.com",
      description: "any_description",
      tags: ["tag1", "tag2"],
    });

    expect(res).toEqual({
      id: expect.any(String),
      title: "any_title",
      link: "any_link.com",
      description: "any_description",
      tags: ["tag1", "tag2"],
    });
  });

  it("should throw if tool already exists", () => {
    const { sut, repository } = makeSut();
    const tool = mockTool();
    repository.tools.push(tool);

    expect(
      async () =>
        await sut.execute({
          title: tool.props.title,
          link: tool.props.link,
          description: tool.props.description,
          tags: tool.props.tags,
        }),
    ).rejects.toThrow("TOOL_ALREADY_EXISTS");
  });

  it("should save all tags in lowercase", async () => {
    const { sut, repository } = makeSut();

    await sut.execute({
      title: "any_title",
      link: "any_link.com",
      description: "any_description",
      tags: ["TAG1", "Tag2"],
    });

    expect(repository.tools[0].props.tags).toEqual(["tag1", "tag2"]);
    expect(repository.tags.get("tag1")).toBeTruthy();
    expect(repository.tags.get("tag2")).toBeTruthy();
  });

  it("should concatenate ids of tools with same tag", () => {
    const { sut, repository } = makeSut();

    Promise.all([
      sut.execute({
        title: "any_title_1",
        link: "any_link_1.com",
        description: "any_description",
        tags: ["tag1"],
      }),
      sut.execute({
        title: "any_title_2",
        link: "any_link_2.com",
        description: "any_description",
        tags: ["tag1"],
      }),
      sut.execute({
        title: "any_title_3",
        link: "any_link_3.com",
        description: "any_description",
        tags: ["tag1"],
      }),
    ]);

    expect(repository.tags.get("tag1").split(";").length).toBe(3);
  });
});
