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

/* Table Platform
 * Register the hardware/O.S. platform where the game runs.
 * ex: PS4, Windows, Linux, DS, etc.
 */
CREATE TABLE tb_platform (
  id INTEGER PRIMARY KEY autoincrement,
  name TEXT not null UNIQUE,
  icon_path TEXT not null UNIQUE,
  creation_date TEXT not null DEFAULT (date('now')),
  last_alteration_date TEXT
);

/* Table Media
 * Register the media the game is distributed.
 * ex: PSN, Blue Ray, Steam, Cartridge, etc.
 */
CREATE TABLE tb_media (
  id INTEGER PRIMARY KEY autoincrement,
  name TEXT not null UNIQUE,
  icon_path TEXT not null UNIQUE,
  creation_date TEXT not null DEFAULT (date('now')),
  last_alteration_date TEXT
);

/* Table Title
 * This is the game title. The game can have many copies of a title, in many
 * platforms and medias.
 */
CREATE TABLE tb_title (
  id INTEGER PRIMARY KEY autoincrement,
  name TEXT not null,
  dlc INTEGER not null DEFAULT 0, -- Boolean
  dlc_title_fk INTEGER REFERENCES tb_title(id) ON DELETE cascade,
  creation_date TEXT not null DEFAULT (date('now')),
  last_alteration_date TEXT,
  CONSTRAINT dlc_check CHECK ((dlc = 0 AND dlc_title_fk IS NULL) OR
                              (dlc = 1 AND dlc_title_fk IS NOT NULL))
);

/* Table Copy
 * This represents a copy of a title in a single platform and media.
 */
CREATE TABLE tb_copy (
  id INTEGER PRIMARY KEY autoincrement,
  title_fk INTEGER not null REFERENCES tb_title(id) ON DELETE cascade,
  platform_fk INTEGER not null REFERENCES tb_platform(id) ON DELETE cascade,
  media_fk INTEGER not null REFERENCES tb_media(id) ON DELETE cascade,
  cover_path TEXT not null,
  creation_date TEXT not null DEFAULT (date('now')),
  last_alteration_date TEXT,
  CONSTRAINT copy_ak UNIQUE (title_fk, platform_fk, media_fk)
);
