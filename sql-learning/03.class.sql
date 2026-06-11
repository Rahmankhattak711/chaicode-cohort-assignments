-- CREATE TABLE products(
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(255),
--   discription TEXT,
--   price DECIMAL(10, 2),
--   thumb_pic VARCHAR(255)
-- )

-- INSERT INTO products(name, discription, price, thumb_pic)
-- VALUES (
--     'iPhone 12',
--     'The latest iPhone with A14 Bionic chip and 5G support.',
--     799.99,
--     'https://example.com/images/iphone12.jpg'
--   ),
--   (
--     'Sumsung A05',
--     'The latest Sumsung with A14 Bionic chip and 5G support.',
--     80.64,
--     'https://example.com/images/sumsungA05.jpg'
--   ),
--   (
--     'Xiaomi Redmi Note 10',
--     'The latest Xiaomi with A14 Bionic chip and 5G support.',
--     199.99,
--     'https://example.com/images/redmi_note_10.jpg'
--   ),
--   (
--     'OnePlus 9',
--     'The latest OnePlus with A14 Bionic chip and 5G support.',
--     729.99,
--     'https://example.com/images/oneplus9.jpg'
--   ),
--   (
--     'Google Pixel 5',
--     'The latest Google Pixel with A14 Bionic chip and 5G support.',
--     699.99,
--     'https://example.com/images/pixel5.jpg'
--   );

DELETE FROM products
WHERE id = 9;

UPDATE products
SET name = 'Sumsung A05s'
WHERE id = 2;

SELECT *
FROM products;
