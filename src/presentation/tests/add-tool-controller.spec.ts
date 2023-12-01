import { ApplicationError } from "@application/common";
import { mockTool } from "@application/use-cases/tests/mocks/mock-tool";
import { Tool } from "@domain/entities";
import { AddToolController } from "@presentation/controllers/add-tool-controller";
import { Mock, afterEach, describe, expect, it, vi } from "vitest";

describe("AddToolController (Unit)", () => {
  let sut: AddToolController;
  let mockUseCase: { execute: Mock };
  let fakeTool: Tool;

  beforeEach(() => {
    fakeTool = mockTool({});
    mockUseCase = { execute: vi.fn() };
    sut = new AddToolController(mockUseCase);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return 200 if valid data provided", async () => {
    mockUseCase.execute.mockResolvedValue(fakeTool);

    const result = await sut.handle({
      description: fakeTool.props.description,
      link: fakeTool.props.link,
      tags: fakeTool.props.tags,
      title: fakeTool.props.title,
    });

    expect(result.status).toBe(200);
  });

  it("should return 400 if invalid data provided", async () => {
    mockUseCase.execute.mockRejectedValue(new ApplicationError("Invalid data"));

    const result = await sut.handle({
      description: "",
      link: "",
      tags: [],
      title: "",
    });

    expect(result.status).toBe(400);
  });

  it("should return 500 if throws a server error", async () => {
    mockUseCase.execute.mockRejectedValue(new Error("Server error"));

    const result = await sut.handle({
      description: fakeTool.props.description,
      link: fakeTool.props.link,
      tags: fakeTool.props.tags,
      title: fakeTool.props.title,
    });

    expect(result.status).toBe(500);
  });
});
