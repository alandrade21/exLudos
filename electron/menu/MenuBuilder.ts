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

import { MenuItemConstructorOptions, Menu } from 'electron';
import i18n from 'i18next';

import { MainWindowController, envDetector } from '@alandrade21/electron-arch';
import { InitializationController } from 'initialization/InitializationController';
import { Language } from 'initialization/Language';

/**
 * Class responsible to create menus on app.
 */
export class MenuBuilder {
  private static menuOptions: MenuItemConstructorOptions[] = [];

  /**
   * This method creates the main window menu and sets it to the window.
   */
  public static createMainWindowMenu(): void {
    if (envDetector.isDev()) {
      MenuBuilder.menuOptions.push(MenuBuilder.buildDevelopMenu());
    }

    MenuBuilder.menuOptions.push(MenuBuilder.buildLanguageMenu());

    Menu.setApplicationMenu(Menu.buildFromTemplate(MenuBuilder.menuOptions));
  }

  private static buildDevelopMenu(): MenuItemConstructorOptions {
    return {
      type: 'submenu',
      label: i18n.t('Development'),
      submenu: [
        {
          type: 'normal',
          label: i18n.t('Toggle DevTools'),
          accelerator: 'CommandOrControl+Shift+T',
          click: () => {
            MainWindowController.mainWindow.webContents.toggleDevTools();
          }
        }
      ]
    };
  }

  private static buildLanguageMenu(): MenuItemConstructorOptions {

    const submenu: MenuItemConstructorOptions[] =
        InitializationController.options.languages.map((language: Language) => {
      return {
        label: language.name,
        type: 'radio',
        checked: language.locale === InitializationController.options.selectedLng,
        click: () => {
          i18n.changeLanguage(language.locale);
          InitializationController.options.selectedLng = language.locale;
        }
      };
    });

    return {
      type: 'submenu',
      label: i18n.t('Language'),
      submenu: submenu
    };
  }
}
