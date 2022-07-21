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

import { app, dialog } from 'electron';

import { MainWindowController, envHelper, ErrorWrapper, i18n, MainWindowPosition } from '@alandrade21/electron-arch';
import { InitializationController } from './initialization/InitializationController';
import { DEV_CONFIG_FOLDER_PATH, DEV_DATA_FOLDER_PATH } from './constants';
import { MenuBuilder } from './menu/MenuBuilder';

try {
  console.log('Starting exLodos app.');
  app.on('ready', () => {

    console.log('exLudos is ready.');

    if(!app.isPackaged) {
      console.log('exLudos is running on dev mode.');
      envHelper.printEnvironment();
    }

    // It is necessary to create the window first in order to show the dialogs.
    MainWindowController.initialize(MainWindowPosition.getMaximizedInstance());

    // Do the app initialization.
    try {
      console.log('entrei no try');
      const initController = new InitializationController('exLudos', 
                                                          DEV_CONFIG_FOLDER_PATH, 
                                                          DEV_DATA_FOLDER_PATH);
      initController.doConfig();
    } catch (error: any) {
      console.log('entrei no catch ', error);
      dialog.showErrorBox('Initialization Error', error.message);
      app.quit();
      return;
    }
   
  /*
      i18n.on('loaded', (loaded: boolean) => {
  
        i18n.changeLanguage('en');
      });
  
      i18n.on('languageChanged', (lng: string) => {
  
        MenuBuilder.createMainWindowMenu();
      });
  */
  
      const opt: InitOptions = {loadPath: '/home/andre/Desenv/projetos/devTestFolders/.lang'};
  
      i18n.init(opt);
  
      console.log(i18n.t('Toggle DevTools'));
  
      i18n.changeLanguage('pt-BR');
  
      console.log(i18n.t('Toggle DevTools'));
  
      console.log('cheguei aqui.');
      if (MainWindowController.mainWindow) {
        MainWindowController.mainWindow.show();
      }
  });
} catch (e) {
  // Catch Error
  // throw e;
  console.log(e);
}
