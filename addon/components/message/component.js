import Component from '@ember/component';
import { action, set } from '@ember/object';
import layout from './template';

export default class MessageComponent extends Component {
  layout = layout;
  tagName = '';

  isDismissed = false;

  onDismiss() {}

  @action
  registerElement(element) {
    set(this, 'domElement', element);
  }

  @action
  dismiss() {
    this.domElement.addEventListener('animationend', this.onDismiss, {
      once: true
    });
    set(this, 'isDismissed', true);
  }
}
