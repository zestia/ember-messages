import { inject } from '@ember/service';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { action } from '@ember/object';

export default class FlashMessageComponent extends Component {
  @inject('flash-message') flashMessageService;

  scrollIntoView = modifier((element) => {
    try {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    } catch (error) {
      // eslint-disable no-empty
    }
  });

  @action
  handleDismissMessage(message) {
    this.flashMessageService.remove(message);
  }
}
