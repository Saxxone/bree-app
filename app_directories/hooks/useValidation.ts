import { useState, useCallback } from "react";

export type ValidationRule = {
  type: "required" | "email" | "min" | "max" | "pattern";
  message: string;
  value?: number | string | RegExp;
};

export function useValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(
    (value: string, rules: ValidationRule[]): Record<string, string> => {
      const newErrors: Record<string, string> = {};

      for (const rule of rules) {
        switch (rule.type) {
          case "required":
            if (!value) {
              newErrors[rule.type] = rule.message;
            }
            break;
          case "email":
            if (value && !/\S+@\S+\.\S+/.test(value)) {
              newErrors[rule.type] = rule.message;
            }
            break;
          case "min":
            if (value && value.length < (rule.value as number)) {
              newErrors[rule.type] = rule.message;
            }
            break;
          case "max":
            if (value && value.length > (rule.value as number)) {
              newErrors[rule.type] = rule.message;
            }
            break;
          case "pattern":
            if (value && !(rule.value as RegExp).test(value)) {
              newErrors[rule.type] = rule.message;
            }
            break;
        }
      }
      return newErrors;
    },
    [],
  );

  return { validate, errors, setErrors };
}
