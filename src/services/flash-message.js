import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';

export default class FlashMessageService extends Service {
  queue = tracked([]);

  add(type, text) {
    const message = { type, text };

    this.remove(message);

    this.queue.push(message);

    return message;
  }

  remove(message) {
    const index = this.#findIndex(message);

    if (index !== -1) {
      this.queue.splice(index, 1);
    }
  }

  clear() {
    this.queue.splice(0, this.queue.length);
  }

  #findIndex(message) {
    return this.queue.findIndex(
      (m) => m.type === message.type && m.text === message.text
    );
  }
}
