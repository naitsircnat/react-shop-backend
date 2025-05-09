use ecommerce;

INSERT INTO products (name, price, description, category, image) VALUES
('Ethiopian Sunrise', 15.99, "A bright and fruity coffee with floral notes.", "coffee", 'products/coffee/sunrise.jpg'),
('Colombian Gold', 12.99, "Smooth and balanced with a caramel finish.", "coffee", 'products/coffee/gold.jpg'),
('Sumatran Velvet', 17.99, "Bold and earthy with hints of dark chocolate", "coffee", 'products/coffee/velvet.jpg'),
('Brazilian Bliss', 14.99, "Rich, delicious and nutty with a creamy body.", "coffee", 'products/coffee/bliss.jpg'),
('Kenyan Dawn', 16.49, "Vibrant and juicy with notes of blackcurrant and citrus.", "coffee", 'products/coffee/dawn.jpg'),
('Guatemalan Reserve', 13.99, "Sweet and smooth with hints of cocoa and spice.", "coffee", 'products/coffee/reserve.jpg'),
('Costa Rican Cloud', 15.49, "Bright acidity with a clean, honeyed finish.", "coffee", 'products/coffee/cloud.jpg'),
('Rwandan Mist', 16.99, "Delicate floral aroma with subtle berry undertones.", "coffee", 'products/coffee/mist.jpg'),
('Darjeeling Delight', 12.99, "A light and floral black tea with muscatel notes.", "tea", 'products/tea/delight.jpg'),
('Matcha Harmony', 19.99, "A rich and umami-filled Japanese green tea powder.", "tea", 'products/tea/matcha.jpg'),
('Earl Grey Elegance', 10.99, "A fragrant black tea infused with bergamot citrus.", "tea", 'products/tea/earl-grey.jpg'),
('Jasmine Serenity', 14.99, "A soothing green tea scented with jasmine blossoms.", "tea", 'products/tea/serenity.jpg'),
('Oolong Whisper', 13.49, "A smooth and floral tea with hints of honey and orchid.", "tea", 'products/tea/oolong.jpg'),
('Chamomile Calm', 11.99, "A gentle herbal infusion known for its relaxing qualities.", "tea", 'products/tea/chamomile.jpg'),
('Sencha Breeze', 15.49, "A fresh and grassy Japanese green tea with mild sweetness.", "tea", 'products/tea/sencha.jpg'),
('Hibiscus Bloom', 12.49, "A tart and vibrant herbal tea with a deep crimson hue.", "tea", 'products/tea/hibiscus.jpg')
;

INSERT INTO marketing_preferences (id, preference) VALUES (1, 'email');  -- Email Marketing
INSERT INTO marketing_preferences (id, preference) VALUES (2, 'sms');    -- SMS Marketing



