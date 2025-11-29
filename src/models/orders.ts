import pool from "../config/db.js";

export const OrdersTable = async () => {
  return await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        order_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        cart JSONB NOT NULL,
        total_quantity INT NOT NULL,
        total_amount FLOAT NOT NULL,
        address TEXT NOT NULL,
        order_status VARCHAR(50) NOT NULL,
        payment_method TEXT NOT NULL,
        payment_status TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );
    `);
};
