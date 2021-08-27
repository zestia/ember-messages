import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class ApplicationRoute extends Route {
  @inject('flash-message') flashMessageService;

  beforeModel() {
    this.flashMessageService.add('example', 'Flash message one');
    this.flashMessageService.add('example', 'Flash message two');
    this.flashMessageService.add('example', 'Flash message three');
  }
}
