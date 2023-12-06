import { ApplicationError } from "@application/common";
import { Mock } from "vitest";
import { DeleteToolController } from "../delete-tool-controller";

describe("Delete Tool Controller", () => {
  let sut: DeleteToolController;
  let mockUseCase: { execute: Mock };

  beforeEach(() => {
    mockUseCase = {
      execute: vi.fn(),
    };

    sut = new DeleteToolController(mockUseCase);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return 200 if valid data provided", async () => {
    const result = await sut.handle({ id: "valid_id" });

    expect(result.status).toBe(200);
  });

  it("should return 400 if invalid data provided", async () => {
    mockUseCase.execute.mockRejectedValue(new ApplicationError("Invalid data"));

    const result = await sut.handle({ id: "" });

    expect(result.status).toBe(400);
  });

  it("should return 500 if throws a server error", async () => {
    mockUseCase.execute.mockRejectedValue(new Error("Server error"));

    const result = await sut.handle({ id: "valid_id" });

    expect(result.status).toBe(500);
  });
});
