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
  JoinColumn } from 'typeorm';

import { Title } from './title';
import { Platform } from './platform';
import { Media } from './media';

/**
 * This represents a copy of a title in a single platform and media.
 */
@Entity('tb_copy')
export class Copy {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'title_fk'})
  @ManyToOne(type => Title, title => title.copies,
             {nullable: false, onDelete: 'CASCADE'})
  @JoinColumn({name: 'title_fk'})
  title: Promise<Title>; // Lazy load

  @Column({name: 'platform_fk'})
  @ManyToOne(type => Platform, {nullable: false, onDelete: 'CASCADE'})
  @JoinColumn({name: 'platform_fk'})
  platform: Promise<Platform>; // Lazy load

  @Column({name: 'media_fk'})
  @ManyToOne(type => Media, {nullable: false, onDelete: 'CASCADE'})
  @JoinColumn({name: 'media_fk'})
  media: Promise<Media>; // Lazy load

  @Column({name: 'cover_path'})
  coverPath: string;

  @CreateDateColumn({name: 'creation_date'})
  creationDate: Date;

  @UpdateDateColumn({name: 'last_alteration_date'})
  lastAlterationDate: Date;
}
