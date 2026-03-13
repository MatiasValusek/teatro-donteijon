export type PublicFormState = {
  status?: "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export const initialPublicFormState: PublicFormState = {};
