import { describe, it, expect } from "vitest";
import { validateCalculateInput } from "../validation";

describe("validateCalculateInput", () => {
  it("accepts valid input", () => {
    const result = validateCalculateInput({ a: 4, b: 5, operation: "add" });
    expect(result.valid).toBe(true);
  });

  it("rejects a string where a number is expected", () => {
    const result = validateCalculateInput({ a: "1", b: 5, operation: "subtract" });
    expect(result.valid).toBe(false);
  });

  it("rejects an unsupported operation", () => {
    const result = validateCalculateInput({ a: 4, b: 5, operation: "divide" });
    expect(result.valid).toBe(false);
  });

  it("rejects a missing field", () => {
    const result = validateCalculateInput({ a: 4, operation: "add" });
    expect(result.valid).toBe(false);
  });
});