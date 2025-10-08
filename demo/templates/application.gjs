import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import FlashMessages from '@zestia/ember-messages/components/flash-messages';
import Message from '@zestia/ember-messages/components/message';
import Route from 'ember-route-template';
import '../styles/app.css';

class ApplicationTemplate extends Component {
  @tracked showMessage = true;

  dismissMessage = () => {
    this.showMessage = false;
  };

  <template>
    <h1>
      @zestia/ember-messages
    </h1>

    {{! template-lint-disable no-inline-styles }}
    <a
      href="https://github.com/zestia/ember-messages"
      style="position: absolute; top: 0; right: 0; border: 0;"
    >
      <img
        width="149"
        height="149"
        src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
        class="attachment-full size-full"
        alt="Fork me on GitHub"
        data-recalc-dims="1"
      />
    </a>

    <p>
      An example message
    </p>

    <Message>
      Hello World
    </Message>

    <p>
      An example message that can be dismissed.
    </p>

    {{#if this.showMessage}}
      <Message @type="example" @onDismiss={{this.dismissMessage}}>
        Hello World
      </Message>
    {{/if}}

    <p>
      Flash messages
    </p>

    <FlashMessages />
  </template>
}

export default Route(ApplicationTemplate);
