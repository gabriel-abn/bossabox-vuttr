import { faker } from "@faker-js/faker";
import app from "@main/server";
import request from "supertest";

describe("Auth: Sign up", () => {
  describe("should verify credentials", () => {
    it("should return 400 if no email is provided", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: "",
        password: "password",
      });

      expect(res.status).toBe(400);
    });

    it("should return 400 if no password is provided", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: faker.internet.email(),
        password: "",
      });

      expect(res.status).toBe(400);
    });

    it("should return 400 if email is invalid", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: "invalid-email",
        password: "password",
      });

      expect(res.status).toBe(400);
    });

    it.each(["gabriel", "gabriel123", "gabrielabc"])(
      "should return 402 invalid password",
      async (password: string) => {
        const res = await request(app).post("/api/auth/signup").send({
          email: faker.internet.email(),
          password,
        });

        expect(res.status).toBe(400);
      },
    );
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
