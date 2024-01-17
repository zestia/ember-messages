# @zestia/ember-messages

[![Ember Observer][ember-observer-badge]][ember-observer-url]

<!-- [![GitHub Actions][github-actions-badge]][github-actions-url] -->

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

Add the following to `~/.npmrc` to pull @zestia scoped packages from Github instead of NPM.

```
@zestia:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<YOUR_GH_TOKEN>
```

## Demo

https://zestia.github.io/ember-messages

## Features

- Dismissible messages ✔︎
- Flash message queue ✔︎
- Scroll into view ✔︎

## Notes

- This package intentionally does not come with any styles.
- It is configured with [ember-test-waiters](https://github.com/emberjs/ember-test-waiters) so `await`ing in your test suite will just work.

## Example

```handlebars
<Message>
  Content
</Message>
```

## `Message`

### Arguments

#### `@type`

Optional. Sets a data attribute on the message DOM element.

#### `@onDismiss`

Optional. When provided, the message becomes dismissible. This action is fired after a message has been dismissed and any animations have finished.

## `FlashMessages`

This addon comes with a service for managing a queue of flash messages

<details>
  <summary>Example</summary>

```javascript
@inject('flash-message') flashMessageService;
// ...
this.flashMessageService.add('error', 'Something went wrong!');
```

They can be rendered as below. When a message is added, it will be scrolled into view.

```handlebars
<FlashMessages />
```

</details>
