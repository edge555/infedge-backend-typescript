import { DataTypes, Model, Optional } from 'sequelize';
const sequelizeConnection = require('../dbConnect');

interface AuthAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
}

export type AuthInput = Optional<AuthAttributes, 'id'>;

export type AuthOuput = Required<AuthAttributes>;

class Auth extends Model<AuthAttributes, AuthInput> implements AuthAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;

  // timestamp
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Auth.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
  }
);

export default Auth;
