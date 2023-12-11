create table serie (
  id int unsigned primary key auto_increment not null,
  miniature varchar(255) not null,
  title VARCHAR(50) not NULL,
  duration INT not NULL,
  release DATE not NULL,
  descripion VARCHAR(500) not NULL,
  is available BOOLEAN not NULL,
  episodes_number INT not NULL,
  seasons_number INT not NULL
);


create table Profil(
  id int primary key auto_increment not null,
  name varchar(50) not null,
  email varchar(50) not null,
  naissance DATE NOT NULL,
  civility BOOLEAN NOT NULL,
  password varchar(50) not null,
  is admin bool not null,
)

create table film(
  id int primary key auto_increment not null,
  miniature VARCHAR(255) not null,
  title VARCHAR(255) not null,
  duration INT not null,
  release DATE NOT NULL,
  description VARCHAR(500) not null,
  is available BOOLEAN NOT NULL,
)

CREATE TABLE categorie(
  id int primary key auto_increment not null,
  name VARCHAR(255) not null,
  position INT,
)