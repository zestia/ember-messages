import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { defer } from 'rsvp';

export default class MessageComponent extends Component {
  willAnimate = defer();

  @tracked isDismissed = false;

  get isDismissible() {
    return typeof this.args.onDismiss === 'function';
  }

  @action
  handleClickDismiss() {
    this.isDismissed = true;

    this._waitForAnimation().then(() => this.args.onDismiss());
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
