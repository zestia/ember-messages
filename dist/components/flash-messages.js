import { service } from '@ember/service';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { fn } from '@ember/helper';
import MessageComponent from './message.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

class FlashMessageComponent extends Component {
  static {
    g(this.prototype, "flashMessageService", [service('flash-message')]);
  }
  #flashMessageService = (i(this, "flashMessageService"), void 0);
  scrollIntoView = modifier(element => {
    try {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    } catch {
      // eslint-disable no-empty
    }
  });
  get Component() {
    return this.args.Component ?? MessageComponent;
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if this.flashMessageService.queue.length}}\n  <div class=\"flash-messages\">\n    {{#each this.flashMessageService.queue as |message|}}\n      <this.Component class=\"flash-message\" @type={{message.type}} @onDismiss={{fn this.flashMessageService.remove message}} @dismissLabel={{@dismissLabel}} {{this.scrollIntoView}}>\n        {{message.text}}\n      </this.Component>\n    {{/each}}\n  </div>\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        fn
      })
    }), this);
  }
}

export { FlashMessageComponent as default };
//# sourceMappingURL=flash-messages.js.map
