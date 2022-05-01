CREATE TABLE kits (
    legoId varchar(20) PRIMARY KEY,
    legoName text NOT NULL,
    category varchar(20) NOT NULL,
    legoImage text NOT NULL,
    legoType varchar(20) NOT NULL,
    color varchar(20) NOT NULL,
    price int NOT NULL,
    stock int NOT NULL,
    cart int NOT NULL
);

INSERT INTO kits VALUES
  ('zsuareua', 'Peaky Blinders', 'Kits', 'images/kits/peakyBlinders.png', 'anime', 'Black', 500, 88, 0),
  ('risfnwor', 'Micheal Scofield', 'Kits', 'images/kits/scofield.png', 'anime', 'Blue', 399, 50, 0),
  ('teiskwrf', 'Joker', 'Kits', 'images/kits/joker.png', 'anime', 'Black', 364, 33, 0),
  ('rwfkwkff', 'Tasmanian Devil', 'Kits', 'images/kits/TasmanianDevil.png', 'anime', 'Brown', 260, 39, 0),
  ('tudifdnr', 'Viking', 'Kits', 'images/kits/viking.png', 'anime', 'Gold', 160, 98, 0),
  ('uytehfdo', 'Lambo', 'Kits', 'images/kits/lambo.png', 'sport', 'Green', 370, 25, 0),
  ('fofpweyr', 'Colosseum', 'Kits', 'images/kits/colosseum.png', 'place', 'Gold', 300, 70, 0),
  ('yzxnceiv', 'Hogwarts', 'Kits', 'images/kits/hogwarts.png', 'place', 'Gold', 320, 50, 0),
  ('lofjerhf', 'New York', 'Kits', 'images/kits/newYork.png', 'place', 'Silver', 240, 50, 0),
  ('qwurwhfs', 'Taj Mahal', 'Kits', 'images/kits/tajMahal.png', 'place', 'White', 392, 10, 0),
  ('weufwejd', 'Skyhawk', 'Kits', 'images/kits/Skyhawk.png', 'sport', 'Grey', 259, 19, 0),
  ('nbfgefse', 'F1 Lotus E20', 'Kits', 'images/kits/F1LotusE20.png', 'sport', 'Black', 499, 38, 0),
  ('lkotpeif', 'Madrid Stadium', 'Kits', 'images/kits/madrid.png', 'sport', 'White', 1000, 20, 0),
  ('assivmsd', 'Iron Man Helmet', 'Kits', 'images/kits/ironManHelmet.png', 'marvel', 'Red', 200, 76, 0),
  ('mblgutpw', 'Captain America', 'Kits', 'images/kits/captainA.png', 'marvel', 'Blue', 400, 32, 0),
  ('oqdcjtsu', 'Iron Man', 'Kits', 'images/kits/ironMan.png', 'marvel', 'Red', 374, 81, 0);

-- down? 
drop table kits;