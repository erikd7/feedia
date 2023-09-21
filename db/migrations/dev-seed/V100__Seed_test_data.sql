--sample users
insert into public.users (name_first, name_last, email) values
    ('Ibrahim', 'Moizoos', 'moizoos@utchat.edu'),
    ('T.J.', 'Juckson', 'tj@waynestate.edu'),
    ('Quatro', 'Quatro', '44@hotmail.com'),
    ('Dan', 'Smith', 'dansmith111@gmail.com'),
    ('Hingle', 'McCringleberry', 'mrmccringleberry69@psu.edu');

--sample titles
insert into public.title (title, media_type_id) values
    ('Jonathan Strange & Mr. Norrell', 1),          -- Book
    ('The Idiot', 1),                               -- Book
    ('The Lord of the Rings: The Two Towers', 1),   -- Book
    ('The Lord of the Rings: The Two Towers', 2),   -- Movie
    ('Oppenheimer', 2),                             -- Movie
    ('Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', 2);  -- Movie
    
--external IDs
insert into public.title_external_id (title_id, data_source_id, external_id) values
-- for books (media type_id = 1)
    (1, 3, 'OL5703422W'),   -- Jonathan Strange & Mr. Norrell in Open Library
    (2, 3, 'OL166973W'),    -- The Idiot in Open Library
    (3, 3, 'OL28059906W'),  -- The Lord of the Rings: The Two Towers in Open Library
-- for movies (media type_id = 2)
    (4, 4, '121'),      -- The Lord of the Rings: The Two Towers in The Movie Database
    (5, 4, '872585'),   -- Oppenheimer in The Movie Database
    (6, 4, '935')       -- Dr. Strangelove in The Movie Database
    on conflict (title_id, data_source_id, external_id) do nothing;

--user next up lists
insert into public.user_title_next_up (title_id, user_id, ordinal) values
-- User 1: Ibrahim Moizoos (Zero titles in the list)
-- User 2: T.J. Juckson (One title in the list)
    (1, 2, 1),  -- T.J. Juckson's next up list: Jonathan Strange & Mr. Norrell
-- User 3: Quatro Quatro (Several titles in the list)
    (2, 3, 1),  -- Quatro Quatro's next up list: The Idiot
    (3, 3, 2),  -- Quatro Quatro's next up list: The Lord of the Rings: The Two Towers (Book)
    (6, 3, 3),  -- Quatro Quatro's next up list: Dr. Strangelove
-- User 4: Dan Smith (Several titles in the list)
    (1, 4, 1),  -- Dan Smith's next up list: Jonathan Strange & Mr. Norrell
    (4, 4, 2),  -- Dan Smith's next up list: The Lord of the Rings: The Two Towers (Movie)
    (6, 4, 3),  -- Dan Smith's next up list: Dr. Strangelove
-- User 5: Hingle McCringleberry (Several titles in the list)
    (2, 5, 1),  -- Hingle McCringleberry's next up list: The Idiot
    (4, 5, 2),  -- Hingle McCringleberry's next up list: The Lord of the Rings: The Two Towers (Movie)
    (5, 5, 3),  -- Hingle McCringleberry's next up list: Oppenheimer
    (6, 5, 4)   -- Hingle McCringleberry's next up list: Dr. Strangelove
    on conflict (title_id, user_id) do nothing;
