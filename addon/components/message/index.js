import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { defer } from 'rsvp';

export default class MessageComponent extends Component {
  willAnimate = defer();

  @tracked isDismissed = false;

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
