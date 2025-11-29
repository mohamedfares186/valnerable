import pool from "../config/db.js";
import { logger } from "../middleware/logger.js";

export interface User {
  userId?: number;
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export const UserTable = async () => {
  return await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user'
  );
  `);
};

export const UserSeq = async () => {
  return await pool.query(
    `ALTER SEQUENCE users_user_id_seq RESTART WITH 10000;`
  );
};

export const userLogin = async (username: string, password: string) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`
  );
  return result.rows[0];
};

export const getUserByUsername = async (username: string) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE username = '${username};`
    );
    return result.rows[0];
  } catch (error) {
    logger.error(`Error in getUserByUsername: ${error}`);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = '${email}';`
    );
    return result.rows[0];
  } catch (error) {
    logger.error(`Error in getUserByEmail: ${error}`);
    throw error;
  }
};

export const createUser = async (user: User) => {
  try {
    const { name, email, username, password, role } = user;
    const result = await pool.query(
      `INSERT INTO users (name, email, username, password, role) VALUES ('${name}', '${email}', '${username}', '${password}', '${role}') RETURNING *;`
    );
    return result.rows[0];
  } catch (error) {
    logger.error(`Error in createUser: ${error}`);
    throw error;
  }
};
