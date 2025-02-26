use ecommerce;

INSERT INTO products (name, price, description, image) VALUES
('Ethiopian Sunrise', 15.99, "A bright and fruity coffee with floral notes.", 'https://picsum.photos/id/20/300/200'),
('Colombian Gold', 12.99, "Smooth and balanced with a caramel finish.",'https://picsum.photos/id/1/300/200'),
('Sumatran Velvet', 17.99, "Bold and earthy with hints of dark chocolate",'https://picsum.photos/id/26/300/200'),
('Brazilian Bliss', 14.99, 'https://picsum.photos/id/96/300/200');

INSERT INTO marketing_preferences (id, preference) VALUES (1, 'email');  -- Email Marketing
INSERT INTO marketing_preferences (id, preference) VALUES (2, 'sms');    -- SMS Marketing



