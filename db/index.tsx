import { DataTypes, Sequelize } from 'sequelize';


const DB_HOST = 'localhost'
const DB_USER="root"
const DB_PASSWORD="12345678"
const DB_NAME="data"
const DB_PORT=3306


const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
  }
);

export const Data = sequelize.define('Data', {
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moneytype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    money: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },{
    timestamps: false, // Disable createdAt and updatedAt
  });
  

export default sequelize;