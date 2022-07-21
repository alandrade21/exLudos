/*
* Copyright (c) 2022 André Andrade - alandrade21@gmail.com
*
* This file is part of the "exLudos" app.
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
* along with "exLudos". If not, see <https://www.gnu.org/licenses/>.
*/

import { AppConfigurator } from '@alandrade21/electron-arch';
import { ConfigOptions } from './ConfigOptions';

export class InitializationController extends AppConfigurator<ConfigOptions> {
  
  // Override
  public doConfig(): void {
    super.doConfig();
  }

  // Override
  protected createConfigFile(): void {
    this._appOptions = new ConfigOptions();
    this._cfm.writeFile(this._appOptions);
  }
}
