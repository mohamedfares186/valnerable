import pool from "../config/db.js";

export interface Product {
  productId?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

await pool.query(`
  CREATE TABLE IF NOT EXISTS products (
    productId SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INT NOT NULL
  );
`);

export const getAllProducts = async () => {
  const result = await pool.query(`SELECT * FROM products;`);
  return result.rows;
};

export const getProductById = async (productId: number) => {
  const result = await pool.query(
    `SELECT * FROM products WHERE productId = ${productId};`
  );
  return result.rows[0];
};

export const getProductByName = async (name: string) => {
  const result = await pool.query(
    `SELECT * FROM products WHERE name ILIKE '%${name}%';`
  );
  return result.rows;
};

export const createProduct = async (product: Product) => {
  const { name, description, price, stock } = product;
  const result = await pool.query(
    `INSERT INTO products (name, description, price, stock) VALUES ('${name}', '${description}', ${price}, ${stock}) RETURNING *;`
  );
  return result.rows[0];
};
