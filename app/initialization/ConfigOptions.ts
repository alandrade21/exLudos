/*
 * Copyright (c) 2022 André Andrade - alandrade21@gmail.com
 *
 * This file is part of the "exLudos" software.
 *
 * "exLudos" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * "exLudos" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "exLudos".  If not, see <https://www.gnu.org/licenses/>.
 */


import { ConfigData } from '@alandrade21/electron-arch';
import { Language } from './Language';

/**
 * Abstraction of the configuration file. This class contains all options that 
 * can be configured for the app.
 */
export class ConfigOptions implements ConfigData {

  // Last language selected.
  selectedLng = 'en';

  // Supported languages
  languages: Language[] = [
    {'locale': 'en', 'name': 'English'},
    {'locale': 'pt-BR', 'name': 'Português do Brasil'}
  ];

  // Custom data directory.
  dataDir?: string;
}
