// const sum = require("./sum");

// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });

const request = require("supertest");
const app = require("./index"); // Replace "../app" with the correct path to your Express app file

describe("POST /signup", () => {
  test("should return success message when user is signed up", async () => {
    const userData = {
      name: "chand babu",
      email: "callgddgddgboy@jddj.com",
      password: "chand@123",
    };

    const response = await request(app)
      .post("/signup")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toEqual({
      success: true,
      message: "User signed up successfully!",
    });
  }, 10000);
});
