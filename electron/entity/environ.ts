/*
 * Copyright (c) 2019 André Andrade - alandrade21@gmail.com
 *
 * This file is part of the "ex-ludos" software.
 *
 * "ex-ludos" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * "ex-ludos" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "server-arch".  If not, see <https://www.gnu.org/licenses/>.
 */

import { Entity, UpdateDateColumn, Column } from 'typeorm';

/**
 * Allows global configuration for the app and the database.
 * This class is designed to have only one instance on the app.
 */
@Entity('tb_environ')
export class Environ {

  @Column({name: 'db_version', nullable: false})
  dbVersion: string;

  @UpdateDateColumn({name: 'last_alteration_date'})
  lastAlterationDate: Date;
}
