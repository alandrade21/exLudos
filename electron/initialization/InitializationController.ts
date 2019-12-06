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

import { app } from 'electron';
 import i18next, { InitOptions } from 'i18next';
// import i18nextBackend from 'i18next-node-fs-backend';

// const i18nextBackend = require('i18next-node-fs-backend');

import { AppConfigurator, DatabaseFileManager, envDetector } from '@alandrade21/electron-arch';
import { ConfigOptions } from './ConfigOptions';
import { DATABASE_FILE_NAME, SKEL_FILE_NAME } from './../constants';
import { Language } from './Language';

/**
 * Class responsible to check and initialize all things that the app will need.
 */
export class InitializationController extends AppConfigurator<ConfigOptions> {

  private static _options: ConfigOptions;

  private _dfm = new DatabaseFileManager(DATABASE_FILE_NAME, this._dataFolder);

  // Override
  public doConfig(): void {
    super.doConfig();
    InitializationController._options = this._appOptions;
    // this.initializeI18nSupport();
    this.initializeDatabase();
  }

  // Override
  protected createConfigFile(): void {
    this._appOptions = new ConfigOptions();
    try {
      this.cfm.writeFile(this._appOptions);
    } catch (error) {
      this.errorDialog(error);
      throw error;
    }
  }

  /*
  private initializeI18nSupport() {
    i18next.use(i18nextBackend);

    const languages: string[] = [];

    this.appOptions.languages.forEach((language: Language) => {
      languages.push(language.locale);
    });

    const options: InitOptions = {
      backend: {
        // path where resources get loaded from
        loadPath: './locales/{{lng}}/{{ns}}.json',

        // path to post missing resources
        addPath: './locales/{{lng}}/{{ns}}.missing.json',

        // jsonIndent to use when storing json files
        jsonIndent: 2,
      },
      saveMissing: true,
      fallbackLng: this.appOptions.fallbackLng,
      whitelist: languages
    };

    if (envDetector.isDev()) {
      options.debug = true;
    }

    if (!i18next.isInitialized) {
      i18next.init(options);
    }
  }
*/
  private initializeDatabase(): void {
    if (!this._dfm.fileExist()) {
      const skelPath = `${app.getAppPath()}/database/`;
      try {
        this._dfm.copySkellDatabase(SKEL_FILE_NAME, skelPath);
      } catch (error) {
        this.errorDialog(error);
        throw error;
      }
    }
  }

  static get options(): ConfigOptions {
    return InitializationController._options;
  }

}
