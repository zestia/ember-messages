import { inject } from '@ember/service';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

export default class FlashMessageComponent extends Component {
  @inject('flash-message') flashMessageService;

  handleDismissMessage = (message) => {
    this.flashMessageService.remove(message);
  };

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
}
