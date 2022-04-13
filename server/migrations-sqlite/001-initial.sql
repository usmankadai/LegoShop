CREATE TABLE legos (
    legoId varchar(20) PRIMARY KEY,
    legoName text NOT NULL,
    category varchar(20) NOT NULL,
    legoImage text NOT NULL,
    brickType varchar(20) NOT NULL,
    sort varchar(20) NOT NULL,
    price int NOT NULL,
    stock int NOT NULL,
    cart int NOT NULL
);

INSERT INTO legos VALUES
  ('anfsfus', 'Chrome Gold Brick 2x2', 'Bricks', 'images/bricks/chromeGold2x2.png', '2x2', 'Gold2x2All>£20', 37, 25, 0),
  ('fczreic', 'Red Brick 2x3', 'Bricks', 'images/bricks/red2x3.png', '2x3', 'Red2x3All>£20', 25, 47, 0),
  ('xpejcid', 'Aqua Brick 1x2', 'Bricks', 'images/bricks/aqua1x2.png', '1x2', 'Aqua1x2All>£20', 24, 23, 0),
  ('aaahdhd', 'Pink Brick 2x2', 'Bricks', 'images/bricks/pink2x2.png', '2x2', 'Pink2x2All>£20', 24, 70, 0),
  ('fjsequv', 'Green Brick 2x2', 'Bricks', 'images/bricks/green2x2.png', '2x2', 'Green2x2All£11-£20', 18, 50, 0),
  ('giosnew', 'Orange Brick 2x2', 'Bricks', 'images/bricks/orange2x2.png', '2x2', 'Orange2x2All>£20', 21, 50, 0),
  ('nvxsjxf', 'Reddish Lilac Brick 2x2', 'Bricks', 'images/bricks/reddishLilac2x2.png', '2x2', 'Lilac2x2All>£20', 28, 50, 0),
  ('xrkxnri', 'Brown Brick 2x2', 'Bricks', 'images/bricks/brown2x2.png', '2x2', 'Brown2x2All>£20', 55, 60, 0),
  ('xnxfrix', 'Yellow Brick 2x2', 'Bricks', 'images/bricks/yellow2x2.png', '2x2', 'Yellow2x2All<£1', 0.98, 135, 0),
  ('zizqeiu', 'Yellow Brick 1x2', 'Bricks', 'images/bricks/yellow1x2.png', '1x2', 'Yellow1x2All£11-£20', 12, 47, 0),
  ('gkjxnri', 'Blue Brick 2x2', 'Bricks', 'images/bricks/blue2x2.png', '2x2', 'Blue2x2All£11-£20', 17, 43, 0),
  ('vxjdfnx', 'Aqua Brick 2x2', 'Bricks', 'images/bricks/aqua2x2.png', '2x2', 'Aqua2x2All>£20', 23, 88, 0),
  ('pqenwnk', 'Blue Brick 2x3', 'Bricks', 'images/bricks/blue2x3.png', '2x3', 'Blue2x3All>£20', 25, 75, 0),
  ('opneicn', 'White Brick 2x2', 'Bricks', 'images/bricks/white2x2.png', '2x2', 'White2x2All£11-£20', 15, 67, 0),
  ('peuncnq', 'Blue Brick 1x2', 'Bricks', 'images/bricks/blue1x2.png', '1x2', 'Blue1x2All£11-£20', 12, 75, 0),
  ('eeancnq', 'Brown Brick 1x2', 'Bricks', 'images/bricks/brown1x2.png', '1x2', 'Brown1x2All£1-£10', 10, 75, 0),
  ('lvrnisd', 'Chrome Gold Brick 1x2', 'Bricks', 'images/bricks/chromeGold1x2.png', '1x2', 'Gold1x2All£11-£20', 15, 100, 0),
  ('aiqeucw', 'Green Brick 1x2', 'Bricks', 'images/bricks/green1x2.png', '1x2', 'Green1x2All£11-£20', 11, 100, 0),
  ('xceuaeq', 'Orange Brick 1x2', 'Bricks', 'images/bricks/orange1x2.png', '1x2', 'Orange1x2All£1-£10', 9, 80, 0),
  ('imeimlk', 'Red Brick 1x1', 'Bricks', 'images/bricks/red1x1.png', '1x1', 'Red1x1All£1-£10', 4, 47, 0),
  ('eqixjri', 'Purple Brick 1x2', 'Bricks', 'images/bricks/purple1x2.png', '1x2', 'Purple1x2All£1-£10', 8, 35, 0),
  ('xjsfivn', 'Red Brick 2x2', 'Bricks', 'images/bricks/red2x2.png', '2x2', 'Red2x2All£11-£20', 19, 36, 0),
  ('zhzvrhf', 'Purple Brick 2x2', 'Bricks', 'images/bricks/purple2x2.png', '2x2', 'Purple2x2All£11-£20', 16, 88, 0),
  ('fizmeid', 'Red Brick 1x2', 'Bricks', 'images/bricks/red1x2.png', '1x2', 'Red', 11, 47, 0),
  ('vaeqeid', 'Reddish Lilac Brick 1x2', 'Bricks', 'images/bricks/reddishLilac1x2.png', '1x2', 'Lilac1x2All£11-£20', 12, 47, 0),
  ('peuetqq', 'Blue Brick 1x1', 'Bricks', 'images/bricks/blue1x1.png', '1x1', 'Blue1x1All£1-£10', 2, 75, 0),
  ('riovowe', 'Brown Brick 1x1', 'Bricks', 'images/bricks/brown1x1.png', '1x1', 'Brown1x1All£1-£10', 2, 75, 0),
  ('erlkfde', 'Chrome Gold Brick 1x1', 'Bricks', 'images/bricks/chromeGold1x1.png', '1x1', 'Gold1x1All£1-£10', 5, 100, 0),
  ('ieucefw', 'Green Brick 1x1', 'Bricks', 'images/bricks/green1x1.png', '1x1', 'Green1x1All<£1', 0.78, 100, 0),
  ('gcguarn', 'Orange Brick 2x3', 'Bricks', 'images/bricks/orange2x3.png', '2x3', 'Orange2x3All>£20', 22, 80, 0),
  ('cuaetnb', 'Orange Brick 1x1', 'Bricks', 'images/bricks/orange1x1.png', '1x1', 'Orange1x1All<£1', 0.89, 80, 0),
  ('wxshsoe', 'Pink Brick 1x1', 'Bricks', 'images/bricks/pink1x1.png', '1x1', 'Pink1x1All£1-£10', 3, 38, 0),
  ('qxjrple', 'Purple Brick 1x1', 'Bricks', 'images/bricks/purple1x1.png', '1x1', 'Purple1x1All£1-£10', 2, 35, 0),
  ('lifmwip', 'White Brick 1x2', 'Bricks', 'images/bricks/white1x2.png', '1x2', 'White1x2All£11-£20', 14, 47, 0),
  ('aqeimvs', 'Reddish Lilac Brick 1x1', 'Bricks', 'images/bricks/reddishLilac1x1.png', '1x1', 'Lilac1x1All£1-£10', 3, 47, 0),
  ('kpialid', 'Aqua Brick 2x3', 'Bricks', 'images/bricks/aqua2x3.png', '2x3', 'Aqua2x3All>£20', 24, 23, 0),
  ('eanvwqz', 'Brown Brick 2x3', 'Bricks', 'images/bricks/brown2x3.png', '2x3', 'Brown2x3All>£20', 28, 75, 0),
  ('lrnpdso', 'Chrome Gold Brick 2x3', 'Bricks', 'images/bricks/chromeGold2x3.png', '2x3', 'Gold2x3All>£20', 30, 100, 0),
  ('rw9xshf', 'Pink Brick 1x2', 'Bricks', 'images/bricks/pink1x2.png', '1x2', 'Pink1x2All£1-£10', 6, 38, 0),
  ('vibeunm', 'Green Brick 2x3', 'Bricks', 'images/bricks/green2x3.png', '2x3', 'Green2x3All£11-£20', 19, 100, 0),
  ('rwgxjwf', 'Pink Brick 2x3', 'Bricks', 'images/bricks/pink2x3.png', '2x3', 'Pink2x3All>£20', 22, 38, 0),
  ('efjccid', 'Aqua Brick 1x1', 'Bricks', 'images/bricks/aqua1x1.png', '1x1', 'Aqua1x1All<£1', 0.99, 23, 0),
  ('iqeimlk', 'Yellow Brick 1x1', 'Bricks', 'images/bricks/yellow1x1.png', '1x1', 'Yellow1x1All£1-£10', 1, 47, 0),
  ('aczqeix', 'Reddish Lilac Brick 2x3', 'Bricks', 'images/bricks/reddishLilac2x3.png', '2x3', 'Lilac2x3All>£20', 24, 47, 0),
  ('digmwiz', 'White Brick 2x3', 'Bricks', 'images/bricks/white2x3.png', '2x3', 'White2x3All£11-£20', 20, 47, 0);

-- down? 
drop table legos;
