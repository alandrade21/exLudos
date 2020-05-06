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

import { ConfigOptions } from '../initialization/ConfigOptions';
import { AppContextError } from './AppContextError';

/**
 * This singleton represent the app context, and stores app wide data and utilities.
 *
 * The goal is store here all data and objects that must be accessible anywhere in the app main
 * process.
 */
class AppContext {
  private _options: ConfigOptions | null;

  set options(options: ConfigOptions) {
    if (this._options) {
      throw new AppContextError('The app options were already initialized in context.');
    }
    this._options = options;
  }

  get options(): ConfigOptions {
    if (!this._options) {
      throw new AppContextError('The app options were not initialized in context yet.');
    }
    return this._options;
  }
}

export const appContext = new AppContext();
