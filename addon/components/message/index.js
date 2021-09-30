import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { defer } from 'rsvp';
import { waitForPromise } from '@ember/test-waiters';

export default class MessageComponent extends Component {
  animation = null;

  @tracked isDismissed = false;

  get isDismissible() {
    return typeof this.args.onDismiss === 'function';
  }

  @action
  handleClickDismiss() {
    this.isDismissed = true;

    this._waitForAnimation('dismiss').then(() => this.args.onDismiss());
  }

  @action
  handleAnimationEnd() {
    if (!this.animation) {
      return;
    }

    this.animation.resolve();
    this.animation = null;
  }

  _waitForAnimation(label) {
    this.animation = defer();

    return waitForPromise(
      this.animation.promise,
      `@zestia/ember-messages:${label}`
    );
  }
}
