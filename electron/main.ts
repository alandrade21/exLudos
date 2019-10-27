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

import { MainWindowController, envDetector, ErrorWrapper } from '@alandrade21/electron-arch';
import { InitializationController } from './initialization/InitializationController';
import { DEV_CONFIG_FOLDER_PATH, DEV_DATA_FOLDER_PATH } from './constants';
import { MenuBuilder } from './menu/MenuBuilder';

/**
 * This code is responsible to initialize the electron app and open the main window if the
 * initialization process is successful.
 */
app.on('ready', () => {

  try {
    envDetector.printEnvironment();

    // It is necessary to create the window first in order to show the dialogs.
    MainWindowController.initialize();
    MenuBuilder.createMainWindowMenu();

    // Do the app initialization.
    const initController = new InitializationController('exLudos', DEV_CONFIG_FOLDER_PATH,
        DEV_DATA_FOLDER_PATH);
    initController.doConfig();

    if (MainWindowController.mainWindow) {
      MainWindowController.mainWindow.show();
    }
  } catch (e) {
    if (e instanceof ErrorWrapper) {
      (<ErrorWrapper>e).consoleLog();
    } else {
      console.log(e);
    }

    app.quit();
  }
});
