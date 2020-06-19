import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class FlashMessageService extends Service {
  @tracked queue = [];

  add(type, text) {
    if (this._exists(type, text)) {
      return;
    }

    const message = { type, text };

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

  _exists(type, text) {
    return this.queue.some(
      (message) => message.type === type && message.text === text
    );
  }
}
