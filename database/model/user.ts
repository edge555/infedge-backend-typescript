import { DataTypes, Model, Optional } from 'sequelize'
const sequelizeConnection = require("../dbConnect");
interface UserAttributes {
    id: number;
    username: string;
    name: string;
    email: string;
    role: number;
    lastModifierId:number;
    lastModificationTime: Date;
    passwordLastModificationTime:Date;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'role'> {}

export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public username!: string
    public name!: string
    public email!: string
    public role!: number
    public lastModifierId!: number
    public lastModificationTime!: Date
    public passwordLastModificationTime!: Date
    // timestamp
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
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
        type: DataTypes.INTEGER,
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
}, {
  sequelize: sequelizeConnection,
  paranoid: true
})

export default User;