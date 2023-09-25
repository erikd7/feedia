--External data sources
create table if not exists data_source (
  	id bigserial not null primary key,
    key varchar(20) not null,
	"name" varchar(20) not null
);
--External data static values
insert into public.data_source (key, "name") values
('INTERNAL', 'Internal'), ('GOOGLE', 'Google'), ('OPENLIBRARY', 'Open Library'), ('TMDB', 'The Movie Database');

--Users
create table if not exists public.users (
  	id UUID not null primary key default generate_ulid(),
	"name_first" varchar(20) not null,
	"name_last" varchar(30) null,
	email varchar(255) not null unique,
    data_source_id int not null default 1, --Defaults to Internal data
	foreign key (data_source_id) references public.data_source(id),
    external_id text null,
    constraint data_source_external_id_unique unique (data_source_id, external_id),
	photo_url text null
);

--Media types
create table if not exists public.media_type (
  	id bigserial not null primary key,
	key varchar(10)
);
--Media type static values
insert into public.media_type (key) values
('BOOK'), ('MOVIE');

--Titles
create table if not exists public.title (
  	id UUID not null primary key default generate_ulid(),
	title varchar(70),
	media_type_id int not null,
	foreign key (media_type_id) references media_type(id)
);

--External ID maps
create table if not exists public.title_external_id (
	title_id UUID not null,
	foreign key (title_id) references title(id),
	data_source_id int not null,
	foreign key (data_source_id) references data_source(id),
	external_id text not null,
    constraint title_ids_pkey primary key (title_id, data_source_id, external_id)
);

--User-Title Lists

--User next up list
create table if not exists public.user_title_next_up (
	title_id UUID not null,
	foreign key (title_id) references title(id),
	user_id UUID not null,
	foreign key (user_id) references users(id),
	ordinal int,
    constraint user_title_next_up_pkey primary key (title_id, user_id)
);
