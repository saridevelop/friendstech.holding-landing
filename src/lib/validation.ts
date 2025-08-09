import { z } from 'zod';

export const subscribeSchema = z.object({
  email: z.string().email('Por favor ingresa un email válido'),
  consent: z.boolean().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa un email válido'),
  subject: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});
