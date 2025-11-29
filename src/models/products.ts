import pool from "../config/db.js";

export interface Product {
  productId?: number;
  product_name: string;
  product_description: string;
  category: string;
  price: number;
  stock: number;
}

export const ProductsTable = async () => {
  return await pool.query(`
  CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    product_description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INT NOT NULL
  );
`);
};

export const getAllProducts = async () => {
  const result = await pool.query(`SELECT * FROM products;`);
  return result.rows;
};

export const getAllProductsByCategory = async (category: string) => {
  const result = await pool.query(
    `SELECT * FROM products WHERE category = '${category}';`
  );
  return result.rows;
};

export const getProductById = async (productId: number) => {
  const result = await pool.query(
    `SELECT * FROM products WHERE product_id = ${productId};`
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
  const { product_name, product_description, category, price, stock } = product;
  const result = await pool.query(
    `INSERT INTO products (product_name, product_description, category, price, stock) VALUES ('${product_name}', '${product_description}', '${category}', ${price}, ${stock}) RETURNING *;`
  );
  return result.rows[0];
};

export const updateProductStock = async (
  productId: number,
  newStock: number
) => {
  const result = await pool.query(
    `UPDATE products SET stock = ${newStock} WHERE product_id = ${productId} RETURNING *;`
  );
  return result.rows[0];
};

export const deleteProduct = async (productId: number) => {
  const result = await pool.query(
    `DELETE FROM products WHERE product_id = ${productId} RETURNING *;`
  );
  return result.rows[0];
};
