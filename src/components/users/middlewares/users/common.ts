import asyncMw from 'express-asyncmw';
import { z } from 'zod';
import { createUserSchema, updateUserSchema } from '../../utils/schema';

export const validateCreateUserPayloadMw = asyncMw<{
  reqBody: z.infer<typeof createUserSchema>;
}>(async (req, res, next) => {
  req.body = await createUserSchema.parseAsync(req.body);

  return next();
});

export const validateUpdateUserPayloadMw = asyncMw<{
  reqBody: z.infer<typeof updateUserSchema>;
}>(async (req, res, next) => {
  req.body = await updateUserSchema.parseAsync(req.body);

  return next();
});
