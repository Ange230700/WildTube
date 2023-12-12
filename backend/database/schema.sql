DROP TABLE IF EXISTS Serie;

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

DROP TABLE IF EXISTS User;
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

DROP TABLE IF EXISTS Film;
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
DROP TABLE IF EXISTS Categorie;
CREATE TABLE
    Categorie(
        id int primary key auto_increment not null,
        name VARCHAR(255) not null,
        position INT,
    )
DROP TABLE IF EXISTS Favori_film;
CREATE TABLE
    Favori_film(
        user_id INT NOT NULL,
        film_id INT NOT NULL,
        CONSTRAINT FK_Favori_User FOREIGN KEY (user_id) REFERENCES User(id),
        CONSTRAINT FK_Favori_Film FOREIGN KEY (Film_id) REFERENCES Film(id),
        PRIMARY KEY(user_id, film_id),
    )


DROP TABLE IF EXISTS Favori_serie;
CREATE TABLE
    Favori_serie(
        user_id INT NOT NULL,
        serie_id INT NOT NULL,
        CONSTRAINT FK_Favori_User FOREIGN KEY (user_id) REFERENCES User(id),
        CONSTRAINT FK_Favori_Serie FOREIGN KEY (serie_id) REFERENCES Serie(id),
        PRIMARY KEY (user_id, serie_id),
    )
DROP TABLE IF EXISTS En_tendance_film;
CREATE TABLE
    En_tendance_film(
        user_id INT NOT NULL,
        film_id INT NOT NULL,
        CONSTRAINT FK_En_tendance_user FOREIGN KEY (user_id) REFERENCES User(id),
        CONSTRAINT FK_En_tendance_film FOREIGN KEY (film_id) REFERENCES Film(id),
        PRIMARY KEY (user_id, film_id),
    )
DROP TABLE IF EXISTS En_tendance_serie;
CREATE TABLE
    En_tendance_serie(
        user_id INT NOT NULL,
        serie_id INT NOT NULL,
        CONSTRAINT FK_En_tendance_user FOREIGN KEY (user_id) REFERENCES User(id),
        CONSTRAINT FK_En_tendance_serie FOREIGN KEY (serie_id) REFERENCES Serie(id),
        PRIMARY KEY (user_id, serie_id),
    )
DROP TABLE IF EXISTS Commentaire_serie;
CREATE TABLE
    Commentaire_serie(
        user_id INT NOT NULL,
        serie_id INT NOT NULL,
        CONSTRAINT FK_Commentaire_user FOREIGN KEY (user_id) REFERENCES User(id),
        CONSTRAINT FK_Commentaire_serie FOREIGN KEY (serie_id) REFERENCES Serie(id),
        PRIMARY KEY (user_id, serie_id)
    )
DROP TABLE IF EXISTS Commentaire_film;
CREATE TABLE
    Commentaire_film(
        user_id INT NOT NULL,
        film_id INT NOT NULL,
        CONSTRAINT FK_Commentaire_user FOREIGN KEY (user_id) REFERENCES User(id),
        CONSTRAINT FK_Commentaire_film FOREIGN KEY (film_id) REFERENCES Film(id),
        PRIMARY KEY (user_id, film_id)
    )
DROP TABLE IF EXISTS Categorie_par_serie;
CREATE TABLE
    Categorie_par_serie(
        serie_id INT NOT NULL,
        categorie_id INT NOT NULL,
        CONSTRAINT FK_Categorie_par_serie FOREIGN KEY (serie_id) REFERENCES Serie(id),
        CONSTRAINT FK_Categorie_serie FOREIGN KEY (categorie_id) REFERENCES Categorie(id),
        PRIMARY KEY (serie_id, categorie_id)
    )
    DROP TABLE IF EXISTS Categorie_par_film;
CREATE TABLE
    Categorie_par_film(
        film_id INT NOT NULL,
        categorie_id INT NOT NULL,
        CONSTRAINT FK_Categorie_par_film FOREIGN KEY (film_id) REFERENCES Film(id),
        CONSTRAINT FK_Categorie_film FOREIGN KEY (categorie_id) REFERENCES Categorie(id),
        PRIMARY KEY (film_id, categorie_id)
    )