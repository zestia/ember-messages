import Component from '@ember/component';
import { set } from '@ember/object';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',

  isDismissed: false,

  onDismiss() {},

  actions: {
    registerElement(element) {
      set(this, 'domElement', element);
    },

    dismiss() {
      this.domElement.addEventListener('animationend', this.onDismiss, {
        once: true
      });
      this.set('isDismissed', true);
    }
  }
});
