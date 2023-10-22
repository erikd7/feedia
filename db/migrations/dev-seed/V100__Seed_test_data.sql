--Creates a handful of users, titles, lists, and other mock information to help with development and testing

--Declare variables to store the generated UUIDs
DO $$ 
DECLARE 
    user0_id UUID = '018b4ffc-a11e-db48-384d-32ebda9426a4';
    user1_id UUID = '018b54dd-766a-ff85-312b-b2db39d83c48';
    user2_id UUID = '018b54dd-766a-a076-98d9-15b79a8bdff8';
    user3_id UUID = '018b54dd-766a-dc24-773f-2cb66f1cd2e3';
    user4_id UUID = '018b54dd-766b-4111-b117-0d90f7083526';
    user5_id UUID = '018b54dd-766b-39c6-78dd-4e0414096212';
    title1_id UUID = '018b54dd-766b-b3fe-c8ad-ee3b6fd9b917';
    title2_id UUID = '018b54dd-766b-389d-f53d-90dc0c51ad7c';
    title3_id UUID = '018b54dd-766b-bc6e-acd5-29438069a5ec';
    title4_id UUID = '018b54dd-766b-ea75-370d-12d281ca56b4';
    title5_id UUID = '018b54dd-766b-c6ab-d51a-5ecbcca53d01';
    title6_id UUID = '018b54dd-766b-9d24-b577-9747e12128b3';
    list1_id UUID = '018b54dd-766c-23a1-abec-79ad7694b9a5';
    list2_id UUID = '018b54dd-766c-c1a9-66b0-c93b857ca35f';
    list3_id UUID = '018b54dd-766d-48bf-27b9-cd7a2e81e39c';
    list4_id UUID = '018b54dd-766d-3115-35a8-170f9c6384f6';
    list5_id UUID = '018b54dd-766d-9e8e-0d64-73d590709426';
    list6_id UUID = '018b54dd-766d-af09-7d98-0fb334e8ea46';
    list7_id UUID = '018b54dd-df75-51ad-4e60-27f79f60c12d';
BEGIN
    --Sample users
    insert into public.users (id, name_first, name_last, email, photo_url) values
        (user0_id, 'Erik', 'Dietrich', 'erik@fakeemail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKyRXc_fXK6n8N4Pl-n7xQ1b9R-qYl8uKlQq4N6gSfT4W0=s96-c'),
        (user1_id, 'Ibrahim', 'Moizoos', 'moizoos@utchat.edu', null),
        (user2_id, 'T.J.', 'Juckson', 'tj@waynestate.edu', null),
        (user3_id, 'Quatro', 'Quatro', '44@hotmail.com', null),
        (user4_id, 'Dan', 'Smith', 'dansmith111@gmail.com', null),
        (user5_id, 'Hingle', 'McCringleberry', 'mrmccringleberry69@psu.edu', null);

    --Sample titles
    insert into public.title (id, title, media_type_id) values
        (title1_id, 'Jonathan Strange & Mr. Norrell', 1),
        (title2_id, 'The Idiot', 1),
        (title3_id, 'The Lord of the Rings: The Two Towers', 1),
        (title4_id, 'The Lord of the Rings: The Two Towers', 2),
        (title5_id, 'Oppenheimer', 2),
        (title6_id, 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', 2);

    --Title External IDs
    insert into public.title_external_id (title_id, data_source_id, external_id) values
        (title1_id, 3, 'OL8054238M'),   -- Jonathan Strange & Mr. Norrell in Open Library
        (title2_id, 3, 'OL6974856M'),    -- The Idiot in Open Library
        (title3_id, 3, 'OL26446259M'),  -- The Lord of the Rings: The Two Towers in Open Library
        (title4_id, 4, '121'),          -- The Lord of the Rings: The Two Towers in The Movie Database
        (title5_id, 4, '872585'),       -- Oppenheimer in The Movie Database
        (title6_id, 4, '935')           -- Dr. Strangelove in The Movie Database
    on conflict (title_id, data_source_id, external_id) do nothing;

    --Title metadata
    insert into public.title_meta (title_id, meta) values
        (title1_id, '{"imagePath": ""}'),                                   -- Jonathan Strange & Mr. Norrell
        (title2_id, '{"imagePath": ""}'),                                   -- The Idiot
        (title3_id, '{"imagePath": ""}'),                                   -- The Two Towers
        (title4_id, '{"imagePath": "/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg"}'),   -- The Two Towers
        (title5_id, '{"imagePath": "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"}'),   -- Oppenheimer
        (title6_id, '{"imagePath": "/gHm96BRW4GoI339rF1vYoYTB6Qe.jpg"}')    -- Dr. Strangelove
    on conflict (title_id) do nothing; 

    --Lists
    insert into public.list (id, name, user_id) values
        (list1_id, 'Movies better than LotR', user2_id),
        (list2_id, 'Favorites', user2_id),
        (list3_id, 'Favorites', user3_id),
        (list4_id, 'Stuff to read/watch', user4_id),
        (list5_id, 'Summer 2023', user5_id),
        (list6_id, 'Next Up', user5_id),
        (list7_id, 'Erik''s Main List', user0_id);

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
        (list7_id, title4_id),
        (list7_id, title3_id),
        (list7_id, title5_id),
        (list7_id, title6_id),
        (list7_id, title1_id),
        (list7_id, title2_id);

    --Ratings
    insert into public.user_title_rating (user_id, title_id, rating) values
        --Ratings for user 0
        (user0_id, title1_id, 8),
        (user0_id, title2_id, 10),
        (user0_id, title3_id, 2),
        (user0_id, title4_id, 5),
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