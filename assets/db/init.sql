create extension if not exists "uuid-ossp";

create table social_media (
    id UUID,
    github text,
    linkedin text,
    pwebsite text,

    primary key (id)
);

create table members (
    id UUID not null,
    first_name text not null,
    last_name text not null,
    role text not null,
    social_media UUID,

    primary key (id),
    foreign key (social_media) references social_media (id)
);

insert into members (id, first_name, last_name, role)
values (uuid_generate_v4(), 'Alexander', 'Goussas', 'President'),
       (uuid_generate_v4(), 'Alina', 'Carpio', 'Secretary'),
       (uuid_generate_v4(), 'Joangie', 'Marquez', 'Vice-president'),
       (uuid_generate_v4(), 'Yiam', 'Rodriguez', 'Member');

create table events (
    id UUID not null,
    name text not null,
    kind text not null,
    eventStart timestamp not null,
    eventEnd timestamp not null,
    price decimal,

    primary key (id)
);

create table projects (
    id UUID not null,
    name text not null,
    area text not null,
    description text not null,
    github text not null,

    primary key (id)
);

insert into events (id, name, kind, eventStart, eventEnd)
values (uuid_generate_v4(), 'CLI Week', 'HACKATHON', now(), now());

insert into projects(id, name, area, description, github) 
values (uuid_generate_v4(), 'Club Website', 'WEB', 'Página web del club', 'https://github.com/kokoaespol/Chocolatada');