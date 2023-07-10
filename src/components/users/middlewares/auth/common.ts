import _ from 'lodash';
import { z } from 'zod';
import asyncMw from 'express-asyncmw';
import { createUnauthorizedResponse } from '@krsbx/response-formatter';
import { BaseUserModel, UserAttribute } from '../../models/attributes';
import { signJwtToken, verifyJwtToken } from '../../utils/jwt';
import { loginUserSchema } from '../../utils/schema';

export const validateUserLoginPayloadMw = asyncMw<{
  reqBody: z.infer<typeof loginUserSchema>;
}>(async (req, res, next) => {
  req.body = await loginUserSchema.parseAsync(req.body);

  return next();
});

export const createUserAccessTokenMw = asyncMw<{
  extends: {
    user: BaseUserModel;
    token: string;
  };
}>(async (req, res, next) => {
  const token = signJwtToken(_.omit(req.user.dataValues, ['password']), true);

  req.token = token;

  return next();
});

export const validateUserAccessTokenMw = asyncMw<{
  extends: {
    currentUser: Omit<UserAttribute, 'password'>;
  };
}>(async (req, res, next) => {
  const authorization = req.headers.authorization
    ? req.headers.authorization.split(' ').pop()
    : null;

  if (!authorization) {
    return res.status(401).json(createUnauthorizedResponse());
  }

  const tokenPayload = await verifyJwtToken<Omit<UserAttribute, 'password'>>(
    authorization
  );

  req.currentUser = tokenPayload;

  return next();
});

export const validateUserAccessMw = asyncMw<{
  params: {
    uuid: string;
  };
  extends: {
    currentUser: Omit<UserAttribute, 'password'>;
  };
}>(async (req, res, next) => {
  if (req.currentUser.uuid !== req.params.uuid)
    return res.status(401).json(createUnauthorizedResponse());

  return next();
});

export const validateUserAccessByUserUuidMw = asyncMw<{
  params: {
    userId: string;
  };
  extends: {
    currentUser: Omit<UserAttribute, 'password'>;
  };
}>(async (req, res, next) => {
  if (req.currentUser.uuid !== req.params.userId)
    return res.status(401).json(createUnauthorizedResponse());

  return next();
});
