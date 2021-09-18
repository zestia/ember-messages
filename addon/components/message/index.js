import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { defer } from 'rsvp';
import { buildWaiter } from '@ember/test-waiters';

const dismiss = buildWaiter('@zestia/ember-messages:dismiss');

export default class MessageComponent extends Component {
  willAnimate = null;

  @tracked isDismissed = false;

  constructor() {
    super(...arguments);
    this._waitForAnimation();
  }

  get isDismissible() {
    return typeof this.args.onDismiss === 'function';
  }

  @action
  handleClickDismiss() {
    const token = dismiss.beginAsync();
    this.isDismissed = true;

    this._waitForAnimation()
      .then(() => this.args.onDismiss())
      .then(() => dismiss.endAsync(token));
  }

  @action
  handleAnimationEnd() {
    this.willAnimate.resolve();
  }

  _waitForAnimation() {
    this.willAnimate = defer();
    return this.willAnimate.promise;
  }
}
