import _ from 'lodash';
import { z } from 'zod';
import asyncMw from 'express-asyncmw';
import User from '../../models';
import { BaseUserModel } from '../../models/attributes';
import { updateUserSchema } from '../../utils/schema';

export const updateUserMw = asyncMw<{
  reqBody: z.infer<typeof updateUserSchema>;
  extends: {
    user: BaseUserModel;
  };
}>(async (req, res, next) => {
  const resource = await User.instance.factory.resourceToModel(req.body);

  if (_.isEmpty(resource)) return next();

  const [, [user]] = await User.instance.update(resource, {
    returning: true,
    where: {
      uuid: req.user.dataValues.uuid,
    },
  });

  req.user = user;

  return next();
});
