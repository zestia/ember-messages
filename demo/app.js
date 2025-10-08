import Application from '@ember/application';
import Resolver from 'ember-resolver';
import config from './config.js';
import * as Router from './router.js';
import * as ApplicationRoute from './routes/application.js';
import * as ApplicationTemplate from './templates/application.gjs';
import * as FlashMessageService from '@zestia/ember-messages/services/flash-message';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  Resolver = Resolver.withModules({
    'demo/router': Router,
    'demo/routes/application': ApplicationRoute,
    'demo/templates/application': ApplicationTemplate,
    'demo/services/flash-message': FlashMessageService
  });
}
