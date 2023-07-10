import Sequel, { QueryInterface } from 'sequelize';
import { USER_ROLE } from '../shared/constant';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof Sequel) {
    await queryInterface.createTable('Users', {
      uuid: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      username: {
        unique: true,
        allowNull: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: true,
        defaultValue: USER_ROLE.USER,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof Sequel) {
    await queryInterface.dropTable('Users');
  },
};
