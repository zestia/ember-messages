import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import waitForAnimation from '../../helpers/wait-for-animation';
import hbs from 'htmlbars-inline-precompile';

module('message', function(hooks) {
  setupRenderingTest(hooks);

  test('defaults', async function(assert) {
    assert.expect(5);

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
      .doesNotHaveClass(
        'message--revealed',
        'does not add revealed class, because by default messages are not dismissible'
      );
  });

  test('block content', async function(assert) {
    assert.expect(1);

    await render(hbs`<Message>Hello World</Message>`);

    assert
      .dom('.message > .message__body')
      .hasText('Hello World', 'renders block content in a separate element');
  });

  test('message type', async function(assert) {
    assert.expect(1);

    await render(hbs`<Message @type="foo" />`);

    assert
      .dom('.message')
      .hasClass(
        'message--foo',
        'gets a class name based on the type of message'
      );
  });

  test('dismissing', async function(assert) {
    assert.expect(6);

    this.dismiss = () => {
      assert.step('dismissed');
    };

    await render(
      hbs`<Message @dismissable={{true}} @onDismiss={{this.dismiss}} />`
    );

    assert
      .dom('.message')
      .hasClass(
        'message--revealed',
        'has revealed class for animation purposes'
      );

    await click('.message > .message__dismiss');

    assert
      .dom('.message')
      .hasClass(
        'message--dismissed',
        'has dismissed class name for animation purposes'
      );

    assert
      .dom('.message')
      .doesNotHaveClass(
        'message--revealed',
        'no longer has revealed class name'
      );

    assert.verifySteps([], 'has not yet dismissed');

    await waitForAnimation('.message');

    assert.verifySteps(
      ['dismissed'],
      'sends a dismiss action after the dismiss animation'
    );
  });
});
