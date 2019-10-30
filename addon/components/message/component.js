import Component from '@ember/component';
import { action } from '@ember/object';
import layout from './template';

export default class MessageComponent extends Component {
  layout = layout;
  tagName = '';

  isDismissed = false;

  @action
  dismiss() {
    this.set('isDismissed', true);
  }

  @action
  dismissed() {
    this.onDismiss();
  }
}
