DROP TABLE IF EXISTS `Serie`;

CREATE TABLE
    `Serie` (
        `id` int primary key auto_increment not null,
        `miniature` varchar(255) not null,
        `title` VARCHAR(50) not NULL,
        `videoUrl` VARCHAR(255) not null,
        `duration` INT not NULL,
        `year` DATE not NULL,
        `description` VARCHAR(500) not NULL,
        `IsAvailable` BOOLEAN not NULL,
        `EpisodesNumber` INT not NULL,
        `SeasonsNumber` INT not NULL
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
        `VideoUrl` VARCHAR(255) not null,
        `duration` INT not null,
        `year` DATE NOT NULL,
        `description` VARCHAR(500) not null,
        `IsAvailable` BOOLEAN NOT NULL
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

INSERT INTO 
    `Film` (`miniature`, `title`, `duration`, `year`, `description`, `is_available`)
VALUES
    (
        'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
        'Avengers: Endgame',
        181,
        '2019-04-24',
        'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.',
        1
    ),
    (
        'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg',
        'Avengers: Infinity War',
        149,
        '2018-04-25',
        'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
        0
    ),
    (
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
        'The Avengers',
        143,
        '2012-04-25',
        'Earth mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
        1
    ),
    (
        'https://static.wikia.nocookie.net/ironman/images/d/da/P170620_v_v8_ba.jpg/revision/latest?cb=20191202183622',
        'Iron man',
        126,
        '2008-04-30',
        'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
        0
    );

INSERT INTO
    `Categorie` (`name`, `position`)
VALUES
    ('Action', 1),
    ('Adventure', 2),
    ('Sci-Fi', 3),
    ('Drama', 4),
    ('Thriller', 5),
    ('Comedy', 6),
    ('Crime', 7),
    ('Fantasy', 8),
    ('Mystery', 9),
    ('Animation', 10),
    ('Family', 11),
    ('Biography', 12),
    ('History', 13),
    ('Horror', 14),
    ('Music', 15),
    ('Musical', 16),
    ('Romance', 17),
    ('Sport', 18),
    ('War', 19),
    ('Western', 20);
