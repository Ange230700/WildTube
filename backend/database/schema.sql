DROP TABLE IF EXISTS `Serie`;

CREATE TABLE
    `Serie` (
        `id` int primary key auto_increment not null,
        `miniature` varchar(255) not null,
        `title` VARCHAR(50) not NULL,
        `videoUrl` VARCHAR(255),
        `duration` INT not NULL,
        `year` VARCHAR(4) not NULL,
        `description` TEXT not NULL,
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
        `cover` VARCHAR(255) NOT NULL,
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
        `cover`,
        `title`,
        `videoUrl`,
        `duration`,
        `year`,
        `description`,
        `IsAvailable`
    )
VALUES
    (
        'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
        'https://w0.peakpx.com/wallpaper/34/966/HD-wallpaper-the-avengers-avengers-endgame-avengers-avengers-endgame.jpg',
        'Avengers: Endgame',
        'https://www.youtube.com/watch?v=TcMBFSGVi1c',
        181,
        '2019',
        'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.',
        0
    ),
    (
        'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg',
        'https://www.highlandernews.org/wp-content/uploads/landscape-1522924460-avengers-infinity-war-poster.jpg',
        'Avengers: Infinity War',
        'https://www.youtube.com/watch?v=6ZfuNTqbHE8',
        149,
        '2018',
        'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
        1
    ),
    (
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
        'https://pbs.twimg.com/media/EJHjitpUUAA2EAp.jpg',
        'The Avengers',
        'https://www.youtube.com/watch?v=eOrNdBpGMv8',
        143,
        '2012',
        'Earth mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
        0
    ),
    (
        'https://i.ebayimg.com/images/g/Sv8AAOSwb7Rc0l0P/s-l1600.jpg',
        'https://wallpapercave.com/wp/wp11799668.jpg',
        'Iron man',
        'https://www.youtube.com/watch?v=8hYlB38asDY',
        126,
        '2008',
        'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
        1
    ),
    (
        "https://m.media-amazon.com/images/M/MV5BMTkxM2FiYjctYjliYy00NjY2LWFmOTEtMWZiYWRjNjA4MGYxXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        'https://www.wheninmanila.com/wp-content/uploads/2023/11/SHARED-Cover-Collage-x2-30-2.png',
        "Aquaman and the Lost Kingdom",
        "https://www.youtube.com/watch?v=2wcj6SrX4zw",
        120,
        "2023",
        "The film is directed by James Wan from a screenplay written by David Leslie Johnson-McGoldrick and Will Beall and stars Jason Momoa as Aquaman, alongside Amber Heard, Patrick Wilson, Dolph Lundgren, Yahya Abdul-Mateen II, and Temuera Morrison. In the film, Aquaman must save the world from the threat of Ocean Master and Black Manta.",
        0
    ),
    (
        "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/72/2297/22197/123544/xBckjuirX08J68hRmi7_Zgv4jhFeC3AbYX8REOHE770.jpeg/xBckjuirX08J68hRmi7_Zgv4jhFeC3AbYX8REOHE770.jpeg",
        'https://w0.peakpx.com/wallpaper/307/244/HD-wallpaper-batman-the-batman.jpg',
        "The Batman",
        "https://www.youtube.com/watch?v=mqqft2x_Aa4",
        120,
        "2022",
        "The film is directed by Matt Reeves, who wrote the screenplay with Peter Craig. It stars Robert Pattinson as Bruce Wayne / Batman, with Zoë Kravitz, Paul Dano, Jeffrey Wright, John Turturro, Peter Sarsgaard, Barry Keoghan, Jayme Lawson, Andy Serkis, and Colin Farrell rounding out the ensemble cast.",
        1
    ),
    (
        'https://m.media-amazon.com/images/M/MV5BMzZhYTVlMTMtMGZhMC00ZWYxLTljZDQtN2Y3YmFmZTk5OWU2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
        'https://www.tvinsider.com/wp-content/uploads/2023/11/avatar-the-last-airbender-770x433.jpg',
        'Avatar: The Last Airbender',
        'https://www.youtube.com/watch?v=waJKJW_XU90&ab_channel=Netflix',
        103,
        '2010',
        'Air, Water, Earth, Fire: the balance of the world is tipped by a savage war waged for a century already by the Fire Nation against the three other nations. Challenging his courage and combat skills, Aang discovers that he is the new Avatar, the only one capable of mastering all four elements. He joins forces with Katara, a Waterbender, and his older brother Sokka, to stop the Fire Nation before it is too late...',
        0
    ),
    (
        'https://fr.web.img4.acsta.net/pictures/21/11/17/17/24/3336846.jpg',
        'https://hustonsite.files.wordpress.com/2023/06/93361-matrixresurrections_bannerposter.jpg',
        'Matrix Resurrections',
        'https://www.youtube.com/watch?v=9ix7TUGVYIo',
        148,
        '2020',
        'MATRIX RESURRECTIONS takes us back into two parallel realities – that of our daily lives and that of the world hidden there. To know with certainty whether his own reality is a physical or mental construct, and to truly know himself, Mr. Anderson will have to follow the white rabbit again. ', 
        1
    ),
    (
        'https://static.posters.cz/image/1300/art-photo/harry-potter-and-the-half-blood-prince-i167377.jpg',
        'https://picfiles.alphacoders.com/621/62184.jpg',
        'Harry Potter and the Half-Blood Prince',
        'https://www.youtube.com/watch?v=tAiy66Xrsz4&ab_channel=HarryPotter',
        153,
        '2009',
        'Voldemort demonic grip tightens on the Muggle universe and the world of witchcraft. Hogwarts has ceased to be a haven of peace, danger lurks in the heart of the castle... But Dumbledore is more determined than ever to prepare Harry for his final battle, now imminent.', 
        0
    ),
    (
        'https://fr.web.img2.acsta.net/pictures/17/09/12/10/29/1142495.jpg',
        'https://pop.h-cdn.co/assets/17/39/1600x900/hd-aspect-1506522430-2049.jpg',
        'Blade Runner 2049',
        'https://www.youtube.com/watch?v=gCcx85zbxz4&ab_channel=WarnerBros.France',
        164,
        '2017',
        'In 2049, society is weakened by the numerous tensions between humans and their slaves created by bioengineering. Officer K is a Blade Runner: part of an elite task force tasked with finding and eliminating those who do not obey human orders.', 
        1
    ),
    (
        'https://fr.web.img4.acsta.net/r_1280_720/img/6b/c7/6bc7a13ca6446a603f160b4ab4414141.jpg',
        'https://c8.alamy.com/comp/K36B8T/gladiator-gladiator-date-2000-K36B8T.jpg',
        'Gladiator',
        'https://www.youtube.com/watch?v=owK1qxDselE&ab_channel=UniversalPicturesFrance',
        155,
        '2000',
        'The Roman general Maximus is the most faithful support of the Emperor Marcus Aurelius, whom he led from victory to victory with exemplary bravery and dedication. Jealous of Maximus prestige, and even more so of the emperor love for him, Marcus Aurelius son, Commodus, brutally assumed power, then ordered the general arrest and execution. Maximus escapes his assassins but cannot prevent the massacre of his family. Captured by a slave trader, he becomes a gladiator and plots his revenge', 
        0
    ),
    (
        'https://fr.web.img6.acsta.net/medias/nmedia/18/82/69/17/19806656.jpg',
        'https://assets.mubicdn.net/images/artworks/582651/images-original.png?1686650120',
        'Intouchables',
        'https://www.youtube.com/watch?v=34WIbmXkewU&ab_channel=Gaumont',
        92,
        '2011',
        'Following a paragliding accident, Philippe, a rich aristocrat, hires Driss, a young man from the suburbs who has just been released from prison, as a home helper. In short the least appropriate person for the job. Together they will bring together Vivaldi and Earth Wind and Fire, the word and the joke, the costumes and the tracksuit bottoms... Two universes will collide, tame each other, to give birth to a friendship as crazy, funny and strong than unexpected, a unique relationship that will spark and make them... Untouchable.', 
        1
    );

INSERT INTO
    `Serie` (
        `miniature`,
        `title`,
        `duration`,
        `year`,
        `description`,
        `IsAvailable`,
        `episodesNumber`,
        `seasonsNumber`
    )
VALUES
    (
        "https://fr.web.img6.acsta.net/r_1280_720/pictures/23/01/30/15/02/5217749.jpg",
        'One Piece',
        55,
        '2023',
        'Monkey D. Luffy is a young adventurer who has always dreamed of a life of freedom. Leaving his village, he embarks on a perilous journey in search of a mythical treasure, the One Piece, in order to become the king of the pirates! But to find this famous loot, Luffy will have to assemble the crew of his dreams then find a ship, crisscross the oceans, get rid of the Navy on his heels and prove himself to be a better strategist than the dangerous rivals who await him at every step.',
        1,
        9,
        1
    ),
    (
        "https://fr.web.img2.acsta.net/pictures/19/08/02/15/12/4423178.jpg",
        "Naruto",
        22,
        "2002",
        "In the village of Konoha lives Naruto, a young boy hated and feared by the villagers, due to the fact that he holds within him Kyuubi (nine-tailed fox demon) of incredible strength, who has killed a large number of people. Konoha's most powerful ninja at the time, Minato Namikaze, managed to seal this demon in Naruto's body. This is how twelve years later, Naruto dreams of becoming the greatest Hokage of Konoha so that everyone will recognize his true worth. But the road to becoming Hokage is very long.",
        1,
        224,
        9
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
        CONSTRAINT FK_Favori_Film_user_id FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
        CONSTRAINT FK_Favori_Film_film_id FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`),
        PRIMARY KEY (`userId`, `filmId`)
    );

DROP TABLE IF EXISTS `Favori_serie`;

CREATE TABLE
    `Favori_serie` (
        `userId` INT NOT NULL,
        `serieId` INT NOT NULL,
        CONSTRAINT FK_Favori_Serie_user_id FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
        CONSTRAINT FK_Favori_Serie_serie_id FOREIGN KEY (`serieId`) REFERENCES `Serie` (`id`),
        PRIMARY KEY (`userId`, `serieId`)
    );

DROP TABLE IF EXISTS `En_tendance_film`;

CREATE TABLE
    `En_tendance_film` (
        `userId` INT NOT NULL,
        `filmId` INT NOT NULL,
        CONSTRAINT FK_En_tendance_Film_user_id FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
        CONSTRAINT FK_En_tendance_Film_film_id FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`),
        PRIMARY KEY (`userId`, `filmId`)
    );

DROP TABLE IF EXISTS ` En_tendance_serie`;

CREATE TABLE
    `En_tendance_serie` (
        `userId` INT NOT NULL,
        `serieId` INT NOT NULL,
        CONSTRAINT FK_En_tendance_Serie_user_id FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
        CONSTRAINT FK_En_tendance_Serie_serie_id FOREIGN KEY (`serieId`) REFERENCES `Serie` (`id`),
        PRIMARY KEY (`userId`, `serieId`)
    );

DROP TABLE IF EXISTS `Commentaire_serie`;

CREATE TABLE
    `Commentaire_serie` (
        `userId` INT NOT NULL,
        `serieId` INT NOT NULL,
        CONSTRAINT FK_Commentaire_Serie_user_id FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
        CONSTRAINT FK_Commentaire_serie_serie_id FOREIGN KEY (`serieId`) REFERENCES `Serie` (`id`),
        PRIMARY KEY (`userId`, `serieId`)
    );

DROP TABLE IF EXISTS `Commentaire_film`;

CREATE TABLE
    `Commentaire_film` (
        `userId` INT NOT NULL,
        `filmId` INT NOT NULL,
        CONSTRAINT FK_Commentaire_Film_user_id FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
        CONSTRAINT FK_Commentaire_Film_film_id FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`),
        PRIMARY KEY (`userId`, `filmId`)
    );

DROP TABLE IF EXISTS `Categorie_par_serie`;

CREATE TABLE
    `Categorie_par_serie` (
        `serieId` INT NOT NULL,
        `categorieId` INT NOT NULL,
        CONSTRAINT FK_Categorie_Par_Serie_serie_id FOREIGN KEY (`serieId`) REFERENCES `Serie` (`id`),
        CONSTRAINT FK_Categorie_Par_Serie_categorie_id FOREIGN KEY (`categorieId`) REFERENCES `Categorie` (`id`),
        PRIMARY KEY (`serieId`, `categorieId`)
    );

DROP TABLE IF EXISTS `Categorie_par_film`;

CREATE TABLE
    `Categorie_par_film` (
        `filmId` INT NOT NULL,
        `categorieId` INT NOT NULL,
        CONSTRAINT FK_Categorie_Par_Film_film_id FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`),
        CONSTRAINT FK_Categorie_Par_Film_categorie_id FOREIGN KEY (`categorieId`) REFERENCES `Categorie` (`id`),
        PRIMARY KEY (`filmId`, `categorieId`)
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

INSERT INTO
    `User` (
        `name`,
        `email`,
        `naissance`,
        `civility`,
        `password`,
        `IsAdmin`
    )
VALUES
    (
        'Aurel',
        'aurelien.emeriau@wcs.com',
        '1983/06/10',
        '0',
        'ggfd4554',
        '0'
    ),
    (
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