import { describe, it, expect } from "vitest";
import { compute } from "./calculator.service";

describe("compute", () => {
  it("adds two numbers", () => {
    expect(compute(4, 5, "add")).toBe(9);
  });

  it("subtracts two numbers", () => {
    expect(compute(1, 5, "subtract")).toBe(-4);
  });

  it("multiplies two numbers", () => {
    expect(compute(3, 4, "multiply")).toBe(12);
  });
});