DROP TABLE IF EXISTS `Serie`;

CREATE TABLE
    `Serie` (
        `id` int primary key auto_increment not null,
        `miniature` varchar(255) not null,
        `title` VARCHAR(50) not NULL,
        `videoUrl` VARCHAR(255),
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
        `videoUrl` VARCHAR(255),
        `duration` INT not null,
        `year` VARCHAR(4) NOT NULL,
        `description` VARCHAR(700) not null,
        `IsAvailable` BOOLEAN NOT NULL
    );

INSERT INTO
    `Film` (
        `miniature`,
        `title`,
        `videoUrl`,
        `duration`,
        `year`,
        `description`,
        `IsAvailable`
    )
VALUES (
        "https://m.media-amazon.com/images/M/MV5BMTkxM2FiYjctYjliYy00NjY2LWFmOTEtMWZiYWRjNjA4MGYxXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        "Aquaman and the Lost Kingdom",
        "https://www.youtube.com/watch?v=2wcj6SrX4zw",
        120,
        "2023",
        "The film is directed by James Wan from a screenplay written by David Leslie Johnson-McGoldrick and Will Beall and stars Jason Momoa as Aquaman, alongside Amber Heard, Patrick Wilson, Dolph Lundgren, Yahya Abdul-Mateen II, and Temuera Morrison. In the film, Aquaman must save the world from the threat of Ocean Master and Black Manta.",
        1
    ), (
        "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/72/2297/22197/123544/xBckjuirX08J68hRmi7_Zgv4jhFeC3AbYX8REOHE770.jpeg/xBckjuirX08J68hRmi7_Zgv4jhFeC3AbYX8REOHE770.jpeg",
        "The Batman",
        "https://www.youtube.com/watch?v=mqqft2x_Aa4",
        120,
        "2022",
        "The film is directed by Matt Reeves, who wrote the screenplay with Peter Craig. It stars Robert Pattinson as Bruce Wayne / Batman, with Zoë Kravitz, Paul Dano, Jeffrey Wright, John Turturro, Peter Sarsgaard, Barry Keoghan, Jayme Lawson, Andy Serkis, and Colin Farrell rounding out the ensemble cast.",
        1
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

INSERT INTO
    `Film` (
        `miniature`,
        `title`,
        `duration`,
        `year`,
        `description`,
        `isAvailable`
    )
VALUES (
        'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
        'Avengers: Endgame',
        181,
        '2019',
        'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.',
        1
    ), (
        'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg',
        'Avengers: Infinity War',
        149,
        '2018',
        'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
        0
    ), (
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
        'The Avengers',
        143,
        '2012',
        'Earth mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
        1
    ),
    (
        'https://fr.web.img6.acsta.net/c_310_420/medias/nmedia/18/62/89/45/18876909.jpg',
        'Iron man',
        126,
        '2008',
        'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
        0
    ),
    (
        'https://fr.web.img2.acsta.net/medias/nmedia/18/70/76/18/19444000.jpg',
        'the last airbender',
        103,
        '2010',
        'Air, Water, Earth, Fire: the balance of the world is tipped by a savage war waged for a century already by the Fire Nation against the three other nations. Challenging his courage and combat skills, Aang discovers that he is the new Avatar, the only one capable of mastering all four elements. He joins forces with Katara, a Waterbender, and his older brother Sokka, to stop the Fire Nation before it is too late...',
        0
    ),
    (
        'https://fr.web.img4.acsta.net/pictures/21/11/17/17/24/3336846.jpg',
        'Matrix Resurrections',
        148,
        '2020',
        'MATRIX RESURRECTIONS takes us back into two parallel realities – that of our daily lives and that of the world hidden there. To know with certainty whether his own reality is a physical or mental construct, and to truly know himself, Mr. Anderson will have to follow the white rabbit again. ', 
        1
    ),
    (
        'https://fr.web.img3.acsta.net/medias/nmedia/18/65/64/35/19116953.jpg',
        'Harry Potter',
        153,
        '2009',
        'Voldemort demonic grip tightens on the Muggle universe and the world of witchcraft. Hogwarts has ceased to be a haven of peace, danger lurks in the heart of the castle... But Dumbledore is more determined than ever to prepare Harry for his final battle, now imminent.', 
        0
    ),
    (
        'https://fr.web.img2.acsta.net/pictures/17/09/12/10/29/1142495.jpg',
        'Blade Runner 2049',
        164,
        '2017',
        'In 2049, society is weakened by the numerous tensions between humans and their slaves created by bioengineering. Officer K is a Blade Runner: part of an elite task force tasked with finding and eliminating those who do not obey human orders.', 
        1
    ),
    (
        'https://fr.web.img4.acsta.net/r_1280_720/img/6b/c7/6bc7a13ca6446a603f160b4ab4414141.jpg',
        'Gladiator',
        155,
        '2000',
        'The Roman general Maximus is the most faithful support of the Emperor Marcus Aurelius, whom he led from victory to victory with exemplary bravery and dedication. Jealous of Maximus prestige, and even more so of the emperor love for him, Marcus Aurelius son, Commodus, brutally assumed power, then ordered the general arrest and execution. Maximus escapes his assassins but cannot prevent the massacre of his family. Captured by a slave trader, he becomes a gladiator and plots his revenge', 
        1
    ),
    (
        'https://fr.web.img6.acsta.net/medias/nmedia/18/82/69/17/19806656.jpg',
        'Intouchables',
        92,
        '2011',
        'Following a paragliding accident, Philippe, a rich aristocrat, hires Driss, a young man from the suburbs who has just been released from prison, as a home helper. In short the least appropriate person for the job. Together they will bring together Vivaldi and Earth Wind and Fire, the word and the joke, the costumes and the tracksuit bottoms... Two universes will collide, tame each other, to give birth to a friendship as crazy, funny and strong than unexpected, a unique relationship that will spark and make them... Untouchable.', 
        1
    ),
    (
        'https://fr.web.img2.acsta.net/medias/nmedia/18/84/94/35/20078430.jpg',
        'Rebelle',
        95,
        '2012',
        'Since the dawn of time, in the heart of the wild and mysterious lands of the Scottish Highlands, stories of epic battles and mythical legends have been passed down from generation to generation.', 
        1
    ),
    (
        'https://fr.web.img4.acsta.net/medias/nmedia/18/35/57/73/18660716.jpg',
        'Le parrain',
        175,
        '1972',
        'In 1945, in New York, the Corleones are one of the five mafia families. Don Vito Corleone, "godfather" of this family, marries his daughter to a bookmaker. Sollozzo, "godfather" of the Tattaglia family, offers Don Vito an association in drug trafficking, but he refuses. Sonny, one of his sons, is in favor of it.', 
        1
    ),
    (
        'https://fr.web.img5.acsta.net/medias/nmedia/18/63/95/41/18927494.jpg',
        'Indina Jones et le cadran de la destinée',
        154,
        '2023',
        '1969. After spending more than ten years teaching at Hunter College in New York, the esteemed Dr. Jones, professor of archeology, is about to retire and live out peaceful days.', 
        1
    ),
    (
        'https://fr.web.img2.acsta.net/pictures/16/02/03/11/17/130929.jpg',
        'Batman VS Superman',
        153,
        '2016',
        'Fearing that Superman will abuse his omnipotence, the Dark Knight decides to confront him: does the world need more a superhero with limitless powers or a vigilante with formidable strength? of human origin? Meanwhile, a terrible threat looms on the horizon...', 
        1
    ),
    (
        'https://fr.web.img5.acsta.net/pictures/22/04/08/10/30/1779137.jpg',
        'Dr Strange',
        126,
        '2022',
        'In this new Marvel Studios film, the Marvel Cinematic Universe unlocks and pushes the boundaries of the multiverse even further. Journey into the unknown with Doctor Strange, who with the help of old and new mystical allies, traverses the mind-blowing and dangerous realities of the multiverse to face a mysterious new adversary.', 
        1
    ),
    (
        'https://fr.web.img3.acsta.net/pictures/22/10/04/09/10/4429153.jpg',
        'Black Panter',
        162,
        '2022',
        'Queen Ramonda, Shuri, MBaku, Okoye and the Dora Milaje fight to protect their nation from interference from other world powers after the death of King TChalla. As the people strive to move forward, our heroes will have to unite and count on the help of mercenary Nakia and Everett Ross to bring the kingdom of Wakanda into a new era. But a terrible threat arises from a kingdom hidden deep in the oceans: Talokan.', 
        1
    ),
    (
        'https://fr.web.img4.acsta.net/pictures/21/11/16/10/01/4860598.jpg',
        'SpiderMan No Way Hole',
        148,
        '2021',
        'For the first time in his cinematic history, Spider-Man, the friendly neighborhood hero, is unmasked and can no longer separate his normal life from his heavy superhero responsibilities. When he asks Doctor Strange for help, the stakes become even more dangerous, forcing him to discover what being Spider-Man truly means', 
        1
    ),
    (
        'https://fr.web.img6.acsta.net/pictures/22/05/24/11/16/2411535.jpg',
        'Thot Love and Thunder',
        119,
        '2022',
        'While Thor is deep in introspection and seeking serenity, his retreat is interrupted by a galactic killer known as Gorr, who has made it his mission to exterminate all the gods.', 
        1
    ),
    (
        'https://fr.web.img4.acsta.net/pictures/21/07/30/15/39/5399627.jpg',
        'Shang-Shi',
        132,
        '2021',
        'Shang-Chi will have to confront a past he thought he had left behind when he is caught in the web of the mysterious Ten Rings organization.', 
        1
    ),
    (
        'https://fr.web.img6.acsta.net/pictures/23/07/17/15/06/1535719.jpg',
        'Napoleon',
        158,
        '2023',
        'Spectacular fresco, Napoleon focuses on the rise and fall of Emperor Napoleon Bonaparte. The film traces Bonaparte s relentless conquest of power through the prism of his passionate and tormented relationship with Joséphine, the great love of his life.', 
        1
    ),
    (
        'https://fr.web.img2.acsta.net/pictures/19/10/25/11/18/5224976.jpg',
        'Titanic',
        194,
        '1998',
        'Southampton, April 10, 1912. The largest and most modern liner in the world, renowned for its unsinkability, the "Titanic", sets sail for its first voyage. Four days later, it hits an iceberg. On board, a poor artist and a wealthy bourgeois woman fall in love.', 
        1
    ),
    (
        'https://fr.web.img2.acsta.net/pictures/20/08/03/12/15/2118693.jpg',
        'Tenet',
        210,
        '2020',
        'Armed with just one word – Tenet – and determined to fight to save the world, our protagonist travels through the twilight world of international espionage. His mission will project him into a dimension that goes beyond time. However, it is not a question of time travel, but of a temporal reversal...',
        1
    );

INSERT INTO
    `Categorie` (`name`, `position`)
VALUES ('Action', 1), ('Adventure', 2), ('Sci-Fi', 3), ('Drama', 4), ('Thriller', 5), ('Comedy', 6), ('Crime', 7), ('Fantasy', 8), ('Mystery', 9), ('Animation', 10), ('Family', 11), ('Biography', 12), ('History', 13), ('Horror', 14), ('Music', 15), ('Musical', 16), ('Romance', 17), ('Sport', 18), ('War', 19), ('Western', 20);

INSERT INTO
    `User` (
        `name`,
        `email`,
        `naissance`,
        `civility`,
        `password`,
        `IsAdmin`
    )
VALUES (
        'Aurel',
        'aurelien.emeriau@wcs.com',
        '1983/06/10',
        '0',
        'ggfd4554',
        '0'
    ), (
        'Alex',
        'alex@wcs.com',
        '1998/03/19',
        '0',
        'ggfd455',
        '0'
        );

INSERT INTO 
    `En_tendance_film` (`userId`, `filmId`)
    VALUES
    (1, 1),
    (1, 2);

    
INSERT INTO 
    `Favori_film` (`userId`, `filmId`)
    VALUES
    (1, 1),
    (1, 2);
    
