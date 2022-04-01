CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS legos;

CREATE TABLE IF NOT EXISTS legos (
    legoId   varchar(20) PRIMARY KEY,
    name text NOT NULL,
    category varchar(20) NOT NULL,
    categoryId int NOT NULL,
    filename varchar(60),
    price int NOT NULL,
    stock int NOT NULL,
    cart int NOT NULL
);

insert into legos values
  (1, 'Chrome Gold Brick', 'Bricks', 2, 'images/usedInventories/chromeGold.png', 37, 25, 0),
  (2, 'Pink Brick', 'Bricks', 2, 'images/usedInventories/pink.png', 24, 70, 0),
  (3, 'Green Brick', 'Bricks', 3, 'images/usedInventories/green.png', 18, 50, 0),
  (4, 'Orange Brick', 'Bricks', 4, 'images/usedInventories/orange.png', 21, 50, 0),
  (5, 'Purple Brick', 'Bricks', 5, 'purple.png', 16, 88, 0),
  (6, 'Reddish Lilac Brick', 'Bricks', 6, 'reddishLilac.png', 28, 50, 0);
