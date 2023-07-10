import { Router } from 'express';
import middlewares from '../middlewares';

const router = Router();

// POST /users
router.post(
  '/',
  middlewares.users.common.validateCreateUserPayloadMw,
  middlewares.users.create.createUserMw,
  middlewares.users.response.returnUserMw
);

// GET /users
router.get(
  '/',
  middlewares.auth.common.validateUserAccessTokenMw,
  middlewares.users.read.getUsersMw,
  middlewares.users.response.returnUsersMw
);

// GET /users/:uuid
router.get(
  '/:uuid',
  middlewares.auth.common.validateUserAccessTokenMw,
  middlewares.users.read.getUserMw,
  middlewares.users.response.returnUserMw
);

// PATCH /users/:uuid
router.patch(
  '/:uuid',
  middlewares.auth.common.validateUserAccessTokenMw,
  middlewares.auth.common.validateUserAccessMw,
  middlewares.users.common.validateUpdateUserPayloadMw,
  middlewares.users.read.getUserMw,
  middlewares.users.update.updateUserMw,
  middlewares.users.response.returnUserMw
);

// DELETE /users/:uuid
router.delete(
  '/:uuid',
  middlewares.auth.common.validateUserAccessTokenMw,
  middlewares.auth.common.validateUserAccessMw,
  middlewares.users.read.getUserMw,
  middlewares.users.delete.deleteUserMw
);

export default router;
