import { service } from '@ember/service';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { fn } from '@ember/helper';
import Message from './message.gjs';

export default class FlashMessageComponent extends Component {
  @service('flash-message') flashMessageService;

  scrollIntoView = modifier((element) => {
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
    return this.args.Component ?? Message;
  }

  <template>
    {{#if this.flashMessageService.queue.length}}
      <div class="flash-messages">
        {{#each this.flashMessageService.queue as |message|}}
          <this.Component
            class="flash-message"
            @type={{message.type}}
            @onDismiss={{fn this.flashMessageService.remove message}}
            @dismissLabel={{@dismissLabel}}
            {{this.scrollIntoView}}
          >
            {{message.text}}
          </this.Component>
        {{/each}}
      </div>
    {{/if}}
  </template>
}
