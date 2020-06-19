import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class FlashMessageService extends Service {
  @tracked queue = [];

  add(type, text) {
    const message = { type, text };

    if (this._exists(message)) {
      return;
    }

    this.queue = [...this.queue, message];

    return message;
  }

  remove(message) {
    const index = this.queue.indexOf(message);

    this.queue.splice(index, 1);

    this.queue = [...this.queue];
  }

  clear() {
    this.queue = [];
  }

  _exists(message) {
    return this.queue.some(
      (m) => m.type === message.type && m.text === message.text
    );
  }
}
