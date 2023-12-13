DROP TABLE IF EXISTS `Serie`;

CREATE TABLE
    `Serie` (
        `id` int primary key auto_increment not null,
        `miniature` varchar(255) not null,
        `title` VARCHAR(50) not NULL,
        `videoUrl` VARCHAR(255) ,
        `duration` INT not NULL,
        `year` VARCHAR(4) not NULL,
        `description` VARCHAR(500) not NULL,
        `isAvailable` BOOLEAN not NULL,
        `episodesNumber` INT not NULL,
        `seasonsNumber` INT not NULL
    );

DROP TABLE IF EXISTS `User`;

CREATE TABLE
    `User` (
        `id` int primary key auto_increment not null,
        `name` varchar(50) not null,
        `email` varchar(50) not null,
        `naissance` DATETIME NOT NULL,
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
        `videoUrl` VARCHAR(255) ,
        `duration` INT not null,
        `year` VARCHAR(4) NOT NULL,
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
        `userId` INT NOT NULL,
        `filmId` INT NOT NULL,
        CONSTRAINT FK_Favori_Film_user_id FOREIGN KEY (`userId`) REFERENCES `User`(`id`),
        CONSTRAINT FK_Favori_Film_film_id FOREIGN KEY (`filmId`) REFERENCES `Film`(`id`),
        PRIMARY KEY(`userId`, `filmId`)
    );

DROP TABLE IF EXISTS `Favori_serie`;

CREATE TABLE
    `Favori_serie` (
        `userId` INT NOT NULL,
        `serieId` INT NOT NULL,
        CONSTRAINT FK_Favori_Serie_user_id FOREIGN KEY (`userId`) REFERENCES `User`(`id`),
        CONSTRAINT FK_Favori_Serie_serie_id FOREIGN KEY (`serieId`) REFERENCES `Serie`(`id`),
        PRIMARY KEY (`userId`, `serieId`)
    );

DROP TABLE IF EXISTS `En_tendance_film`;

CREATE TABLE
    `En_tendance_film` (
        `userId` INT NOT NULL,
        `filmId` INT NOT NULL,
        CONSTRAINT FK_En_tendance_Film_user_id FOREIGN KEY (`userId`) REFERENCES `User`(`id`),
        CONSTRAINT FK_En_tendance_Film_film_id FOREIGN KEY (`filmId`) REFERENCES `Film`(`id`),
        PRIMARY KEY (`userId`, `filmId`)
    );

DROP TABLE IF EXISTS ` En_tendance_serie`;

CREATE TABLE
    `En_tendance_serie` (
        `userId` INT NOT NULL,
        `serieId` INT NOT NULL,
        CONSTRAINT FK_En_tendance_Serie_user_id FOREIGN KEY (`userId`) REFERENCES `User`(`id`),
        CONSTRAINT FK_En_tendance_Serie_serie_id FOREIGN KEY (`serieId`) REFERENCES `Serie`(`id`),
        PRIMARY KEY (`userId`, `serieId`)
    );

DROP TABLE IF EXISTS `Commentaire_serie`;

CREATE TABLE
    `Commentaire_serie` (
        `userId` INT NOT NULL,
        `serieId` INT NOT NULL,
        CONSTRAINT FK_Commentaire_Serie_user_id FOREIGN KEY (`userId`) REFERENCES `User`(`id`),
        CONSTRAINT FK_Commentaire_serie_serie_id FOREIGN KEY (`serieId`) REFERENCES `Serie`(`id`),
        PRIMARY KEY (`userId`, `serieId`)
    );

DROP TABLE IF EXISTS `Commentaire_film`;

CREATE TABLE
    `Commentaire_film` (
        `userId` INT NOT NULL,
        `filmId` INT NOT NULL,
        CONSTRAINT FK_Commentaire_Film_user_id FOREIGN KEY (`userId`) REFERENCES `User`(`id`),
        CONSTRAINT FK_Commentaire_Film_film_id FOREIGN KEY (`filmId`) REFERENCES `Film`(`id`),
        PRIMARY KEY (`userId`, `filmId`)
    );

DROP TABLE IF EXISTS `Categorie_par_serie`;

CREATE TABLE
    `Categorie_par_serie` (
        `serieId` INT NOT NULL,
        `categorieId` INT NOT NULL,
        CONSTRAINT FK_Categorie_Par_Serie_serie_id FOREIGN KEY (`serieId`) REFERENCES `Serie`(`id`),
        CONSTRAINT FK_Categorie_Par_Serie_categorie_id FOREIGN KEY (`categorieId`) REFERENCES `Categorie`(`id`),
        PRIMARY KEY (`serieId`, `categorieId`)
    );

DROP TABLE IF EXISTS `Categorie_par_film`;

CREATE TABLE
    `Categorie_par_film` (
        `filmId` INT NOT NULL,
        `categorieId` INT NOT NULL,
        CONSTRAINT FK_Categorie_Par_Film_film_id FOREIGN KEY (`filmId`) REFERENCES `Film`(`id`),
        CONSTRAINT FK_Categorie_Par_Film_categorie_id FOREIGN KEY (`categorieId`) REFERENCES `Categorie`(`id`),
        PRIMARY KEY (`filmId`, `categorieId`)
    );
