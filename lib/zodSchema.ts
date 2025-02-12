import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const forgotPasswordschema = z.object({
  email: z.string().email('Please enter a valid email address'),
});
