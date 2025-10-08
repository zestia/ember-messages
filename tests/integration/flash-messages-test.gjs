import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  waitUntil,
  render,
  settled,
  click,
  find,
  getRootElement
} from '@ember/test-helpers';
import FlashMessages from '@zestia/ember-messages/components/flash-messages';

module('flash-messages', function (hooks) {
  setupRenderingTest(hooks);

  let flashMessageService;

  hooks.beforeEach(function () {
    flashMessageService = this.owner.lookup('service:flash-message');
  });

  test('it does not render', async function (assert) {
    assert.expect(1);

    await render(<template><FlashMessages /></template>);

    assert.strictEqual(
      getRootElement().innerHTML.trim(),
      '<!---->',
      'does not render if there are no flash messages to display'
    );
  });

  test('it renders', async function (assert) {
    assert.expect(5);

    await render(<template><FlashMessages /></template>);

    const success = flashMessageService.add('success', 'Success!');

    await settled();

    assert
      .dom('.flash-messages')
      .exists(
        'it renders when there there is at least one flash message to display'
      );

    assert
      .dom(".flash-messages > .flash-message.message[data-type='success']")
      .includesText('Success!');

    flashMessageService.add('error', 'Error!');

    await settled();

    assert
      .dom(".flash-messages > .flash-message.message[data-type='error']")
      .includesText('Error!');

    assert
      .dom('.flash-messages > .flash-message.message')
      .exists({ count: 2 }, 'renders flash messages');

    flashMessageService.remove(success);

    await settled();

    assert
      .dom('.flash-messages > .flash-message')
      .exists({ count: 1 }, 'array is tracked');
  });

  test('dismissing', async function (assert) {
    assert.expect(1);

    await render(<template><FlashMessages /></template>);

    flashMessageService.add('success', 'Success!');

    await settled();

    await click('.flash-messages > .flash-message > .message__dismiss');

    assert.strictEqual(flashMessageService.queue.length, 0);
  });

  test('shares flash messages state', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <FlashMessages />
        <FlashMessages />
      </template>
    );

    flashMessageService.add('success', 'Wohoo');

    await settled();

    assert
      .dom('.flash-messages > .message')
      .exists({ count: 2 }, 'can be rendered more than once');
  });

  test('escaping', async function (assert) {
    assert.expect(1);

    flashMessageService.add('success', '<strong>Foo</strong>');

    await render(<template><FlashMessages /></template>);

    assert.strictEqual(
      find(
        '.flash-messages > .flash-message > .message__body'
      ).innerHTML.trim(),
      '&lt;strong&gt;Foo&lt;/strong&gt;'
    );
  });

  test('scrolls into view', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          .container {
            height: 0px;
            overflow: scroll;
          }
          .space {
            height: 100px;
          }
        </style>

        <div class="container">
          <div class="space"></div>

          <FlashMessages />
        </div>
      </template>
    );

    const container = find('.container');

    assert.strictEqual(
      container.scrollTop,
      0,
      'precondition: container is scrolled to the top'
    );

    flashMessageService.add('info', 'Look at me');

    await waitUntil(() => container.scrollTop === 100);

    assert.ok(
      true,
      'when rendered, a flash message forces itself to be scrolled into view. ' +
        '(this is primarily because the user may be at the end of a long form)'
    );
  });
});
