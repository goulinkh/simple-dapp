import { createMocks } from "node-mocks-http";
import handler from "../src/pages/api/hello";

describe("/api/hello", () => {
  it("returns a greeting message", async () => {
    const { req, res } = createMocks({ method: "GET" });
    handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        hello: "world",
      })
    );
  });
});

export {};
