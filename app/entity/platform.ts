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

import { Entity, UpdateDateColumn, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

/**
 * Registers the hardware/O.S. platform where the game runs.
 * ex: PS4, Windows, Linux, DS, etc.
 */
@Entity('tb_platform')
export class Platform {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({name: 'icon_path'})
  iconPath: string;

  @CreateDateColumn({name: 'creation_date'})
  creationDate: Date;

  @UpdateDateColumn({name: 'last_alteration_date'})
  lastAlterationDate: Date;

}
