DROP TABLE IF EXISTS `User`;

CREATE TABLE
    `User` (
        `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `name` VARCHAR(50) NOT NULL,
        `email` VARCHAR(50) NOT NULL,
        `naissance` DATE NOT NULL,
        `civility` BOOLEAN NOT NULL,
        `password` VARCHAR(50) NOT NULL,
        `IsAdmin` BOOLEAN NOT NULL DEFAULT 0,
        `avatar` VARCHAR(255)
    );

DROP TABLE IF EXISTS `Film`;

CREATE TABLE
    `Film` (
        `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `miniature` VARCHAR(255) NOT NULL,
        `cover` VARCHAR(255) NOT NULL,
        `title` VARCHAR(255) NOT NULL,
        `videoUrl` VARCHAR(255),
        `duration` INT NOT NULL,
        `year` VARCHAR(4) NOT NULL,
        `description` VARCHAR(700) NOT NULL,
        `IsAvailable` BOOLEAN NOT NULL
    );

DROP TABLE IF EXISTS `Categorie`;

CREATE TABLE
    `Categorie` (
        `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `name` VARCHAR(255) not null,
        `position` INT
    );

DROP TABLE IF EXISTS `Watchlist`;

CREATE TABLE
    `Watchlist` (
        `userId` INT NOT NULL,
        `filmId` INT NOT NULL,
        CONSTRAINT FK_Watchlist_user_id FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
        CONSTRAINT FK_Watchlist_film_id FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`),
        PRIMARY KEY (`userId`, `filmId`)
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
        0
    ),
    (
        'https://i.ebayimg.com/images/g/3hUAAOSwfNRhXhUZ/s-l1200.webp',
        'https://d3dfsf9oc1ojzp.cloudfront.net/original/4X/7/3/b/73b08b82c41c646a8e21866f0998ecf5472ce7df.jpeg',
        'Justice League Dark',
        'https://www.youtube.com/watch?v=NsBnnM2qjAo',
        75,
        '2017',
        'Justice League Dark is a 2017 American animated superhero film produced by Warner Bros. Animation and distributed by Warner Home Video. Featuring the DC Comics team of the same name created by Peter Milligan and Mikel Janin, the film is the twenty-seventh in the DC Universe Animated Original Movies series and a part of DC Animated Movie Universe. It was released digitally on January 24, 2017, and on DVD and Blu-ray on February 7, 2017. The film is directed by Jay Oliva, and stars the voices of Matt Ryan, Jason O\'Mara, Camilla Luddington, Nicholas Turturro, and Ray Chase.',
        1
    ),
    (
        'https://i.ebayimg.com/images/g/qisAAOSwDvVkuA-M/s-l1600.jpg',
        'https://4kwallpapers.com/images/wallpapers/justice-league-3840x2160-11805.jpg',
        'Justice League War World',
        'https://www.youtube.com/watch?v=IPDLodUE9gg&ab',
        79,
        '2021',
        'Justice League: War is a 2014 American animated superhero film featuring the DC Comics superhero team the Justice League, and an adaptation of the 2011 comic book series Justice League: Origin by Geoff Johns and Jim Lee, the first story in DC\'s The New 52. It was directed by Jay Oliva, scripted by Heath Corson.',
        0
    ),
    (
        'https://www.bigflix.com/wp-content/uploads/2023/12/jl-crisis-on-infinite-earths-part1-blogroll-1701467786426.jpg',
        'https://i0.wp.com/www.iconvsicon.com/wp-content/uploads/2023/12/JL_CRISIS_PT1_-2024-featured.jpg?fit=800%2C485&ssl=1',
        'Justice League: Crisis on Two Earths',
        'https://www.youtube.com/watch?v=c6oSqBly2ho?si=Sgb0RXhNJpMhp2ii',
        75,
        '2010',
        'A heroic version of Lex Luthor from an alternate universe appears to recruit the Justice League to help save his Earth from the Crime Syndicate, an evil version of the League. What ensues is the ultimate battle of good versus evil in a war that threatens both planets and, through a devious plan launched by Batman\'s counterpart Owlman, puts the balance of all existence in peril.',
        1
    ),
    (
        'https://fr.web.img2.acsta.net/medias/nmedia/18/84/94/35/20078430.jpg',
        'https://thumb.canalplus.pro/http/unsafe/1440x810/filters:quality(80)/img-hapi.canalplus.pro:80/ServiceImage/ImageID/112134748',
        'Rebelle',
        'https://www.youtube.com/watch?v=tS9efNQn1Gk?',
        95,
        '2012',
        'Since the dawn of time, in the heart of the wild and mysterious lands of the Scottish Highlands, stories of epic battles and mythical legends have been passed down from generation to generation.',
        1
    ),
    (
        'https://fr.web.img4.acsta.net/medias/nmedia/18/35/57/73/18660716.jpg',
        'https://le-cartographe.net/images/stories/Images/godfather_large.jpg',
        'Le parrain',
        'https://www.youtube.com/watch?v=bmtuIhesQWA',
        175,
        '1972',
        'In 1945, in New York, the Corleones are one of the five mafia families. Don Vito Corleone, "godfather" of this family, marries his daughter to a bookmaker. Sollozzo, "godfather" of the Tattaglia family, offers Don Vito an association in drug trafficking, but he refuses. Sonny, one of his sons, is in favor of it.',
        1
    ),
    (
        'https://fr.web.img5.acsta.net/medias/nmedia/18/63/95/41/18927494.jpg',
        'https://www.fsa.uliege.be/upload/docs/image/jpeg/2023-06/indiana.jpg',
        'Indiana Jones et le cadran de la destinée',
        'https://www.youtube.com/watch?v=4tvtYAMPsxI',
        154,
        '2023',
        '1969. After spending more than ten years teaching at Hunter College in New York, the esteemed Dr. Jones, professor of archeology, is about to retire and live out peaceful days.',
        0
    ),
    (
        'https://fr.web.img2.acsta.net/pictures/16/02/03/11/17/130929.jpg',
        'https://images.affiches-et-posters.com//albums/3/46439/poster-film-batman-superman-l-aube-justice-129600.jpg',
        'Batman VS Superman',
        'https://www.youtube.com/watch?v=NAk1BGZQnk0',
        153,
        '2016',
        'Fearing that Superman will abuse his omnipotence, the Dark Knight decides to confront him: does the world need more a superhero with limitless powers or a vigilante with formidable strength? of human origin? Meanwhile, a terrible threat looms on the horizon...',
        1
    ),
    (
        'https://fr.web.img5.acsta.net/pictures/22/04/08/10/30/1779137.jpg',
        'https://proxymedia.woopic.com/api/v1/images/331%2FDOCTORSTRANW0191275_BAN1_2424_NEWTV.jpg',
        'Dr Strange',
        'https://www.youtube.com/watch?v=C0kqV-TYXP4',
        126,
        '2022',
        'In this new Marvel Studios film, the Marvel Cinematic Universe unlocks and pushes the boundaries of the multiverse even further. Journey into the unknown with Doctor Strange, who with the help of old and new mystical allies, traverses the mind-blowing and dangerous realities of the multiverse to face a mysterious new adversary.',
        0
    ),
    (
        'https://musicart.xboxlive.com/7/687d6400-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080',
        'https://res.cloudinary.com/jerrick/image/upload/v1667350087/6361be46da5a81001da26b55.jpg',
        'Black Panther',
        'https://www.youtube.com/watch?v=DlGIWM_e9vg',
        162,
        '2022',
        'Queen Ramonda, Shuri, MBaku, Okoye and the Dora Milaje fight to protect their nation from interference from other world powers after the death of King TChalla. As the people strive to move forward, our heroes will have to unite and count on the help of mercenary Nakia and Everett Ross to bring the kingdom of Wakanda into a new era. But a terrible threat arises from a kingdom hidden deep in the oceans: Talokan.',
        1
    ),
    (
        'https://fr.web.img4.acsta.net/pictures/21/11/16/10/01/4860598.jpg',
        'https://imgsrc.cineserie.com/2021/12/sp-1.jpg?ver=1',
        'SpiderMan No Way Hole',
        'https://www.youtube.com/watch?v=o-qvJ2iUqvA',
        148,
        '2021',
        'For the first time in his cinematic history, Spider-Man, the friendly neighborhood hero, is unmasked and can no longer separate his normal life from his heavy superhero responsibilities. When he asks Doctor Strange for help, the stakes become even more dangerous, forcing him to discover what being Spider-Man truly means',
        0
    ),
    (
        'https://fr.web.img6.acsta.net/pictures/22/05/24/11/16/2411535.jpg',
        'https://m.media-amazon.com/images/I/71znSSjPGQL._AC_UF894,1000_QL80_.jpg',
        'Thor Love and Thunder',
        'https://www.youtube.com/watch?v=wPPim0we5m8',
        119,
        '2022',
        'While Thor is deep in introspection and seeking serenity, his retreat is interrupted by a galactic killer known as Gorr, who has made it his mission to exterminate all the gods.',
        1
    ),
    (
        'https://fr.web.img4.acsta.net/pictures/21/07/30/15/39/5399627.jpg',
        'https://i0.wp.com/www.universdescomics.com/wp-content/uploads/2021/08/Shang-Chi-official-poster-1-e1629547002819.jpg?fit=810%2C522&ssl=1',
        'Shang-Shi',
        'https://www.youtube.com/watch?v=PD3rUCBFDlI',
        132,
        '2021',
        'Shang-Chi will have to confront a past he thought he had left behind when he is caught in the web of the mysterious Ten Rings organization.',
        1
    ),
    (
        'https://fr.web.img6.acsta.net/pictures/23/07/17/15/06/1535719.jpg',
        'https://dulaccinemas.com/sites/default/files/styles/vignette_fiche_film/public/film/photos/2023/8-LLSIC.jpg?itok=GYqGB912',
        'Napoleon',
        'https://www.youtube.com/watch?v=A3xaMZZooVs',
        158,
        '2023',
        'Spectacular fresco, Napoleon focuses on the rise and fall of Emperor Napoleon Bonaparte. The film traces Bonaparte s relentless conquest of power through the prism of his passionate and tormented relationship with Joséphine, the great love of his life.',
        0
    ),
    (
        'https://fr.web.img2.acsta.net/pictures/19/10/25/11/18/5224976.jpg',
        'https://i0.wp.com/songedunenuitdete.com/wp-content/uploads/2018/03/Titanic-mythic-kiss.jpg?fit=1920%2C1080&ssl=1',
        'Titanic',
        'https://www.youtube.com/watch?v=RSmXRew7hvo',
        194,
        '1998',
        'Southampton, April 10, 1912. The largest and most modern liner in the world, renowned for its unsinkability, the "Titanic", sets sail for its first voyage. Four days later, it hits an iceberg. On board, a poor artist and a wealthy bourgeois woman fall in love.',
        1
    ),
    (
        'https://fr.web.img2.acsta.net/pictures/20/08/03/12/15/2118693.jpg',
        'https://www.pieuvre.ca/wp-content/uploads/2020/12/tenet-poster.jpg',
        'Tenet',
        'https://www.youtube.com/watch?v=6UG5LJQNjts',
        210,
        '2020',
        'Armed with just one word – Tenet – and determined to fight to save the world, our protagonist travels through the twilight world of international espionage. His mission will project him into a dimension that goes beyond time. However, it is not a question of time travel, but of a temporal reversal...',
        0
    );

INSERT INTO
    `Categorie_par_film` (`filmId`, `categorieId`)
VALUES
    (1, 1),
    (2, 1),
    (3, 9),
    (4, 1),
    (5, 8),
    (6, 20),
    (7, 3),
    (8, 3),
    (9, 8),
    (10, 3),
    (11, 1),
    (12, 3),
    (14, 9),
    (15, 8),
    (16, 8),
    (17, 11),
    (18, 11),
    (19, 11),
    (20, 11),
    (21, 11),
    (22, 3),
    (23, 9),
    (24, 9),
    (25, 20),
    (26, 20),
    (27, 20);