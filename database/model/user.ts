import { DataTypes, Model, Optional } from 'sequelize';
const sequelizeConnection = require('../dbConnect');

interface UserAttributes {
  id: string;
  username: string;
  name: string;
  email: string;
  role: number;
  lastModifierId: string;
  lastModificationTime: Date;
  passwordLastModificationTime: Date;
}

export type UserInput = Optional<UserAttributes, 'id' | 'role'>;

export type UserOutput = Required<UserAttributes>;

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: string;
  public username!: string;
  public name!: string;
  public email!: string;
  public role!: number;
  public lastModifierId!: string;
  public lastModificationTime!: Date;
  public passwordLastModificationTime!: Date;
  // timestamp
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastModifierId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    lastModificationTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    passwordLastModificationTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
  }
);

export default User;
