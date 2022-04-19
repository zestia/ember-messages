# @zestia/ember-messages

[![Latest npm release][npm-badge]][npm-badge-url]
[![GitHub Actions][github-actions-badge]][github-actions-url]
[![Ember Observer][ember-observer-badge]][ember-observer-url]

[npm-badge]: https://img.shields.io/npm/v/@zestia/ember-messages.svg
[npm-badge-url]: https://www.npmjs.com/package/@zestia/ember-messages
[github-actions-badge]: https://github.com/zestia/ember-messages/workflows/CI/badge.svg
[github-actions-url]: https://github.com/zestia/ember-messages/actions
[ember-observer-badge]: https://emberobserver.com/badges/-zestia-ember-messages.svg
[ember-observer-url]: https://emberobserver.com/addons/@zestia/ember-messages

This Ember addon provides a component for rendering messages, which can optionally be dismissed by the user.

Additionally, messages can be flashed using the flash message service.

## Installation

```
ember install @zestia/ember-messages
```

## Demo

https://zestia.github.io/ember-messages/

## Notes

- This package intentionally does not come with any styles.

## Examples

#### Standalone message

```handlebars
<Message @type="your-type-goes-here">
  Content goes here
</Message>
```

#### Dismissible message

```handlebars
{{#if this.showMessage}}
  <Message @type="warning" @onDismiss={{this.hideMessage}}>
    Clicking hide will fire the dismiss action after a CSS animation
  </Message>
{{/if}}
```

#### Flash messages

```javascript
@inject('flash-message') flashMessageService;
// ...
this.flashMessageService.add('error', 'Something went wrong!');
```

```handlebars
<FlashMessages />
```
