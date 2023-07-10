import asyncMw from 'express-asyncmw';
import { createNotFoundResponse } from '@krsbx/response-formatter';
import User from '../../models';
import { BaseUserModel } from '../../models/attributes';

export const getUserMw = asyncMw<{
  params: {
    uuid: string;
  };
  extends: {
    user: BaseUserModel;
  };
}>(async (req, res, next) => {
  const user = await User.instance.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (!user) {
    return res
      .status(404)
      .json(createNotFoundResponse(`User with uuid ${req.params.uuid}`));
  }

  req.user = user;

  return next();
});

export const getUsersMw = asyncMw<{
  extends: {
    users: {
      rows: BaseUserModel[];
      count: number;
    };
  };
}>(async (req, res, next) => {
  const users = await User.instance.factory.findAll(
    {},
    req.filterQueryParams,
    req.query
  );

  req.users = users;

  return next();
});
