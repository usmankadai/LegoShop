CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS lego;

CREATE TABLE IF NOT EXISTS lego (
    id   uuid      DEFAULT uuid_generate_v4() PRIMARY KEY,
    time timestamp DEFAULT now(),
    msg  text
);