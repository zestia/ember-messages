import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MessageComponent extends Component {
  @tracked element;
  @tracked isDismissed = false;

  @action
  registerElement(element) {
    this.element = element;
  }

  @action
  handleClickDismiss() {
    this.element.addEventListener('animationend', this.args.onDismiss, {
      once: true
    });
    this.isDismissed = true;
  }
}
