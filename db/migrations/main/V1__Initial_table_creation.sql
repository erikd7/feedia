--Users
create table if not exists public.users (
  	id bigserial not null primary key, --TODO: make this ULID or UUID v7, which will hopefully be native in postgres v17
	"name" varchar(50) not null
);

--Media types
create table if not exists public.media_type (
  	id bigserial not null primary key,
	key varchar(10)
);
--Media type static values
insert into public.media_type (key) values
('book'), ('movie');

--Titles
create table if not exists public.title (
  	id bigserial not null primary key, --TODO: make this ULID or UUID v7, which will hopefully be native in postgres v17
	title varchar(70),
	media_type_id int not null,
	foreign key (media_type_id) references media_type(id)
);

--External data sources
create table if not exists public.data_source (
  	id bigserial not null primary key,
	"name" varchar(20) not null
);
--External data static values
insert into public.data_source ("name") values
('Open Library'), ('The Movie Database');

--External ID maps
create table if not exists public.title_id (
	title_id int not null, --TODO: make this ULID or UUID v7, which will hopefully be native in postgres v17
	foreign key (title_id) references title(id),
	data_source_id int not null,
	foreign key (data_source_id) references data_source(id),
	external_id text not null,
    constraint title_ids_pkey primary key (title_id, data_source_id, external_id)
);

--User-Title Lists

--User next up list
create table if not exists public.user_title_next_up (
	title_id int not null, --TODO: make this ULID or UUID v7, which will hopefully be native in postgres v17
	foreign key (title_id) references title(id),
	user_id int not null, --TODO: make this ULID or UUID v7, which will hopefully be native in postgres v17
	foreign key (user_id) references users(id),
	ordinal int,
    constraint user_title_next_up_pkey primary key (title_id, user_id)
);