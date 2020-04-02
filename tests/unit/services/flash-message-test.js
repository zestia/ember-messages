import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
const { isArray } = Array;

module('service:flash-message', function (hooks) {
  setupTest(hooks);

  let flashMessageService;

  hooks.beforeEach(function () {
    flashMessageService = this.owner.lookup('service:flash-message');
  });

  test('defaults', function (assert) {
    assert.expect(1);

    assert.ok(
      isArray(flashMessageService.queue),
      'the flash message service has a queue'
    );
  });

  test('#add', function (assert) {
    assert.expect(3);

    const message = flashMessageService.add('error', 'Error!');

    assert.equal(
      flashMessageService.queue.length,
      1,
      'flash messages are added to the queue'
    );

    assert.equal(
      message.type,
      'error',
      'the type gets set on the flash message model'
    );

    assert.equal(
      message.text,
      'Error!',
      'the text gets set on the flash message model'
    );
  });

  test('#add (duplicates)', function (assert) {
    assert.expect(1);

    flashMessageService.add('error', 'Something bad happened');
    flashMessageService.add('success', 'Something good happened');
    flashMessageService.add('error', 'Something bad happened');

    assert.equal(
      flashMessageService.queue.length,
      2,
      'duplicate message is not added'
    );
  });

  test('#remove', function (assert) {
    assert.expect(2);

    const message = flashMessageService.add('foo', 'foo');

    assert.ok(
      flashMessageService.queue.includes(message),
      'precondition: flash message added'
    );

    flashMessageService.remove(message);

    assert.ok(
      !flashMessageService.queue.includes(message),
      'removes a flash message from the queue'
    );
  });

  test('#clear', function (assert) {
    assert.expect(2);

    flashMessageService.add('error', 'Fail');
    flashMessageService.add('success', 'Yey');

    assert.equal(
      flashMessageService.queue.length,
      2,
      'precondition: flash message service has flash messages'
    );

    flashMessageService.clear();

    assert.equal(
      flashMessageService.queue.length,
      0,
      'clears the flash messages'
    );
  });
});
