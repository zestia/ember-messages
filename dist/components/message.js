import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';
import { waitForAnimation } from '@zestia/animation-utils';
import { modifier } from 'ember-modifier';
import { on } from '@ember/modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

class MessageComponent extends Component {
  element;
  static {
    g(this.prototype, "isDismissed", [tracked], function () {
      return false;
    });
  }
  #isDismissed = (i(this, "isDismissed"), void 0);
  registerElement = modifier(element => this.element = element);
  get dismissed() {
    return this.isDismissible ? `${this.isDismissed}` : null;
  }
  get isDismissible() {
    return typeof this.args.onDismiss === 'function';
  }
  get dismissLabel() {
    return this.args.dismissLabel || 'Dismiss';
  }
  dismiss = waitFor(async () => {
    this.isDismissed = true;
    await waitForAnimation(this.element, {
      maybe: true
    });
    this.args.onDismiss();
  });
  static {
    setComponentTemplate(precompileTemplate("<div role=\"alert\" class=\"message\" data-type={{@type}} data-dismissed={{this.dismissed}} ...attributes {{this.registerElement}}>\n  <div class=\"message__body\">\n    {{yield}}\n  </div>\n  {{#if this.isDismissible}}\n    <button type=\"button\" class=\"message__dismiss\" {{on \"click\" this.dismiss}}>\n      {{this.dismissLabel}}\n    </button>\n  {{/if}}\n</div>", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { MessageComponent as default };
//# sourceMappingURL=message.js.map
