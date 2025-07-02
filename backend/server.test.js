const request = require("supertest");
const app = require("./server.js");


describe("NASA API Routes", () => {
  it("should return image search results", async () => {
    const res = await request(app).get("/search-images?q=moon");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("collection");
  });

  it("should return NEO data", async () => {
    const res = await request(app).get("/near-earth-objects")
      .query({ start_date: "2024-07-01", end_date: "2024-07-02" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("near_earth_objects");
  });
});

describe("AI Assistant", () => {
  it(
    "should return a simple explanation",
    async () => {
      const res = await request(app)
        .post("/explain-tech")
        .send({ text: "NASA uses satellites to monitor the Earth" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("explanation");
    },
    15000 
  );
});

