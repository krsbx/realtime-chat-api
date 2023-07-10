import { z } from 'zod';
import asyncMw from 'express-asyncmw';
import User from '../../models';
import { BaseUserModel } from '../../models/attributes';
import { createUserSchema } from '../../utils/schema';
import db from '../../../../models';
import streamInstance from '../../../../config/stream';

export const createUserMw = asyncMw<{
  reqBody: z.infer<typeof createUserSchema>;
  extends: {
    user: BaseUserModel;
  };
}>(async (req, res, next) => {
  const resource = await User.instance.factory.resourceToModel(req.body);

  const user = await db.sequelize.transaction(async (t) => {
    const user = await User.instance.create(resource, { transaction: t });

    await streamInstance.upsertUser({
      id: user.dataValues.uuid,
      username: user.dataValues.username ?? '',
      role: user.dataValues.role,
    });

    return user;
  });

  req.user = user;

  return next();
});
