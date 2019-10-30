import Service from '@ember/service';
import { set } from '@ember/object';
import { A as emberA } from '@ember/array';

export default class FlashMessageService extends Service {
  constructor() {
    super(...arguments);

    set(this, 'queue', emberA());
    this.clear();
  }

  add(type, text) {
    if (this._exists(type, text)) {
      return;
    }

    return this.queue.pushObject({ type, text });
  }

  remove(message) {
    this.queue.removeObject(message);
  }

  clear() {
    this.queue.clear();
  }

  _exists(type, text) {
    return !!this.queue.find(message => {
      return message.type === type && message.text === text;
    });
  }
}
