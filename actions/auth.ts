'use server';

import { z } from 'zod';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { forgotPasswordSchema, registerSchema } from '@/lib/zodSchema';

type AuthResponse = {
  success: boolean;
  message: string;
  email?: string | null;
};

export async function registerUser(prevState: AuthResponse | null, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());

    const parsedData = registerSchema.parse(data);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      parsedData.email,
      parsedData.password
    );
    const user = userCredential.user;

    await sendEmailVerification(user);

    return {
      success: true,
      email: user.email,
      message: 'Registration successful! Please verify your email',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'An unknown error occurred' };
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true, message: 'Logout successful' };
  } catch {
    return { success: false, message: 'An unknown error occurred' };
  }
}

export async function resetPassword(prevState: AuthResponse | null, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const parsedData = forgotPasswordSchema.parse(data);

    await sendPasswordResetEmail(auth, parsedData.email);
    return {
      success: true,
      message: 'If the email exists in our system, you will receive a password reset link.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return {
      success: false,
      message: 'Failed to check email or send reset link. Please try again later.',
    };
  }
}
