import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';
import { waitForAnimation } from '@zestia/animation-utils';
import { modifier } from 'ember-modifier';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

export default class MessageComponent extends Component {
  element;

  @tracked isDismissed = false;

  registerElement = modifier((element) => (this.element = element));

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

    await waitForAnimation(this.element, { maybe: true });

    this.args.onDismiss();
  }

  <template>
    <div
      role="alert"
      class="message"
      data-type={{@type}}
      data-dismissed={{this.dismissed}}
      ...attributes
      {{this.registerElement}}
    >
      <div class="message__body">
        {{yield}}
      </div>
      {{#if this.isDismissible}}
        <button
          type="button"
          class="message__dismiss"
          aria-label="Dismiss"
          {{on "click" this.dismiss}}
        ></button>
      {{/if}}
    </div>
  </template>
}
