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

import { Entity, UpdateDateColumn, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne,
  JoinColumn, OneToMany } from 'typeorm';

import { Copy } from './copy';

/**
 * This is the game title. The game can have many copies of a title, in many
 * platforms and medias.
 */
@Entity('tb_title')
export class Title {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dlc: boolean;

  @Column({name: 'dlc_title_fk'})
  @ManyToOne(type => Title, title => title.dlcs,
             {nullable: true, onDelete: 'CASCADE'})
  @JoinColumn({name: 'dlc_title_fk'})
  baseTitle: Promise<Title>; // Lazy load

  @OneToMany(type => Title, title => title.baseTitle, {cascade: true})
  dlcs: Promise<Title[]>; // Lazy load

  @OneToMany(type => Copy, copy => copy.title, {cascade: true})
  copies: Promise<Copy[]>; // Lazy load

  @CreateDateColumn({name: 'creation_date'})
  creationDate: Date;

  @UpdateDateColumn({name: 'last_alteration_date'})
  lastAlterationDate: Date;
}
