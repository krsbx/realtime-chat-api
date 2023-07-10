import { createCodeStatus } from '@krsbx/response-formatter';
import asyncMw from 'express-asyncmw';
import User from '../../models';
import { BaseUserModel } from '../../models/attributes';
import db from '../../../../models';
import streamInstance from '../../../../config/stream';

export const deleteUserMw = asyncMw<{
  extends: {
    user: BaseUserModel;
  };
}>(async (req, res) => {
  await db.sequelize.transaction(async (t) => {
    await User.instance.destroy({
      where: {
        uuid: req.user.dataValues.uuid,
      },
      transaction: t,
    });

    await streamInstance.deleteUser(req.user.dataValues.uuid, {
      delete_conversation_channels: true,
      mark_messages_deleted: true,
      hard_delete: true,
    });
  });

  return res.status(200).json({
    ...createCodeStatus(200),
    message: 'Your account has been deleted successfully',
  });
});
