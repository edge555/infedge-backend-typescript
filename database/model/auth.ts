import { DataTypes, Model, Optional } from 'sequelize'
const sequelizeConnection = require("../dbConnect");
interface AuthAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
}

export interface AuthInput extends Optional<AuthAttributes, 'id' > {}

export interface AuthOuput extends Required<AuthAttributes> {}

class Auth extends Model<AuthAttributes, AuthInput> implements AuthAttributes {
    public id!: number
    public username!: string
    public email!: string
    public password!: string

    // timestamp
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Auth.init({
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
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
  sequelize: sequelizeConnection,
  paranoid: true
})

export default Auth;