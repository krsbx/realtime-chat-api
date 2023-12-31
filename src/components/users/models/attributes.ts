import { Model, ModelStatic } from 'sequelize';
import { USER_ROLE } from '../../../shared/constant';
import factory from '../../../shared/factory';
// eslint-disable-next-line import/no-cycle
import postFactory from './postFactory';

export type UserAttribute = {
  uuid: string;
  username: string | null;
  password: string;
  role: ValueOf<typeof USER_ROLE>;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type CreateUserAttribute = Optional<
  UserAttribute,
  'uuid' | 'createdAt' | 'updatedAt'
>;

export type BaseUserModel = Model<UserAttribute, CreateUserAttribute>;

export type UserModel = ModelStatic<BaseUserModel> & {
  factory: ReturnType<
    typeof factory<UserAttribute, CreateUserAttribute>
  >['factory'] &
    ReturnType<typeof postFactory>;
};
