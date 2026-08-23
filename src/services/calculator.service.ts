export type Operation = "add" | "subtract" | "multiply";

export function compute(a: number, b: number, operation: Operation): number {
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}