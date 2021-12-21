import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked showMessage = true;

  @action
  dismissMessage() {
    this.showMessage = false;
  }
}
