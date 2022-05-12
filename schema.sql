-- CREATE TABLE table_movie (
--     id serial PRIMARY KEY,
--     title varchar(255),
--     overview varchar(255),
--     poster_path varchar(255)
   
-- );
DROP TABLE IF EXISTS table_movie;
CREATE TABLE IF NOT EXISTS table_movie(
   id serial PRIMARY KEY,
    title varchar(255),
    overview varchar(255),
    poster_path varchar(255),
    comments varchar(255)
)