import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { defer } from 'rsvp';
import { waitForPromise } from '@ember/test-waiters';

export default class MessageComponent extends Component {
  willAnimate = null;

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
    if (!this.willAnimate) {
      return;
    }

    this.willAnimate.resolve();
    this.willAnimate = null;
  }

  _waitForAnimation(label) {
    this.willAnimate = defer();

    return waitForPromise(
      this.willAnimate.promise,
      `@zestia/ember-messages:${label}`
    );
  }
}
