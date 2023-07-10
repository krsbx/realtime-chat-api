import asyncMw from 'express-asyncmw';
import { z } from 'zod';
import {
  createBadRequestResponse,
  createNotFoundResponse,
} from '@krsbx/response-formatter';
import User from '../../models';
import { BaseUserModel } from '../../models/attributes';
import { compareText } from '../../utils/bcrypt';
import { loginUserSchema } from '../../utils/schema';

export const getUserByPayloadMw = asyncMw<{
  reqBody: z.infer<typeof loginUserSchema>;
  extends: {
    user: BaseUserModel;
  };
}>(async (req, res, next) => {
  const user = await User.instance.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    return res
      .status(404)
      .json(
        createNotFoundResponse(
          `User with username '${req.body.username}' doesn't exists`
        )
      );
  }

  req.user = user;

  return next();
});

export const comparePasswordMw = asyncMw<{
  reqBody: z.infer<typeof loginUserSchema>;
  extends: {
    user: BaseUserModel;
  };
}>(async (req, res, next) => {
  const isCorrect = await compareText({
    original: req.user.dataValues.password,
    text: req.body.password,
  });

  if (!isCorrect) {
    return res
      .status(400)
      .json(createBadRequestResponse(`Password doesn't match`));
  }

  return next();
});
