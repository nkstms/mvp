'use server';

import { z } from 'zod';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { forgotPasswordschema, registerSchema } from '@/lib/zodSchema';

type AuthResponse = {
  success: boolean;
  message: string;
};

export async function registerUser(prevState: AuthResponse | null, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());

    const parsedData = registerSchema.parse(data);

    if (parsedData.email === '' || parsedData.password === '') {
      return { success: false, message: 'Email and password are required' };
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      parsedData.email,
      parsedData.password
    );
    const user = userCredential.user;

    await sendEmailVerification(user);

    return { success: true, message: 'Registration successful! Please verify your email' };
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
    const data = Object.fromEntries(formData.entries()) as { email: string };

    const parsedData = forgotPasswordschema.parse(data);

    if (parsedData.email === '') {
      return { success: false, message: 'Email is required' };
    }

    await sendPasswordResetEmail(auth, data.email);
    return {
      success: true,
      message: 'If the email exists in our system, you will receive a password reset link.',
    };
  } catch {
    return {
      success: false,
      message: 'Failed to check email or send reset link. Please try again later.',
    };
  }
}
