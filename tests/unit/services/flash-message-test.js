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

  module('#add', function () {
    test('it add a message to the queue', function (assert) {
      assert.expect(3);

      const message = flashMessageService.add('error', 'Error!');

      assert.equal(flashMessageService.queue.length, 1);
      assert.equal(message.type, 'error');
      assert.equal(message.text, 'Error!');
    });

    test('it does not add duplicates', function (assert) {
      assert.expect(1);

      const one = flashMessageService.add('error', 'Something bad happened');
      const two = flashMessageService.add('success', 'Something good happened');

      flashMessageService.add('error', 'Something bad happened');

      assert.deepEqual(flashMessageService.queue, [two, one]);
    });
  });

  module('#remove', function () {
    test('it removes messages from the queue', function (assert) {
      assert.expect(2);

      const message = flashMessageService.add('foo', 'foo');

      assert.ok(flashMessageService.queue.includes(message));

      flashMessageService.remove(message);

      assert.notOk(flashMessageService.queue.includes(message));
    });
  });

  module('#clear', function () {
    test('it clears the queue', function (assert) {
      assert.expect(2);

      flashMessageService.add('error', 'Fail');
      flashMessageService.add('success', 'Yey');

      assert.equal(flashMessageService.queue.length, 2);

      flashMessageService.clear();

      assert.equal(flashMessageService.queue.length, 0);
    });
  });
});
