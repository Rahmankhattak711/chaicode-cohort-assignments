-- CREATE TABLE ipl_players_auction (
--     player_Id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     player_base_price VARCHAR(50) DEFAULT '100',
--     player_role VARCHAR(50) NOT NULL,
--     country VARCHAR(50),
--     age INT CHECK (age > 18)
-- );
-- ALTER TABLE ipl_players_auction
-- ADD COLUMN team_name VARCHAR(50) DEFAULT 'Unknown';
-- ALTER TABLE ipl_players_auction
-- ADD COLUMN auction_year INT CHECK (auction_year >= 2008);
-- ALTER TABLE ipl_players_auction
-- ADD COLUMN is_sold BOOLEAN DEFAULT FALSE;
-- ALTER TABLE ipl_players_auction
-- ADD COLUMN sold_price VARCHAR(50) DEFAULT '0';
-- ALTER TABLE ipl_players_auction
-- ADD COLUMN sold_to_team VARCHAR(50) DEFAULT 'None';
-- INSERT INTO ipl_players_auction(name,player_base_price,player_role,country,age,team_name,auction_year,is_sold,sold_price,sold_to_team)
-- VALUES('Rohit Sharma','100','Batsman','India',32,'Rajasthan Royals',2022,FALSE,'0','None');
-- INSERT INTO ipl_players_auction(name,player_base_price,player_role,country,age,team_name,auction_year,is_sold,sold_price,sold_to_team)
-- VALUES('Virat Kohli','150','Batsman','India',33,'Royal Challengers Bangalore',2022,FALSE,'0','None');
-- INSERT INTO ipl_players_auction(name,player_base_price,player_role,country,age,team_name,auction_year,is_sold,sold_price,sold_to_team)
-- VALUES('Jasprit Bumrah','120','Bowler','India',28,'Mumbai Indians',2022,FALSE,'0','None');
-- INSERT INTO ipl_players_auction(name,player_base_price,player_role,country,age,team_name,auction_year,is_sold,sold_price,sold_to_team)
-- VALUES('AB de Villiers','130','Batsman','South Africa',37,'Royal Challengers Bangalore',2022,FALSE,'0','None');
-- INSERT INTO ipl_players_auction(name,player_base_price,player_role,country,age,team_name,auction_year,is_sold,sold_price,sold_to_team)
-- VALUES('Kane Williamson','140','Batsman','New Zealand',32,'Auckland Aces',2022,FALSE,'0','None');
-- INSERT INTO ipl_players_auction(name,player_base_price,player_role,country,age,team_name,auction_year,is_sold,sold_price,sold_to_team)
-- VALUES('David Warner','110','Batsman','Australia',34,'Sunrisers Hyderabad',2022,FALSE,'0','None');
-- SELECT * FROM ipl_players_auction WHERE country = 'South Africa';
-- SELECT name, player_role, age FROM ipl_players_auction WHERE age >= 30;
SELECT *
FROM ipl_players_auction
WHERE team_name = 'Royal Challengers Bangalore'
  OR team_name = 'Mumbai Indians'
