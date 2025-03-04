use ecommerce;

INSERT INTO products (name, price, description, image) VALUES
('Ethiopian Sunrise', 15.99, "A bright and fruity coffee with floral notes.", "coffee", 'https://picsum.photos/id/20/300/200'),
('Colombian Gold', 12.99, "Smooth and balanced with a caramel finish.", "coffee", 'https://picsum.photos/id/1/300/200'),
('Sumatran Velvet', 17.99, "Bold and earthy with hints of dark chocolate", "coffee", 'https://picsum.photos/id/26/300/200'),
('Brazilian Bliss', 14.99, "Rich and nutty with a creamy body.", "coffee", 'https://picsum.photos/id/96/300/200');
('Darjeeling Delight', 12.99, "A light and floral black tea with muscatel notes.", "tea", 'https://picsum.photos/id/30/300/200'),
('Matcha Harmony', 19.99, "A rich and umami-filled Japanese green tea powder.", "tea", 'https://picsum.photos/id/45/300/200'),
('Earl Grey Elegance', 10.99, "A fragrant black tea infused with bergamot citrus.", "tea", 'https://picsum.photos/id/68/300/200'),
('Jasmine Serenity', 14.99, "A soothing green tea scented with jasmine blossoms.", "tea", 'https://picsum.photos/id/75/300/200');

INSERT INTO marketing_preferences (id, preference) VALUES (1, 'email');  -- Email Marketing
INSERT INTO marketing_preferences (id, preference) VALUES (2, 'sms');    -- SMS Marketing



