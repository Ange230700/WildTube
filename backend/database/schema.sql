DROP TABLE IF EXISTS `Avatar`;

CREATE TABLE
    `Avatar` (
        `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `avatar_url` VARCHAR(255),
        `avatar_filename` VARCHAR(255)
    );

DROP TABLE IF EXISTS `Film`;

CREATE TABLE
    `Film` (
        `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `miniature_url` VARCHAR(255) DEFAULT NULL,
        `miniature_filename` VARCHAR(255) DEFAULT NULL,
        `cover_url` VARCHAR(255) DEFAULT NULL,
        `cover_filename` VARCHAR(255) DEFAULT NULL,
        `title` VARCHAR(255) NOT NULL,
        `videoUrl` VARCHAR(255) NOT NULL,
        `duration` INT NOT NULL,
        `year` VARCHAR(4) NOT NULL,
        `description` VARCHAR(700) NOT NULL,
        `IsAvailable` BOOLEAN NOT NULL
    );

DROP TABLE IF EXISTS `Categorie`;

CREATE TABLE
    `Categorie` (
        `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `name` VARCHAR(255) NOT NULL
    );

DROP TABLE IF EXISTS `User`;

CREATE TABLE
    `User` (
        `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `name` VARCHAR(50) NOT NULL,
        `email` VARCHAR(50) NOT NULL,
        `naissance` DATE NOT NULL,
        `civility` BOOLEAN NOT NULL,
        `hashed_password` VARCHAR(150) NOT NULL,
        `IsAdmin` BOOLEAN NOT NULL DEFAULT 0,
        `avatarId` INT NOT NULL,
        CONSTRAINT FK_User_avatar_id FOREIGN KEY (`avatarId`) REFERENCES `Avatar` (`id`)
    );

-- Join tables

DROP TABLE IF EXISTS `Categorie_par_film`;

CREATE TABLE
    `Categorie_par_film` (
        `filmId` INT NOT NULL,
        `categorieId` INT NOT NULL,
        `unique_key` VARCHAR(255) NOT NULL,
        CONSTRAINT FK_Categorie_Par_Film_film_id FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`) ON DELETE CASCADE,
        CONSTRAINT FK_Categorie_Par_Film_categorie_id FOREIGN KEY (`categorieId`) REFERENCES `Categorie` (`id`) ON DELETE CASCADE,
        PRIMARY KEY (`filmId`, `categorieId`)
    );

DROP TABLE IF EXISTS `Commentaire_film`;

CREATE TABLE `Commentaire_film` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `userId` INT NOT NULL,
    `filmId` INT NOT NULL,
    `avatarId` INT NOT NULL,
    `content` VARCHAR(500) NOT NULL,
    `date` DATETIME NOT NULL,
    `unique_key` VARCHAR(350) NOT NULL DEFAULT '',
    CONSTRAINT FK_Commentaire_Film_user_id FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
    CONSTRAINT FK_Commentaire_Film_film_id FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`) ON DELETE CASCADE,
    CONSTRAINT FK_Commentaire_Film_avatar_id FOREIGN KEY (`avatarId`) REFERENCES `Avatar` (`id`)
);

DROP TABLE IF EXISTS `Watchlist`;

CREATE TABLE
    `Watchlist` (
        `userId` INT NOT NULL,
        `filmId` INT NOT NULL,
        `unique_key` VARCHAR(255) NOT NULL,
        CONSTRAINT FK_Watchlist_user_id FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
        CONSTRAINT FK_Watchlist_film_id FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`) ON DELETE CASCADE,
        PRIMARY KEY (`userId`, `filmId`)
    );

DROP TABLE IF EXISTS `Favori_film`;

CREATE TABLE
    `Favori_film` (
        `userId` INT NOT NULL,
        `filmId` INT NOT NULL,
        `unique_key` VARCHAR(255) NOT NULL,
        CONSTRAINT FK_Favori_Film_user_id FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
        CONSTRAINT FK_Favori_Film_film_id FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`) ON DELETE CASCADE,
        PRIMARY KEY (`userId`, `filmId`)
    );
