export interface CalculateInput {
  a: number;
  b: number;
  operation: "add" | "subtract" | "multiply";
}

const ALLOWED_OPERATIONS = ["add", "subtract", "multiply"];

export function validateCalculateInput(
  body: any
): { valid: true; data: CalculateInput } | { valid: false; error: string } {
  if (typeof body?.a !== "number" || Number.isNaN(body.a)) {
    return { valid: false, error: "'a' must be a number" };
  }
  if (typeof body?.b !== "number" || Number.isNaN(body.b)) {
    return { valid: false, error: "'b' must be a number" };
  }
  if (!ALLOWED_OPERATIONS.includes(body?.operation)) {
    return {
      valid: false,
      error: `'operation' must be one of: ${ALLOWED_OPERATIONS.join(", ")}`,
    };
  }
  return { valid: true, data: { a: body.a, b: body.b, operation: body.operation } };
}