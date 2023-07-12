import _ from 'lodash';
import { z } from 'zod';

export const loginUserSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
});

export const createUserSchema = z
  .object({
    username: z.preprocess((value) => {
      let str = _.toString(value);

      str = str.replace(/ /g, '').toLowerCase();

      return str;
    }, z.string().min(5)),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Confirmation password did not match',
      });
    }
  });

export const updateUserSchema = z
  .object({
    username: z
      .preprocess((value) => {
        if (!value) return;

        let str = _.toString(value);

        str = str.replace(/ /g, '').toLowerCase();

        return str;
      }, z.string().min(5))
      .optional(),
    password: z.string().min(5).optional(),
    confirmPassword: z.string().min(5).optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password && confirmPassword && confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Confirmation password did not match',
      });
    }
  });
