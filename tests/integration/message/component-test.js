import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, settled, waitFor } from '@ember/test-helpers';
import waitForAnimation from '../../helpers/wait-for-animation';
import hbs from 'htmlbars-inline-precompile';

module('message', function (hooks) {
  setupRenderingTest(hooks);

  test('defaults', async function (assert) {
    assert.expect(6);

    await render(hbs`<Message class="foo" />`);

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

    await render(hbs`<Message>Hello World</Message>`);

    assert
      .dom('.message > .message__body')
      .hasText('Hello World', 'renders block content in a separate element');
  });

  test('message type', async function (assert) {
    assert.expect(1);

    await render(hbs`<Message @type="foo" />`);

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

    this.handleDismiss = () => assert.step('dismissed');

    await render(hbs`<Message @onDismiss={{this.handleDismiss}} />`);

    assert
      .dom('.message__dismiss')
      .hasText('')
      .hasAttribute('aria-label', 'Dismiss');

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

    await waitForAnimation('.message', {
      animationName: 'fade-out'
    });

    await settled();

    assert.verifySteps(
      ['dismissed'],
      'sends a dismiss action after the dismiss animation'
    );
  });

  test('test waiter', async function (assert) {
    assert.expect(1);

    this.dismiss = () => this.set('showMessage', false);

    this.showMessage = true;

    await render(hbs`
      {{#if this.showMessage}}
        <Message @onDismiss={{this.dismiss}} />
      {{/if}}
    `);

    await click('.message > .message__dismiss');

    assert.dom('.message').doesNotExist('dismiss action is aware of animation');
  });
});
