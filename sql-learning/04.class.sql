CREATE TABLE restaurants_menu(
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
)
