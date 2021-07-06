import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MessageComponent extends Component {
  @tracked isDismissed = false;

  @action
  handleClickDismiss() {
    this.isDismissed = true;
  }

  @action
  handleAnimationEnd() {
    if (this.isDismissed) {
      this.args.onDismiss?.();
    }
  }
}
