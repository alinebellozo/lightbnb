INSERT INTO users (name, email, password)
VALUES ('Lorelai Gilmore', 'lorelaigilmore@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Cristina Yang', 'cristinayang@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ted Lasso', 'tedlasso@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (5, 'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930.61, 4, 3, 5, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', 28142, true),
(6, 'Blank Corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 1020.50, 6, 5, 8, 'Canada', '1234 Kingsway', 'Burnaby', 'British Columbia', 'V4K 0F3', true),
(7, 'Habit Mix', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 680.20, 8, 7, 10, 'Canada', '5678 Main Street', 'Vancouver', 'British Columbia', 'A1A 0V0', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2016-12-08', '2016-12-20', 14, 5),
('2019-01-04', '2019-02-01', 15, 6),
('2022-10-01', '2022-10-18', 16, 7);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (5, 14, 16, 4, 'messages'),
(6, 15, 17, 5, 'messages'),
(7, 16, 18, 3, 'messages');