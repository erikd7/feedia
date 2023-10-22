--Title ratings
create or replace view v_title_rating as
    select
        title_id "id",
        round(avg(utr_all.rating), 1)::float rating,
        count(utr_all.rating)::integer ratings
      from user_title_rating utr_all
      group by utr_all.title_id;

--Title basic
create or replace view v_title_base as
    select
        t.id,
        t.title,
        mt.key "mediaType",
        ds."key" "dataSource",
        tei.external_id "externalId",
        tr.rating,
        tr.ratings
    from title t 
    join media_type mt on mt.id = t.media_type_id
    left join title_external_id tei on tei.title_id = t.id
    join data_source ds on ds.id = tei.data_source_id 
    left join v_title_rating tr on tr.id = t.id;

--Title meta
create or replace view v_title_meta as
    select
        t.*, tm.meta
    from v_title_base t 
    left join title_meta tm on tm.title_id = t.id;

--Lists (multiple) view
create or replace view v_lists as
    select id, "name", user_id "userId"
    from list;

--List (singular) view
create or replace view v_list as
    select id, "name", user_id "userId"
    from list;