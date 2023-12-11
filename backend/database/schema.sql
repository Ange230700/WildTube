create table
    Serie (
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

create table
    User(
        id int primary key auto_increment not null,
        name varchar(50) not null,
        email varchar(50) not null,
        naissance DATE NOT NULL,
        civility BOOLEAN NOT NULL,
        password varchar(50) not null,
        is admin bool not null,
    )

create table
    Film(
        id int primary key auto_increment not null,
        miniature VARCHAR(255) not null,
        title VARCHAR(255) not null,
        duration INT not null,
        release DATE NOT NULL,
        description VARCHAR(500) not null,
        is available BOOLEAN NOT NULL,
    )

CREATE TABLE
    Categorie(
        id int primary key auto_increment not null,
        name VARCHAR(255) not null,
        position INT,
    )

CREATE TABLE
    Favori_film(
        user_id INT not null,
        film_id INT not null,
        CONSTRAINT FK_Favori_User FOREIGN KEY (user_id) REFERENCES User(id),
        CONSTRAINT FK_Favori_Film FOREIGN KEY (Film_id) REFERENCES Film(id),
        PRIMARY KEY(user_id, film_id),
)