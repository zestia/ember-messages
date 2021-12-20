import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';
import { waitForAnimation } from '@zestia/animation-utils';
import { modifier } from 'ember-modifier';

export default class MessageComponent extends Component {
  element = null;

  @tracked isDismissed = false;

  registerElement = modifier((element) => (this.element = element));

  get isDismissible() {
    return typeof this.args.onDismiss === 'function';
  }

  dismiss = waitFor(async () => {
    this.isDismissed = true;

    await waitForAnimation(this.element);

    this.args.onDismiss();
  });
}
