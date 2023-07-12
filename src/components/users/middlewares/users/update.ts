import _ from 'lodash';
import { z } from 'zod';
import asyncMw from 'express-asyncmw';
import User from '../../models';
import { BaseUserModel } from '../../models/attributes';
import { updateUserSchema } from '../../utils/schema';
import db from '../../../../models';
import streamInstance from '../../../../config/stream';

export const updateUserMw = asyncMw<{
  reqBody: z.infer<typeof updateUserSchema>;
  extends: {
    user: BaseUserModel;
  };
}>(async (req, res, next) => {
  const resource = await User.instance.factory.resourceToModel(req.body);

  if (_.isEmpty(resource)) return next();

  const user = await db.sequelize.transaction(async (t) => {
    const [, [user]] = await User.instance.update(resource, {
      returning: true,
      where: {
        uuid: req.user.dataValues.uuid,
      },
      transaction: t,
    });

    await streamInstance.partialUpdateUser({
      id: user.dataValues.uuid,
      set: {
        name: user.dataValues.username ?? '',
        username: user.dataValues.username ?? '',
        role: user.dataValues.role,
      },
    });

    return user;
  });

  req.user = user;

  return next();
});
