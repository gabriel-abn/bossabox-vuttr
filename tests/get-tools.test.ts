import { faker } from "@faker-js/faker";
import app from "@main/server";
import request from "supertest";

describe("First case: return all tools.", () => {
  describe("should return error", () => {
    it("should return 401 if no token is provided", async () => {
      const response = await request(app).get("/api/tools");

      expect(response.status).toBe(401);
    });
    it("should return 500 if token is invalid", async () => {
      const response = await request(app)
        .get("/api/tools")
        .auth("invalid_token", { type: "bearer" });

      expect(response.status).toBe(500);
    });
  });

  describe("should return status 200", () => {
    let response = null;
    let token = null;

    const login = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    beforeAll(async () => {
      await request(app)
        .post("/api/auth/signup")
        .send({
          name: faker.person.firstName(),
          ...login,
        });

      token = await request(app)
        .post("/api/auth/login")
        .send({ ...login })
        .then((res) => res.body.accessToken);

      response = await request(app)
        .get("/api/tools")
        .auth(token, { type: "bearer" })
        .then((res) => res.body);
    });

    it("token is valid", () => {
      expect(token).toBeDefined();
    });
    it("should return all tools", () => {
      console.log(response);
      expect(response).toBeInstanceOf(Array);
    });
  });
});

describe("Second case: return tools with tag.", () => {
  describe("should return status 4XX", () => {
    it("should return 401 if no token is provided", async () => {
      const response = await request(app).get("/api/tools?tag=node");

      expect(response.status).toBe(401);
    });
    it("should return 401 if token is invalid", async () => {
      const response = await request(app)
        .get("/api/tools?tag=node")
        .auth("invalid_token", { type: "bearer" });

      expect(response.status).toBe(500);
    });
  });

  describe("should return status 200", () => {
    let response = null;
    let token = null;

    const login = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    beforeAll(async () => {
      await request(app)
        .post("/api/auth/signup")
        .send({
          name: faker.person.firstName(),
          ...login,
        });

      token = await request(app)
        .post("/api/auth/login")
        .send({ ...login })
        .then((res) => res.body.accessToken);

      response = await request(app)
        .get("/api/tools")
        .query({ tags: ["node"] })
        .auth(token, { type: "bearer" })
        .then((res) => res.body);
    });

    it("token is valid", () => {
      expect(token).toBeDefined();
    });

    it("should return an array of tools containing the tags", () => {
      expect(response).toBeInstanceOf(Array);

      response.forEach((tool) => {
        expect(tool.tags).toContain("node");
      });
    });
  });
});
