const films = [
  {
    miniature:
      "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
    cover:
      "https://w0.peakpx.com/wallpaper/34/966/HD-wallpaper-the-avengers-avengers-endgame-avengers-avengers-endgame.jpg",
    title: "Avengers: Endgame",
    videoUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    duration: 181,
    year: "2019",
    description:
      "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.",
    IsAvailable: 0,
  },
  {
    miniature:
      "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg",
    cover:
      "https://www.highlandernews.org/wp-content/uploads/landscape-1522924460-avengers-infinity-war-poster.jpg",
    title: "Avengers: Infinity War",
    videoUrl: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
    duration: 149,
    year: "2018",
    description:
      "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
    IsAvailable: 1,
  },
  {
    miniature:
      "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    cover: "https://pbs.twimg.com/media/EJHjitpUUAA2EAp.jpg",
    title: "The Avengers",
    videoUrl: "https://www.youtube.com/watch?v=eOrNdBpGMv8",
    duration: 143,
    year: "2012",
    description:
      "Earth mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    IsAvailable: 0,
  },
  {
    miniature: "https://i.ebayimg.com/images/g/Sv8AAOSwb7Rc0l0P/s-l1600.jpg",
    cover: "https://wallpapercave.com/wp/wp11799668.jpg",
    title: "Iron man",
    videoUrl: "https://www.youtube.com/watch?v=8hYlB38asDY",
    duration: 126,
    year: "2008",
    description:
      "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
    IsAvailable: 1,
  },
  {
    miniature:
      "https://m.media-amazon.com/images/M/MV5BMTkxM2FiYjctYjliYy00NjY2LWFmOTEtMWZiYWRjNjA4MGYxXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
    cover:
      "https://www.wheninmanila.com/wp-content/uploads/2023/11/SHARED-Cover-Collage-x2-30-2.png",
    title: "Aquaman and the Lost Kingdom",
    videoUrl: "https://www.youtube.com/watch?v=2wcj6SrX4zw",
    duration: 120,
    year: "2023",
    description:
      "The film is directed by James Wan from a screenplay written by David Leslie Johnson-McGoldrick and Will Beall and stars Jason Momoa as Aquaman, alongside Amber Heard, Patrick Wilson, Dolph Lundgren, Yahya Abdul-Mateen II, and Temuera Morrison. In the film, Aquaman must save the world from the threat of Ocean Master and Black Manta.",
    IsAvailable: 0,
  },
  {
    miniature:
      "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/72/2297/22197/123544/xBckjuirX08J68hRmi7_Zgv4jhFeC3AbYX8REOHE770.jpeg/xBckjuirX08J68hRmi7_Zgv4jhFeC3AbYX8REOHE770.jpeg",
    cover:
      "https://w0.peakpx.com/wallpaper/307/244/HD-wallpaper-batman-the-batman.jpg",
    title: "The Batman",
    videoUrl: "https://www.youtube.com/watch?v=mqqft2x_Aa4",
    duration: 120,
    year: "2022",
    description:
      "The film is directed by Matt Reeves, who wrote the screenplay with Peter Craig. It stars Robert Pattinson as Bruce Wayne / Batman, with Zoë Kravitz, Paul Dano, Jeffrey Wright, John Turturro, Peter Sarsgaard, Barry Keoghan, Jayme Lawson, Andy Serkis, and Colin Farrell rounding out the ensemble cast.",
    IsAvailable: 1,
  },
  {
    miniature:
      "https://m.media-amazon.com/images/M/MV5BMzZhYTVlMTMtMGZhMC00ZWYxLTljZDQtN2Y3YmFmZTk5OWU2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
    cover:
      "https://www.tvinsider.com/wp-content/uploads/2023/11/avatar-the-last-airbender-770x433.jpg",
    title: "Avatar: The Last Airbender",
    videoUrl: "https://www.youtube.com/watch?v=waJKJW_XU90&ab_channel=Netflix",
    duration: 103,
    year: "2010",
    description:
      "Air, Water, Earth, Fire: the balance of the world is tipped by a savage war waged for a century already by the Fire Nation against the three other nations. Challenging his courage and combat skills, Aang discovers that he is the new Avatar, the only one capable of mastering all four elements. He joins forces with Katara, a Waterbender, and his older brother Sokka, to stop the Fire Nation before it is too late...",
    IsAvailable: 0,
  },
  {
    miniature:
      "https://fr.web.img4.acsta.net/pictures/21/11/17/17/24/3336846.jpg",
    cover:
      "https://hustonsite.files.wordpress.com/2023/06/93361-matrixresurrections_bannerposter.jpg",
    title: "Matrix Resurrections",
    videoUrl: "https://www.youtube.com/watch?v=9ix7TUGVYIo",
    duration: 148,
    year: "2020",
    description:
      "MATRIX RESURRECTIONS takes us back into two parallel realities – that of our daily lives and that of the world hidden there. To know with certainty whether his own reality is a physical or mental construct, and to truly know himself, Mr. Anderson will have to follow the white rabbit again. ",
    IsAvailable: 1,
  },
  {
    miniature:
      "https://static.posters.cz/image/1300/art-photo/harry-potter-and-the-half-blood-prince-i167377.jpg",
    cover: "https://picfiles.alphacoders.com/621/62184.jpg",
    title: "Harry Potter and the Half-Blood Prince",
    videoUrl:
      "https://www.youtube.com/watch?v=tAiy66Xrsz4&ab_channel=HarryPotter",
    duration: 153,
    year: "2009",
    description:
      "Voldemort demonic grip tightens on the Muggle universe and the world of witchcraft. Hogwarts has ceased to be a haven of peace, danger lurks in the heart of the castle... But Dumbledore is more determined than ever to prepare Harry for his final battle, now imminent.",
    IsAvailable: 0,
  },
  {
    miniature:
      "https://fr.web.img2.acsta.net/pictures/17/09/12/10/29/1142495.jpg",
    cover:
      "https://pop.h-cdn.co/assets/17/39/1600x900/hd-aspect-1506522430-2049.jpg",
    title: "Blade Runner 2049",
    videoUrl:
      "https://www.youtube.com/watch?v=gCcx85zbxz4&ab_channel=WarnerBros.France",
    duration: 164,
    year: "2017",
    description:
      "In 2049, society is weakened by the numerous tensions between humans and their slaves created by bioengineering. Officer K is a Blade Runner: part of an elite task force tasked with finding and eliminating those who do not obey human orders.",
    IsAvailable: 1,
  },
  {
    miniature:
      "https://fr.web.img4.acsta.net/r_1280_720/img/6b/c7/6bc7a13ca6446a603f160b4ab4414141.jpg",
    cover:
      "https://c8.alamy.com/comp/K36B8T/gladiator-gladiator-date-2000-K36B8T.jpg",
    title: "Gladiator",
    videoUrl:
      "https://www.youtube.com/watch?v=owK1qxDselE&ab_channel=UniversalPicturesFrance",
    duration: 155,
    year: "2000",
    description:
      "The Roman general Maximus is the most faithful support of the Emperor Marcus Aurelius, whom he led from victory to victory with exemplary bravery and dedication. Jealous of Maximus prestige, and even more so of the emperor love for him, Marcus Aurelius son, Commodus, brutally assumed power, then ordered the general arrest and execution. Maximus escapes his assassins but cannot prevent the massacre of his family. Captured by a slave trader, he becomes a gladiator and plots his revenge",
    IsAvailable: 0,
  },
  {
    miniature:
      "https://fr.web.img6.acsta.net/medias/nmedia/18/82/69/17/19806656.jpg",
    cover:
      "https://assets.mubicdn.net/images/artworks/582651/images-original.png?1686650120",
    title: "Intouchables",
    videoUrl: "https://www.youtube.com/watch?v=34WIbmXkewU&ab_channel=Gaumont",
    duration: 92,
    year: "2011",
    description:
      "Following a paragliding accident, Philippe, a rich aristocrat, hires Driss, a young man from the suburbs who has just been released from prison, as a home helper. In short the least appropriate person for the job. Together they will bring together Vivaldi and Earth Wind and Fire, the word and the joke, the costumes and the tracksuit bottoms... Two universes will collide, tame each other, to give birth to a friendship as crazy, funny and strong than unexpected, a unique relationship that will spark and make them... Untouchable.",
    IsAvailable: 0,
  },
  {
    miniature: "https://i.ebayimg.com/images/g/3hUAAOSwfNRhXhUZ/s-l1200.webp",
    cover:
      "https://d3dfsf9oc1ojzp.cloudfront.net/original/4X/7/3/b/73b08b82c41c646a8e21866f0998ecf5472ce7df.jpeg",
    title: "Justice League Dark",
    videoUrl: "https://www.youtube.com/watch?v=NsBnnM2qjAo",
    duration: 75,
    year: "2017",
    description:
      "Justice League Dark is a 2017 American animated superhero film produced by Warner Bros. Animation and distributed by Warner Home Video. Featuring the DC Comics team of the same name created by Peter Milligan and Mikel Janin, the film is the twenty-seventh in the DC Universe Animated Original Movies series and a part of DC Animated Movie Universe. It was released digitally on January 24, 2017, and on DVD and Blu-ray on February 7, 2017. The film is directed by Jay Oliva, and stars the voices of Matt Ryan, Jason O'Mara, Camilla Luddington, Nicholas Turturro, and Ray Chase.",
    IsAvailable: 1,
  },
  {
    miniature: "https://i.ebayimg.com/images/g/qisAAOSwDvVkuA-M/s-l1600.jpg",
    cover:
      "https://4k wallpapers.com/images/wallpapers/justice-league-3840x2160-11805.jpg",
    title: "Justice League War World",
    videoUrl: "https://www.youtube.com/watch?v=IPDLodUE9gg&ab",
    duration: 79,
    year: "2021",
    description:
      "Justice League: War is a 2014 American animated superhero film featuring the DC Comics superhero team the Justice League, and an adaptation of the 2011 comic book series Justice League: Origin by Geoff Johns and Jim Lee, the first story in DC's The New 52. It was directed by Jay Oliva, scripted by Heath Corson.",
    IsAvailable: 0,
  },
  {
    miniature:
      "https://www.bigflix.com/wp-content/uploads/2023/12/jl-crisis-on-infinite-earths-part1-blogroll-1701467786426.jpg",
    cover:
      "https://i0.wp.com/www.iconvsicon.com/wp-content/uploads/2023/12/JL_CRISIS_PT1_-2024-featured.jpg?fit=800%2C485&ssl=1",
    title: "Justice League: Crisis on Two Earths",
    videoUrl: "https://www.youtube.com/watch?v=c6oSqBly2ho?si=Sgb0RXhNJpMhp2ii",
    duration: 75,
    year: "2010",
    description:
      "A heroic version of Lex Luthor from an alternate universe appears to recruit the Justice League to help save his Earth from the Crime Syndicate, an evil version of the League. What ensues is the ultimate battle of good versus evil in a war that threatens both planets and, through a devious plan launched by Batman's counterpart Owlman, puts the balance of all existence in peril.",
    IsAvailable: 1,
  },
  {
    miniature:
      "https://fr.web.img2.acsta.net/medias/nmedia/18/84/94/35/20078430.jpg",
    cover:
      "https://thumb.canalplus.pro/http/unsafe/1440x810/filters:quality(80)/img-hapi.canalplus.pro:80/ServiceImage/ImageID/112134748",
    title: "Rebelle",
    videoUrl: "https://www.youtube.com/watch?v=tS9efNQn1Gk?",
    duration: 95,
    year: "2012",
    description:
      "Since the dawn of time, in the heart of the wild and mysterious lands of the Scottish Highlands, stories of epic battles and mythical legends have been passed down from generation to generation.",
    IsAvailable: 1,
  },
  {
    miniature:
      "https://fr.web.img4.acsta.net/medias/nmedia/18/35/57/73/18660716.jpg",
    cover:
      "https://le-cartographe.net/images/stories/Images/godfather_large.jpg",
    title: "Le parrain",
    videoUrl: "https://www.youtube.com/watch?v=bmtuIhesQWA",
    duration: 175,
    year: "1972",
    description:
      'In 1945, in New York, the Corleones are one of the five mafia families. Don Vito Corleone, "godfather" of this family, marries his daughter to a bookmaker. Sollozzo, "godfather" of the Tattaglia family, offers Don Vito an association in drug trafficking, but he refuses. Sonny, one of his sons, is in favor of it.',
    IsAvailable: 1,
  },
  {
    miniature:
      "https://fr.web.img5.acsta.net/medias/nmedia/18/63/95/41/18927494.jpg",
    cover:
      "https://www.fsa.uliege.be/upload/docs/image/jpeg/2023-06/indiana.jpg",
    title: "Indiana Jones et le cadran de la destinée",
    videoUrl: "https://www.youtube.com/watch?v=4tvtYAMPsxI",
    duration: 154,
    year: "2023",
    description:
      "1969. After spending more than ten years teaching at Hunter College in New York, the esteemed Dr. Jones, professor of archeology, is about to retire and live out peaceful days.",
    IsAvailable: 0,
  },
  {
    miniature:
      "https://fr.web.img2.acsta.net/pictures/16/02/03/11/17/130929.jpg",
    cover:
      "https://images.affiches-et-posters.com//albums/3/46439/poster-film-batman-superman-l-aube-justice-129600.jpg",
    title: "Batman VS Superman",
    videoUrl: "https://www.youtube.com/watch?v=NAk1BGZQnk0",
    duration: 153,
    year: "2016",
    description:
      "Fearing that Superman will abuse his omnipotence, the Dark Knight decides to confront him: does the world need more a superhero with limitless powers or a vigilante with formidable strength? of human origin? Meanwhile, a terrible threat looms on the horizon...",
    IsAvailable: 1,
  },
  {
    miniature:
      "https://fr.web.img5.acsta.net/pictures/22/04/08/10/30/1779137.jpg",
    cover:
      "https://proxymedia.woopic.com/api/v1/images/331%2FDOCTORSTRANW0191275_BAN1_2424_NEWTV.jpg",
    title: "Dr Strange",
    videoUrl: "https://www.youtube.com/watch?v=C0kqV-TYXP4",
    duration: 126,
    year: "2022",
    description:
      "In this new Marvel Studios film, the Marvel Cinematic Universe unlocks and pushes the boundaries of the multiverse even further. Journey into the unknown with Doctor Strange, who with the help of old and new mystical allies, traverses the mind-blowing and dangerous realities of the multiverse to face a mysterious new adversary.",
    IsAvailable: 0,
  },
  {
    miniature:
      "https://musicart.xboxlive.com/7/687d6400-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080",
    cover:
      "https://res.cloudinary.com/jerrick/image/upload/v1667350087/6361be46da5a81001da26b55.jpg",
    title: "Black Panther",
    videoUrl: "https://www.youtube.com/watch?v=DlGIWM_e9vg",
    duration: 162,
    year: "2022",
    description:
      "Queen Ramonda, Shuri, MBaku, Okoye and the Dora Milaje fight to protect their nation from interference from other world powers after the death of King TChalla. As the people strive to move forward, our heroes will have to unite and count on the help of mercenary Nakia and Everett Ross to bring the kingdom of Wakanda into a new era. But a terrible threat arises from a kingdom hidden deep in the oceans: Talokan.",
    IsAvailable: 1,
  },
  {
    miniature:
      "https://fr.web.img4.acsta.net/pictures/21/11/16/10/01/4860598.jpg",
    cover: "https://imgsrc.cineserie.com/2021/12/sp-1.jpg?ver=1",
    title: "SpiderMan No Way Hole",
    videoUrl: "https://www.youtube.com/watch?v=o-qvJ2iUqvA",
    duration: 148,
    year: "2021",
    description:
      "For the first time in his cinematic history, Spider-Man, the friendly neighborhood hero, is unmasked and can no longer separate his normal life from his heavy superhero responsibilities. When he asks Doctor Strange for help, the stakes become even more dangerous, forcing him to discover what being Spider-Man truly means",
    IsAvailable: 0,
  },
  {
    miniature:
      "https://fr.web.img6.acsta.net/pictures/22/05/24/11/16/2411535.jpg",
    cover:
      "https://m.media-amazon.com/images/I/71znSSjPGQL._AC_UF894,1000_QL80_.jpg",
    title: "Thor Love and Thunder",
    videoUrl: "https://www.youtube.com/watch?v=wPPim0we5m8",
    duration: 119,
    year: "2022",
    description:
      "While Thor is deep in introspection and seeking serenity, his retreat is interrupted by a galactic killer known as Gorr, who has made it his mission to exterminate all the gods.",
    IsAvailable: 1,
  },
  {
    miniature:
      "https://fr.web.img4.acsta.net/pictures/21/07/30/15/39/5399627.jpg",
    cover:
      "https://i0.wp.com/www.universdescomics.com/wp-content/uploads/2021/08/Shang-Chi-official-poster-1-e1629547002819.jpg?fit=810%2C522&ssl=1",
    title: "Shang-Shi",
    videoUrl: "https://www.youtube.com/watch?v=PD3rUCBFDlI",
    duration: 132,
    year: "2021",
    description:
      "Shang-Chi will have to confront a past he thought he had left behind when he is caught in the web of the mysterious Ten Rings organization.",
    IsAvailable: 1,
  },
  {
    miniature:
      "https://fr.web.img6.acsta.net/pictures/23/07/17/15/06/1535719.jpg",
    cover:
      "https://dulaccinemas.com/sites/default/files/styles/vignette_fiche_film/public/film/photos/2023/8-LLSIC.jpg?itok=GYqGB912",
    title: "Napoleon",
    videoUrl: "https://www.youtube.com/watch?v=A3xaMZZooVs",
    duration: 158,
    year: "2023",
    description:
      "Spectacular fresco, Napoleon focuses on the rise and fall of Emperor Napoleon Bonaparte. The film traces Bonaparte s relentless conquest of power through the prism of his passionate and tormented relationship with Joséphine, the great love of his life.",
    IsAvailable: 0,
  },
  {
    miniature:
      "https://fr.web.img2.acsta.net/pictures/19/10/25/11/18/5224976.jpg",
    cover:
      "https://i0.wp.com/songedunenuitdete.com/wp-content/uploads/2018/03/Titanic-mythic-kiss.jpg?fit=1920%2C1080&ssl=1",
    title: "Titanic",
    videoUrl: "https://www.youtube.com/watch?v=RSmXRew7hvo",
    duration: 194,
    year: "1998",
    description:
      'Southampton, April 10, 1912. The largest and most modern liner in the world, renowned for its unsinkability, the "Titanic", sets sail for its first voyage. Four days later, it hits an iceberg. On board, a poor artist and a wealthy bourgeois woman fall in love.',
    IsAvailable: 1,
  },
  {
    miniature:
      "https://fr.web.img2.acsta.net/pictures/20/08/03/12/15/2118693.jpg",
    cover: "https://www.pieuvre.ca/wp-content/uploads/2020/12/tenet-poster.jpg",
    title: "Tenet",
    videoUrl: "https://www.youtube.com/watch?v=6UG5LJQNjts",
    duration: 210,
    year: "2020",
    description:
      "Armed with just one word – Tenet – and determined to fight to save the world, our protagonist travels through the twilight world of international espionage. His mission will project him into a dimension that goes beyond time. However, it is not a question of time travel, but of a temporal reversal...",
    IsAvailable: 0,
  },
];

module.exports = films;
