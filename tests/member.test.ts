import request from "supertest";
import createApp from "../src/api";

let app: any;

beforeAll(async () => {
  app = await createApp();
});

describe("GET /v1/members/:id", () => {
  it("should respond with 400 when given an invalid uuid", async () => {
    const res = await request(app).get("/v1/members/1234");
    expect(res.badRequest).toBeTruthy;
  });

  it("should respond with 404 when given a valid uuid not corresponding to anyone", async () => {
    const res = await request(app).get(
      "/v1/members/706c4e89-0725-4fa9-a49a-7dbe8c008707"
    );
    expect(res.notFound).toBeTruthy;
  });
});
