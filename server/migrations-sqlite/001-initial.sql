CREATE TABLE legos (
    legoId varchar(20) PRIMARY KEY,
    legoName text NOT NULL,
    category varchar(20) NOT NULL,
    legoImage text NOT NULL,
    brickType varchar(20) NOT NULL,
    color varchar(20) NOT NULL,
    price int NOT NULL,
    stock int NOT NULL,
    cart int NOT NULL
);

insert into legos values
  ('anfsfus', 'Chrome Gold Brick', 'Bricks', 'images/usedInventories/chromeGold.png', 'two by two', 'Gold', 37, 25, 0),
  ('aaahdhd', 'Pink Brick', 'Bricks', 'images/usedInventories/pink.png', 'two by two', 'Pink', 24, 70, 0),
  ('fjsequv', 'Green Brick', 'Bricks', 'images/usedInventories/green.png', 'two by two', 'Green', 18, 50, 0),
  ('giosnew', 'Orange Brick', 'Bricks', 'images/usedInventories/orange.png', 'two by two', 'Orange', 21, 50, 0),
  ('zhzvrhf', 'Purple Brick', 'Bricks', 'images/usedInventories/purple.png', 'two by two', 'Purple', 16, 88, 0),
  ('nvxsjxf', 'Reddish Lilac Brick', 'Bricks', 'images/usedInventories/reddishLilac.png', 'two by two', 'Lilac', 28, 50, 0),
  ('xrkxnri', 'Brown Brick', 'Bricks', 'images/usedInventories/brown.png', 'two by two', 'Brown', 55, 60, 0),
  ('xnxfrix', 'Yellow Brick', 'Bricks', 'images/usedInventories/yellow.png', 'two by two', 'Yellow', 0.98, 135, 0),
  ('gkjxnri', 'Blue Brick', 'Bricks', 'images/usedInventories/blue.png', 'two by two', 'Blue', 17, 43, 0),
  ('vxjdfnx', 'Aqua Brick', 'Bricks', 'images/usedInventories/aqua.png', 'two by two', 'Aqua', 23, 88, 0),
  ('xjsfivn', 'Red Brick', 'Bricks', 'images/usedInventories/red.png', 'two by two', 'Red', 19, 36, 0),
  ('opneicn', 'White Brick', 'Bricks', 'images/usedInventories/white.png', 'two by two', 'White', 15, 67, 0),
  ('xpejcid', 'Soldier', 'Bricks', 'images/usedInventories/greenkit.png', 'one by one', 'Green', 240, 78, 0),
  ('peuncnq', 'Soldier Armour', 'Bricks', 'images/usedInventories/greenChest.png', 'one by one', 'Green', 100, 75, 0),
  ('lvrnisd', 'Left Arm', 'Bricks', 'images/usedInventories/greenLeftArm.png', 'one by one', 'Green', 0.99, 100, 0),
  ('aiqeucw', 'Right Arm', 'Bricks', 'images/usedInventories/greenRightArm.png', 'one by one', 'Green', 0.99, 100, 0),
  ('xceuaeq', 'Hand', 'Bricks', 'images/usedInventories/greenHand.png', 'one by one', 'Green', 10, 80, 0),
  ('rw9xshf', 'Bike', 'Bricks', 'images/usedInventories/yellowBike.png', 'one by one', 'Yellow', 60, 38, 0),
  ('eqixjri', 'Bike Body', 'Bricks', 'images/usedInventories/bikeBrick.png', 'one by one', 'Yellow', 30, 35, 0),
  ('fizmeid', 'Tire', 'Bricks', 'images/usedInventories/tire.png', 'one by one', 'Black', 20, 47, 0);

-- down? 
drop table legos;
