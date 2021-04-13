import { inject } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FlashMessageComponent extends Component {
  @inject('flash-message') flashMessageService;

  @action
  handleDismissMessage(message) {
    this.flashMessageService.remove(message);
  }

  @action
  scrollIntoView(element) {
    try {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    } catch (error) {
      // eslint-disable no-empty
    }
  }
}
