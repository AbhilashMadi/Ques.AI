import { useState, useCallback } from 'react';
import { ZodSchema, ZodError } from 'zod';

// Base types
type FormErrors<T> = Partial<Record<keyof T, string>>;
type FormTouched<T> = Partial<Record<keyof T, boolean>>;

// Form configuration
interface UseFormOptions<T extends Record<string, any>> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validationSchema?: ZodSchema<T>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

// Return object
export interface UseFormReturn<T extends Record<string, any>> {
  values: T;
  errors: FormErrors<T>;
  touched: FormTouched<T>;
  isSubmitting: boolean;
  isValid: boolean;
  handleChange: <K extends keyof T>(e: React.ChangeEvent<HTMLInputElement> | { target: { name: K; value: T[K] } }) => void;
  handleBlur: <K extends keyof T>(e: React.FocusEvent<HTMLInputElement> | { target: { name: K } }) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFieldValue: <K extends keyof T>(name: K, value: T[K]) => void;
  setFieldTouched: <K extends keyof T>(name: K, isTouched?: boolean) => void;
  setFieldError: <K extends keyof T>(name: K, message: string) => void;
  resetForm: () => void;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validationSchema,
  validateOnChange = true,
  validateOnBlur = true,
}: UseFormOptions<T>): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<FormTouched<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validateForm = useCallback((valuesToValidate: T): FormErrors<T> => {
    const newErrors: FormErrors<T> = {};

    if (validationSchema) {
      try {
        validationSchema.parse(valuesToValidate);
      } catch (err) {
        if (err instanceof ZodError) {
          for (const issue of err.issues) {
            const key = issue.path[0] as keyof T;
            if (key && newErrors[key] === undefined) {
              newErrors[key] = issue.message;
            }
          }
        }
      }
    }

    setIsValid(Object.keys(newErrors).length === 0);
    return newErrors;
  }, [validationSchema]);

  const handleChange = useCallback(<K extends keyof T>(e: React.ChangeEvent<HTMLInputElement> | { target: { name: K; value: T[K] } }) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? checked : value;

    setValues(prev => {
      const updated = { ...prev, [name]: newValue };
      if (validateOnChange) {
        setErrors(validateForm(updated));
      }
      return updated;
    });
  }, [validateForm, validateOnChange]);

  const handleBlur = useCallback(<K extends keyof T>(e: React.FocusEvent<HTMLInputElement> | { target: { name: K } }) => {
    const { name } = e.target as HTMLInputElement;
    setTouched(prev => ({ ...prev, [name]: true }));
    if (validateOnBlur) setErrors(validateForm(values));
  }, [validateForm, validateOnBlur, values]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as FormTouched<T>);
    setTouched(allTouched);

    const newErrors = validateForm(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, onSubmit, validateForm]);

  const setFieldValue = useCallback(<K extends keyof T>(name: K, value: T[K]) => {
    setValues(prev => {
      const updated = { ...prev, [name]: value };
      if (validateOnChange) {
        setErrors(validateForm(updated));
      }
      return updated;
    });
  }, [validateForm, validateOnChange]);

  const setFieldTouched = useCallback(<K extends keyof T>(name: K, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
    if (validateOnBlur && isTouched) {
      setErrors(validateForm(values));
    }
  }, [validateForm, validateOnBlur, values]);

  const setFieldError = useCallback(<K extends keyof T>(name: K, message: string) => {
    setErrors(prev => ({ ...prev, [name]: message }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    resetForm,
  };
};
