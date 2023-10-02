--Creates a handful of users, titles, lists, and other mock information to help with development and testing

--Declare variables to store the generated UUIDs
DO $$ 
DECLARE 
    user1_id UUID;
    user2_id UUID;
    user3_id UUID;
    user4_id UUID;
    user5_id UUID;
    title1_id UUID;
    title2_id UUID;
    title3_id UUID;
    title4_id UUID;
    title5_id UUID;
    title6_id UUID;
    list1_id UUID;
    list2_id UUID;
    list3_id UUID;
    list4_id UUID;
    list5_id UUID;
    list6_id UUID;
BEGIN
    --Sample users
    INSERT INTO public.users (name_first, name_last, email) 
    VALUES
        ('Ibrahim', 'Moizoos', 'moizoos@utchat.edu')
    RETURNING id INTO user1_id;

    INSERT INTO public.users (name_first, name_last, email) 
    VALUES
        ('T.J.', 'Juckson', 'tj@waynestate.edu')
    RETURNING id INTO user2_id;

    INSERT INTO public.users (name_first, name_last, email) 
    VALUES
        ('Quatro', 'Quatro', '44@hotmail.com')
    RETURNING id INTO user3_id;

    INSERT INTO public.users (name_first, name_last, email) 
    VALUES
        ('Dan', 'Smith', 'dansmith111@gmail.com')
    RETURNING id INTO user4_id;

    INSERT INTO public.users (name_first, name_last, email) 
    VALUES
        ('Hingle', 'McCringleberry', 'mrmccringleberry69@psu.edu')
    RETURNING id INTO user5_id;

    --Sample titles
    INSERT INTO public.title (title, media_type_id) 
    VALUES
        ('Jonathan Strange & Mr. Norrell', 1)
    RETURNING id INTO title1_id;

    INSERT INTO public.title (title, media_type_id) 
    VALUES
        ('The Idiot', 1)
    RETURNING id INTO title2_id;

    INSERT INTO public.title (title, media_type_id) 
    VALUES
        ('The Lord of the Rings: The Two Towers', 1)
    RETURNING id INTO title3_id;

    INSERT INTO public.title (title, media_type_id) 
    VALUES
        ('The Lord of the Rings: The Two Towers', 2)
    RETURNING id INTO title4_id;

    INSERT INTO public.title (title, media_type_id) 
    VALUES
        ('Oppenheimer', 2)
    RETURNING id INTO title5_id;

    INSERT INTO public.title (title, media_type_id) 
    VALUES
        ('Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', 2)
    RETURNING id INTO title6_id;

    --Title External IDs
    INSERT INTO public.title_external_id (title_id, data_source_id, external_id) 
    VALUES
        (title1_id, 3, 'OL5703422W'),   -- Jonathan Strange & Mr. Norrell in Open Library
        (title2_id, 3, 'OL166973W'),    -- The Idiot in Open Library
        (title3_id, 3, 'OL28059906W'),  -- The Lord of the Rings: The Two Towers in Open Library
        (title4_id, 4, '121'),          -- The Lord of the Rings: The Two Towers in The Movie Database
        (title5_id, 4, '872585'),       -- Oppenheimer in The Movie Database
        (title6_id, 4, '935')           -- Dr. Strangelove in The Movie Database
    ON CONFLICT (title_id, data_source_id, external_id) DO NOTHING;

    --Lists
    INSERT INTO public.list (name, user_id) 
    VALUES
        ('Movies better than LotR', user2_id)
    RETURNING id INTO list1_id;

    INSERT INTO public.list (name, user_id) 
    VALUES
        ('Favorites', user2_id)
    RETURNING id INTO list2_id;

    INSERT INTO public.list (name, user_id) 
    VALUES
        ('Favorites', user3_id)
    RETURNING id INTO list3_id;

    INSERT INTO public.list (name, user_id) 
    VALUES
        ('Stuff to read/watch', user4_id)
    RETURNING id INTO list4_id;

    INSERT INTO public.list (name, user_id) 
    VALUES
        ('Summer 2023', user5_id)
    RETURNING id INTO list5_id;

    INSERT INTO public.list (name, user_id) 
    VALUES
        ('Next Up', user5_id)
    RETURNING id INTO list6_id;

    --List contents
    insert into list_title (list_id, title_id) values
    --List 1 is empty (and title 1 is in 0 lists)
    (list2_id, title2_id),
    (list2_id, title3_id),
    (list2_id, title4_id),
    (list2_id, title5_id),
    (list2_id, title6_id),
    (list3_id, title2_id),
    (list4_id, title3_id),
    (list4_id, title4_id),
    (list5_id, title5_id),
    (list5_id, title6_id),
    (list6_id, title3_id),
    (list6_id, title4_id);

    --Ratings
INSERT INTO public.user_title_rating (user_id, title_id, rating)
VALUES
    --Ratings for user 1
    --Ratings for user 2
    (user2_id, title1_id, 10),
    (user2_id, title2_id, 1),
    (user2_id, title3_id, 6),
    (user2_id, title4_id, 4),
    (user2_id, title5_id, 3),
    (user2_id, title6_id, 5),
    -- Ratings for user 3
    (user3_id, title1_id, 7),
    (user3_id, title2_id, 7),
    (user3_id, title3_id, 3),
    -- Ratings for user 4
    (user4_id, title4_id, 9),
    (user4_id, title5_id, 1),
    (user4_id, title6_id, 7),
    -- Ratings for user 5
    (user5_id, title6_id, 6);

END $$;