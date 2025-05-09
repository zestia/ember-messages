import { service } from '@ember/service';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { action } from '@ember/object';
import { fn } from '@ember/helper';
import Message from '@zestia/ember-messages/components/message';

export default class FlashMessageComponent extends Component {
  @service('flash-message') flashMessageService;

  scrollIntoView = modifier((element) => {
    try {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    } catch (error) {
      // eslint-disable no-empty
    }
  });

  @action
  handleDismissMessage(message) {
    this.flashMessageService.remove(message);
  }

  <template>
    {{#if this.flashMessageService.queue.length}}
      <div class="flash-messages">
        {{#each this.flashMessageService.queue as |message|}}
          <Message
            class="flash-message"
            @type={{message.type}}
            @onDismiss={{fn this.handleDismissMessage message}}
            {{this.scrollIntoView}}
          >
            {{message.text}}
          </Message>
        {{/each}}
      </div>
    {{/if}}
  </template>
}
