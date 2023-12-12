DROP TABLE IF EXISTS `Serie`;

CREATE TABLE
    `Serie` (
        `id` int primary key auto_increment not null,
        `miniature` varchar(255) not null,
        `title` VARCHAR(50) not NULL,
        `duration` INT not NULL,
        `year` DATE not NULL,
        `descripion` VARCHAR(500) not NULL,
        `is_vailable` BOOLEAN not NULL,
        `episodes_number` INT not NULL,
        `seasons_number` INT not NULL
    );

DROP TABLE IF EXISTS `User`;

CREATE TABLE
    `User` (
        `id` int primary key auto_increment not null,
        `name` varchar(50) not null,
        `email` varchar(50) not null,
        `naissance` DATE NOT NULL,
        `civility` BOOLEAN NOT NULL,
        `password` varchar(50) not null,
        `IsAdmin` bool not null
    );

DROP TABLE IF EXISTS `Film`;

CREATE TABLE
    `Film` (
        `id` int primary key auto_increment not null,
        `miniature` VARCHAR(255) not null,
        `title` VARCHAR(255) not null,
        `duration` INT not null,
        `year` DATE NOT NULL,
        `description` VARCHAR(500) not null,
        `is_available` BOOLEAN NOT NULL
    );

DROP TABLE IF EXISTS `Categorie`;

CREATE TABLE
    `Categorie` (
        `id` int primary key auto_increment not null,
        `name` VARCHAR(255) not null,
        `position` INT
    );

DROP TABLE IF EXISTS `Favori_film`;

CREATE TABLE
    `Favori_film` (
        `user_id` INT NOT NULL,
        `film_id` INT NOT NULL,
        CONSTRAINT FK_Favori_Film_user_id FOREIGN KEY (`user_id`) REFERENCES `User`(`id`),
        CONSTRAINT FK_Favori_Film_film_id FOREIGN KEY (`film_id`) REFERENCES `Film`(`id`),
        PRIMARY KEY(`user_id`, `film_id`)
    );

DROP TABLE IF EXISTS `Favori_serie`;

CREATE TABLE
    `Favori_serie` (
        `user_id` INT NOT NULL,
        `serie_id` INT NOT NULL,
        CONSTRAINT FK_Favori_Serie_user_id FOREIGN KEY (`user_id`) REFERENCES `User`(`id`),
        CONSTRAINT FK_Favori_Serie_serie_id FOREIGN KEY (`serie_id`) REFERENCES `Serie`(`id`),
        PRIMARY KEY (`user_id`, `serie_id`)
    );

DROP TABLE IF EXISTS `En_tendance_film`;

CREATE TABLE
    `En_tendance_film` (
        `user_id` INT NOT NULL,
        `film_id` INT NOT NULL,
        CONSTRAINT FK_En_tendance_Film_user_id FOREIGN KEY (`user_id`) REFERENCES `User`(`id`),
        CONSTRAINT FK_En_tendance_Film_film_id FOREIGN KEY (`film_id`) REFERENCES `Film`(`id`),
        PRIMARY KEY (`user_id`, `film_id`)
    );

DROP TABLE IF EXISTS ` En_tendance_serie`;

CREATE TABLE
    `En_tendance_serie` (
        `user_id` INT NOT NULL,
        `serie_id` INT NOT NULL,
        CONSTRAINT FK_En_tendance_Serie_user_id FOREIGN KEY (`user_id`) REFERENCES `User`(`id`),
        CONSTRAINT FK_En_tendance_Serie_serie_id FOREIGN KEY (`serie_id`) REFERENCES `Serie`(`id`),
        PRIMARY KEY (`user_id`, `serie_id`)
    );

DROP TABLE IF EXISTS `Commentaire_serie`;

CREATE TABLE
    `Commentaire_serie` (
        `user_id` INT NOT NULL,
        `serie_id` INT NOT NULL,
        CONSTRAINT FK_Commentaire_Serie_user_id FOREIGN KEY (`user_id`) REFERENCES `User`(`id`),
        CONSTRAINT FK_Commentaire_serie_serie_id FOREIGN KEY (`serie_id`) REFERENCES `Serie`(`id`),
        PRIMARY KEY (`user_id`, `serie_id`)
    );

DROP TABLE IF EXISTS `Commentaire_film`;

CREATE TABLE
    `Commentaire_film` (
        `user_id` INT NOT NULL,
        `film_id` INT NOT NULL,
        CONSTRAINT FK_Commentaire_Film_user_id FOREIGN KEY (`user_id`) REFERENCES `User`(`id`),
        CONSTRAINT FK_Commentaire_Film_film_id FOREIGN KEY (`film_id`) REFERENCES `Film`(`id`),
        PRIMARY KEY (`user_id`, `film_id`)
    );

DROP TABLE IF EXISTS `Categorie_par_serie`;

CREATE TABLE
    `Categorie_par_serie` (
        `serie_id` INT NOT NULL,
        `categorie_id` INT NOT NULL,
        CONSTRAINT FK_Categorie_Par_Serie_serie_id FOREIGN KEY (`serie_id`) REFERENCES `Serie`(`id`),
        CONSTRAINT FK_Categorie_Par_Serie_categorie_id FOREIGN KEY (`categorie_id`) REFERENCES `Categorie`(`id`),
        PRIMARY KEY (`serie_id`, `categorie_id`)
    );

DROP TABLE IF EXISTS `Categorie_par_film`;

CREATE TABLE
    `Categorie_par_film` (
        `film_id` INT NOT NULL,
        `categorie_id` INT NOT NULL,
        CONSTRAINT FK_Categorie_Par_Film_film_id FOREIGN KEY (`film_id`) REFERENCES `Film`(`id`),
        CONSTRAINT FK_Categorie_Par_Film_categorie_id FOREIGN KEY (`categorie_id`) REFERENCES `Categorie`(`id`),
        PRIMARY KEY (`film_id`, `categorie_id`)
    );