import { faker } from "@faker-js/faker";
import app from "@main/server";
import request from "supertest";

describe("Auth: Sign up", () => {
  describe("should return 4XX if: ", () => {
    it("if no email is provided", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: "",
        password: "password",
      });

      expect(res.status).toBe(400);
    });

    it("if no password is provided", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: faker.internet.email(),
        password: "",
      });

      expect(res.status).toBe(400);
    });

    it("if email is invalid", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: "invalid-email",
        password: "password",
      });

      expect(res.status).toBe(400);
    });

    it.each(["gabriel", "gabriel123", "gabrielabc"])(
      "invalid password [%s]",
      async (password: string) => {
        const res = await request(app).post("/api/auth/signup").send({
          email: faker.internet.email(),
          password,
        });

        expect(res.body.error).toHaveProperty("errors", [
          "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.",
        ]);
        expect(res.status).toBe(400);
      },
    );
  });

  it("should return 201 if email and password are valid", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      email: faker.internet.email(),
      password: "Password123!",
    });

    expect(res.body).toHaveProperty("created", true);
    expect(res.status).toBe(201);
  });
});

describe("Auth: Login", () => {
  const account = {
    email: faker.internet.email(),
    password: "Password123!",
  };

  beforeAll(async () => {
    await request(app).post("/api/auth/signup").send(account);
  });

  it("should return 400 if no email or password is provided", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "",
      password: "",
    });

    expect(res.status).toBe(400);
  });

  it("should return 400 if email is invalid", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "invalid-email",
      password: "password",
    });

    expect(res.status).toBe(400);
  });

  it("should return 400 if password is invalid", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: account.email,
      password: "password",
    });

    expect(res.status).toBe(400);
  });

  it("should return token if email and password are valid", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: account.email,
      password: account.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
