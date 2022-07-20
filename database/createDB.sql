/* Table Environ
 * Allows global configuration for the app and the database.
 * This table is designed to have only one line, and one column for each configuration element.
 */
CREATE TABLE tb_environ (
  db_version TEXT not null,
  last_alteration_date TEXT DEFAULT (date('now')) -- date
);

INSERT INTO tb_environ(db_version)
VALUES('0.0.1');

/* Table Game Type
 * Registers the type of game.
 * ex.: videogame, board game, etc.
 */
CREATE TABLE tb_game_type (
  id INTEGER PRIMARY KEY autoincrement,
  type TEXT not null UNIQUE,
  icon_path TEXT,
  description TEXT,
  has_platform INTEGER not null DEFAULT 0 -- Boolean
)

/* Table Platform
 * Registers platform where the game you have is in.
 * ex.: PS4, Steam, PSN, Physical Media, cartdrige, etc.
 */
CREATE TABLE tb_platform (
  id INTEGER PRIMARY KEY autoincrement,
  name TEXT not null UNIQUE
);

/* Table Game
 * This is the game per se.
 */
CREATE TABLE tb_game (
  id INTEGER PRIMARY KEY autoincrement,
  name TEXT not null,
  game_type_fk INTEGER REFERENCES tb_game_type(id) ON DELETE restrict,
  is_dlc_expansion INTEGER not null DEFAULT 0, -- Boolean
  dlc_expansion_game_fk INTEGER REFERENCES tb_title(id) ON DELETE cascade,
  cover_box_art_path TEXT,
  creation_date TEXT not null DEFAULT (date('now')),
  last_alteration_date TEXT,
  CONSTRAINT dlc_expansion_check CHECK 
    ((is_dlc_expansion = 0 AND dlc_expansion_game_fk IS NULL) OR
     (is_dlc_expansion = 1 AND dlc_expansion_game_fk IS NOT NULL))
);

/* Table Game Platform
 * N to N between game and platform. You can own the same game in many 
 * platforms.
 */
CREATE TABLE tb_game_platform (
  game_fk INTEGER REFERENCES tb_game(id) ON DELETE restrict,
  platform_fk INTEGER REFERENCES tb_platform(id) ON DELETE restrict,
  CONSTRAINT game_platform_pk PRIMARY KEY (game_fk, platform_fk)
)

-- shelves
