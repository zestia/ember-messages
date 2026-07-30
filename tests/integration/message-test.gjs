import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, settled, waitFor } from '@ember/test-helpers';
import waitForAnimation from '#tests/helpers/wait-for-animation';
import Message from '#src/components/message';
import { trackedObject } from '@ember/reactive/collections';

module('message', function (hooks) {
  setupRenderingTest(hooks);

  let handleDismiss;

  hooks.beforeEach(function (assert) {
    handleDismiss = () => assert.step('dismissed');
  });

  test('defaults', async function (assert) {
    assert.expect(7);

    await render(<template><Message class="foo" /></template>);

    assert
      .dom('.message')
      .exists('message component has an appropriate class name');

    assert
      .dom('.message')
      .hasAttribute('role', 'alert', 'has an appropriate aria role');

    assert.dom('.message').hasClass('foo', 'forwards attributes');

    assert
      .dom('.message__dismiss')
      .doesNotExist('does not display dismiss button but default');

    assert
      .dom('.message')
      .doesNotHaveAttribute(
        'data-type',
        'messages do not have a type by default'
      );

    assert
      .dom('.message')
      .doesNotHaveAttribute(
        'data-dismissed',
        'by default messages are not dismissible'
      );

    assert.deepEqual(
      [...find('.message').classList],
      ['message', 'foo'],
      'does not have a class name based on the message type when no type is set'
    );
  });

  test('block content', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Message>Hello World</Message>
      </template>
    );

    assert
      .dom('.message > .message__body')
      .hasText('Hello World', 'renders block content in a separate element');
  });

  test('message type', async function (assert) {
    assert.expect(1);

    await render(<template><Message @type="foo" /></template>);

    assert
      .dom('.message')
      .hasAttribute(
        'data-type',
        'foo',
        'gets an attr based on the type of message'
      );
  });

  test('dismissing', async function (assert) {
    assert.expect(7);

    await render(<template><Message @onDismiss={{handleDismiss}} /></template>);

    assert.dom('.message__dismiss').hasText('Dismiss');

    assert
      .dom('.message')
      .hasAttribute(
        'data-dismissed',
        'false',
        'has revealed class for animation purposes'
      );

    click('.message > .message__dismiss');

    await waitFor('.message');

    assert
      .dom('.message')
      .hasAttribute(
        'data-dismissed',
        'true',
        'has dismissed attr for animation purposes'
      );

    assert.verifySteps([], 'has not yet dismissed');

    const animations = await waitForAnimation('.message', {
      animationName: 'fade-out'
    });

    assert.strictEqual(animations.length, 1);

    await settled();

    assert.verifySteps(
      ['dismissed'],
      'sends a dismiss action after the dismiss animation'
    );
  });

  test('dismiss label', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Message @onDismiss={{handleDismiss}} @dismissLabel="X" />
      </template>
    );

    assert.dom('.message__dismiss').hasText('X');
  });

  test('test waiter', async function (assert) {
    assert.expect(1);

    const state = trackedObject({
      showMessage: true
    });

    const dismiss = () => (state.showMessage = false);

    await render(
      <template>
        {{#if state.showMessage}}
          <Message @onDismiss={{dismiss}} />
        {{/if}}
      </template>
    );

    await click('.message > .message__dismiss');

    assert.dom('.message').doesNotExist('dismiss action is aware of animation');
  });
});
