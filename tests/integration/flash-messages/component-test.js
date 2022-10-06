import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { waitUntil, render, settled, click, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('flash-messages', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.flashMessageService = this.owner.lookup('service:flash-message');
  });

  test('it does not render', async function (assert) {
    assert.expect(1);

    await render(hbs`<FlashMessages />`);

    assert.strictEqual(
      this.element.innerHTML,
      '<!---->',
      'does not render if there are no flash messages to display'
    );
  });

  test('it renders', async function (assert) {
    assert.expect(5);

    await render(hbs`<FlashMessages />`);

    const success = this.flashMessageService.add('success', 'Success!');

    await settled();

    assert
      .dom('.flash-messages')
      .exists(
        'it renders when there there is at least one flash message to display'
      );

    assert
      .dom(".flash-messages > .flash-message.message[data-type='success']")
      .includesText('Success!');

    this.flashMessageService.add('error', 'Error!');

    await settled();

    assert
      .dom(".flash-messages > .flash-message.message[data-type='error']")
      .includesText('Error!');

    assert
      .dom('.flash-messages > .flash-message.message')
      .exists({ count: 2 }, 'renders flash messages');

    this.flashMessageService.remove(success);

    await settled();

    assert
      .dom('.flash-messages > .flash-message')
      .exists({ count: 1 }, 'array is tracked');
  });

  test('dismissing', async function (assert) {
    assert.expect(1);

    await render(hbs`<FlashMessages />`);

    this.flashMessageService.add('success', 'Success!');

    await settled();

    await click('.flash-messages > .flash-message > .message__dismiss');

    assert.strictEqual(this.flashMessageService.queue.length, 0);
  });

  test('shares flash messages state', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <FlashMessages />
      <FlashMessages />
    `);

    this.flashMessageService.add('success', 'Wohoo');

    await settled();

    assert
      .dom('.flash-messages > .message')
      .exists({ count: 2 }, 'can be rendered more than once');
  });

  test('escaping', async function (assert) {
    assert.expect(1);

    this.flashMessageService.add('success', '<strong>Foo</strong>');

    await render(hbs`<FlashMessages />`);

    assert.strictEqual(
      find(
        '.flash-messages > .flash-message > .message__body'
      ).innerHTML.trim(),
      '&lt;strong&gt;Foo&lt;/strong&gt;'
    );
  });

  test('scrolls into view', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <style>
        .container { height: 0px; overflow: scroll }
        .space { height: 100px }
      </style>

      <div class="container">
        <div class="space"></div>

        <FlashMessages />
      </div>
    `);

    const container = find('.container');

    assert.strictEqual(
      container.scrollTop,
      0,
      'precondition: container is scrolled to the top'
    );

    this.flashMessageService.add('info', 'Look at me');

    const scrolled = () => container.scrollTop === 100;

    await waitUntil(scrolled);

    assert.ok(
      true,
      'when rendered, a flash message forces itself to be scrolled into view. ' +
        '(this is primarily because the user may be at the end of a long form)'
    );

    container.scrollTo(0, 0);

    assert.strictEqual(
      container.scrollTop,
      0,
      'precondition: container is scrolled back to the top'
    );

    this.flashMessageService.add('info', 'Look at me');

    await waitUntil(scrolled);

    assert.ok(
      true,
      'rendering the same flash message again will still scroll to it'
    );
  });
});
