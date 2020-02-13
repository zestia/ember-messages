import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MessageComponent extends Component {
  @tracked isDismissed = false;

  @action
  registerElement(element) {
    this.domElement = element;
  }

  @action
  dismiss() {
    this.domElement.addEventListener('animationend', this.args.onDismiss, {
      once: true
    });
    this.isDismissed = true;
  }
}
