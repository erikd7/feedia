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
    ((select id from title where title = 'Jonathan Strange & Mr. Norrell' and media_type_id = 1), 3, 'OL5703422W'),   -- Jonathan Strange & Mr. Norrell in Open Library
    ((select id from title where title = 'The Idiot' and media_type_id = 1), 3, 'OL166973W'),    -- The Idiot in Open Library
    ((select id from title where title = 'The Lord of the Rings: The Two Towers' and media_type_id = 1), 3, 'OL28059906W'),  -- The Lord of the Rings: The Two Towers in Open Library
-- for movies (media type_id = 2)
    ((select id from title where title = 'The Lord of the Rings: The Two Towers' and media_type_id = 2), 4, '121'),      -- The Lord of the Rings: The Two Towers in The Movie Database
    ((select id from title where title = 'Oppenheimer' and media_type_id = 2), 4, '872585'),   -- Oppenheimer in The Movie Database
    ((select id from title where title = 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb' and media_type_id = 2), 4, '935')       -- Dr. Strangelove in The Movie Database
    on conflict (title_id, data_source_id, external_id) do nothing;

--user next up lists
insert into public.user_title_next_up (title_id, user_id, ordinal) values
-- User 1: Ibrahim Moizoos (Zero titles in the list)
-- User 2: T.J. Juckson (One title in the list)
    ((select id from title where title = 'Jonathan Strange & Mr. Norrell' and media_type_id = 1), (select id from users where name_last = 'Moizoos'), 1),  -- T.J. Juckson's next up list: Jonathan Strange & Mr. Norrell
-- User 3: Quatro Quatro (Several titles in the list)
((select id from title where title = 'The Idiot' and media_type_id = 1), (select id from users where name_last = 'Quatro'), 1),  -- Quatro Quatro's next up list: The Idiot
    ((select id from title where title = 'The Lord of the Rings: The Two Towers' and media_type_id = 1), (select id from users where name_last = 'Quatro'), 2),  -- Quatro Quatro's next up list: The Lord of the Rings: The Two Towers (Book)
    ((select id from title where title = 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb' and media_type_id = 2), (select id from users where name_last = 'Quatro'), 3),  -- Quatro Quatro's next up list: Dr. Strangelove
-- User 4: Dan Smith (Several titles in the list)
    ((select id from title where title = 'Jonathan Strange & Mr. Norrell' and media_type_id = 1), (select id from users where name_last = 'Smith'), 1),  -- Dan Smith's next up list: Jonathan Strange & Mr. Norrell
    ((select id from title where title = 'The Lord of the Rings: The Two Towers' and media_type_id = 2), (select id from users where name_last = 'Smith'), 2),  -- Dan Smith's next up list: The Lord of the Rings: The Two Towers (Movie)
    ((select id from title where title = 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb' and media_type_id = 2), (select id from users where name_last = 'Smith'), 3),  -- Dan Smith's next up list: Dr. Strangelove
-- User 5: Hingle McCringleberry (Several titles in the list)
    ((select id from title where title = 'The Idiot' and media_type_id = 1), (select id from users where name_last = 'McCringleberry'), 1),  -- Hingle McCringleberry's next up list: The Idiot
    ((select id from title where title = 'The Lord of the Rings: The Two Towers' and media_type_id = 2), (select id from users where name_last = 'McCringleberry'), 2),  -- Hingle McCringleberry's next up list: The Lord of the Rings: The Two Towers (Movie)
    ((select id from title where title = 'Oppenheimer' and media_type_id = 2), (select id from users where name_last = 'McCringleberry'), 3),  -- Hingle McCringleberry's next up list: Oppenheimer
    ((select id from title where title = 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb' and media_type_id = 2), (select id from users where name_last = 'McCringleberry'), 4)   -- Hingle McCringleberry's next up list: Dr. Strangelove
    on conflict (title_id, user_id) do nothing;
