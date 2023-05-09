import { DataTypes, Model, Optional } from 'sequelize';
const sequelizeConnection = require('../dbConnect');

interface StoryAttributes {
  id: string;
  title: string;
  description: string;
  authorUserName: string;
  authorName: string;
  authorId: string;
  lastModifierId: string;
  lastModificationTime: Date;
}

export type StoryInput = Optional<StoryAttributes, 'id' | 'lastModifierId'>;

export type StoryOutput = Required<StoryAttributes>;

class Story
  extends Model<StoryAttributes, StoryInput>
  implements StoryAttributes
{
  public id!: string;
  public title!: string;
  public description!: string;
  public authorUserName!: string;
  public authorName!: string;
  public authorId!: string;
  public lastModifierId!: string;
  public lastModificationTime!: Date;
  // timestamp
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Story.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.UUID,
      allowNull: false,
    },
    lastModifierId: {
      type: DataTypes.UUID,
      allowNull: false,
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
