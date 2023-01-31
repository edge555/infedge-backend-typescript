import { DataTypes, Model, Optional } from "sequelize";
const sequelizeConnection = require("../dbConnect");
interface StoryAttributes {
  id: number;
  title: string;
  description: string;
  authorUserName: string;
  authorName: string;
  authorId: number;
  lastModifierId: number;
  lastModificationTime: Date;
}

export interface StoryInput
  extends Optional<StoryAttributes, "id" | "lastModifierId"> {}

export interface StoryOutput extends Required<StoryAttributes> {}

class Story
  extends Model<StoryAttributes, StoryInput>
  implements StoryAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public authorUserName!: string;
  public authorName!: string;
  public authorId!: number;
  public lastModifierId!: number;
  public lastModificationTime!: Date;
  // timestamp
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Story.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorUserName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorName: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastModifierId: {
      type: DataTypes.INTEGER,
    },
    lastModificationTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
  }
);

export default Story;
