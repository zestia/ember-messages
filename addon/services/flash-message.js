import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class FlashMessageService extends Service {
  @tracked queue = [];

  add(type, text) {
    const message = { type, text };

    this.remove(message);

    this.queue = [...this.queue, message];

    return message;
  }

  remove(message) {
    const index = this._findIndex(message);

    if (index !== -1) {
      this.queue.splice(index, 1);
    }

    this.queue = [...this.queue];
  }

  clear() {
    this.queue = [];
  }

  _findIndex(message) {
    return this.queue.findIndex(
      (m) => m.type === message.type && m.text === message.text
    );
  }
}
