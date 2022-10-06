import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';
import { waitForAnimation } from '@zestia/animation-utils';
import { modifier } from 'ember-modifier';
import { action } from '@ember/object';

export default class MessageComponent extends Component {
  element = null;

  @tracked isDismissed = false;

  registerElement = modifier((element) => (this.element = element), {
    eager: false
  });

  get dismissed() {
    return this.isDismissible ? `${this.isDismissed}` : null;
  }

  get isDismissible() {
    return typeof this.args.onDismiss === 'function';
  }

  @action
  @waitFor
  async dismiss() {
    this.isDismissed = true;

    await waitForAnimation(this.element);

    this.args.onDismiss();
  }
}
