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
);

INSERT INTO tb_game_type (type, has_platform)
VALUES ('Videogames', 1);

INSERT INTO tb_game_type (type)
VALUES ('Boardgames');

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
  game_type_fk INTEGER not null REFERENCES tb_game_type(id) ON DELETE restrict,
  is_dlc_expansion INTEGER not null DEFAULT 0, -- Boolean
  dlc_expansion_game_fk INTEGER REFERENCES tb_title(id) ON DELETE cascade,
  cover_box_art_path TEXT,
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
);

/* Table Shelf
 * A game could be on more than one shelf.
 * There is a specific system shelf called wishlist.
 */
CREATE TABLE tb_shelf (
  id INTEGER PRIMARY KEY autoincrement,
  name TEXT not null UNIQUE,
  icon_path TEXT,
  is_system INTEGER not null DEFAULT 0, -- Boolean
  is_type_specific INTEGER not null DEFAULT 0, -- Boolean
  game_type_fk INTEGER REFERENCES tb_game_type(id) ON DELETE cascade
);

INSERT INTO tb_shelf (name, is_system)
VALUES ('Whishlist', 1);

CREATE TABLE tb_game_shelf (
  game_fk INTEGER REFERENCES tb_game(id) ON DELETE restrict,
  shelf_fk INTEGER REFERENCES tb_shelf(id) ON DELETE restrict
  CONSTRAINT game_shelf_pk PRIMARY KEY (game_fk, shelf_fk)
);

/* Table Lable */

CREATE TABLE tb_label (
  id INTEGER PRIMARY KEY autoincrement,
  name TEXT not null UNIQUE
);

CREATE TABLE tb_game_label (
  game_fk INTEGER REFERENCES tb_game(id) ON DELETE restrict,
  lael_fk INTEGER REFERENCES tb_lable(id) ON DELETE restrict
  CONSTRAINT game_shelf_pk PRIMARY KEY (game_fk, label_fk)
);
