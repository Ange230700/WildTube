create table serie (
  id int unsigned primary key auto_increment not null,
  miniature varchar(100) not null,
  title VARCHAR(50) not NULL,
  duration INT not NULL,
  release DATE not NULL,
  descripion VARCHAR(500) not NULL,
  is available BOOLEAN not NULL,
  episodes_number INT not NULL,
  seasons_number INT not NULL
);
