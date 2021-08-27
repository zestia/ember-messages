import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { defer } from 'rsvp';

export default class MessageComponent extends Component {
  element = null;
  animates = false;
  willAnimate = defer();

  @tracked isDismissed = false;

  get isDismissible() {
    return typeof this.args.onDismiss === 'function';
  }

  handleClickDismiss = async () => {
    this.isDismissed = true;

    await this._waitForAnimation();

    this.args.onDismiss();
  };

  handleAnimationEnd = () => this.willAnimate.resolve();

  _waitForAnimation() {
    this.willAnimate = defer();
    return this.willAnimate.promise;
  }
}
