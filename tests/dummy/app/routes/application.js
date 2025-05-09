import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service('flash-message') flashMessageService;

  beforeModel() {
    this.flashMessageService.add('info', 'Info message');
    this.flashMessageService.add('success', 'Success message');
    this.flashMessageService.add('warning', 'Warning message');
    this.flashMessageService.add('error', 'Error message');
  }
}
