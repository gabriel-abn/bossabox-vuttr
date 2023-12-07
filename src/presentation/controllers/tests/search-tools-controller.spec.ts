import { Mock, vi } from "vitest";
import SearchToolsController from "../search-tools-controller";

describe("SearchToolsController", () => {
  let controller: SearchToolsController;
  let useCaseMock: { execute: Mock };

  beforeEach(() => {
    useCaseMock = { execute: vi.fn() };
    controller = new SearchToolsController(useCaseMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return 200 if tool exists", async () => {
    useCaseMock.execute.mockResolvedValue({
      tools: [
        {
          id: 1,
          title: "Visual Studio Code",
          link: "https://code.visualstudio.com/",
          description: "Um editor de código poderoso e personalizável",
          tags: ["IDE", "editor de código", "desenvolvimento web"],
        },
      ],
    });

    const response = await controller.handle({ title: "Visual Studio Code" });

    expect(response.status).toBe(200);
    expect(response.body.tools[0].title).toBe("Visual Studio Code");
  });

  it("should return 400 if tool doesnt exists", async () => {
    useCaseMock.execute.mockRejectedValue(new Error("INVALID_TITLE"));

    const response = await controller.handle({
      title: "Ferramenta inexistente",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBe("INVALID_TITLE");
  });

  it("should return 400 if invalid params", async () => {
    useCaseMock.execute.mockRejectedValue(new Error("INVALID_PARAMS"));

    const response = await controller.handle({ title: "" });

    expect(response.status).toBe(400);
    expect(response.body).toBe("INVALID_PARAMS");
  });

  it("should return 500 if use case throws", async () => {
    useCaseMock.execute.mockRejectedValue(new Error("ANY_ERROR"));

    const response = await controller.handle({ title: "any_title" });

    expect(response.status).toBe(500);
    expect(response.body).toBe("ANY_ERROR");
  });
});
