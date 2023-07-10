import { UserModel } from './attribute';

class UserFactory {
  private static _instance: UserModel;

  public static init(instance: UserModel) {
    UserFactory._instance = instance;

    return instance;
  }

  public static get instance() {
    return UserFactory._instance;
  }
}

export default UserFactory;
