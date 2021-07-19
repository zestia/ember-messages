import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { defer } from 'rsvp';

export default class MessageComponent extends Component {
  willAnimate = defer();

  @tracked isDismissed = false;

  registerElement = modifier((element) => (this.element = element));

  @action
  handleClickDismiss() {
    this.isDismissed = true;

    this._waitForAnimation().then(() => this.args.onDismiss());
  }

  @action
  handleAnimationEnd(event) {
    if (event.target === this.element) {
      this.willAnimate.resolve();
    }
  }

  _waitForAnimation() {
    this.willAnimate = defer();
    return this.willAnimate.promise;
  }
}
