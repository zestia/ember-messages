# @zestia/ember-messages

This Ember addon provides a component for rendering messages, which can optionally be dismissed by the user.

Additionally, messages can be flashed using the flash message service.

## Installation

```
ember install @zestia/ember-messages
```

## Notes

- This package intentionally does not come with any styles.

## Examples

#### Standalone message

```handlebars
<Message @type="your-type-goes-here">
  Content goes here
</Message>
```

#### Dismissable message

```handlebars
{{#if this.showMessage}}
  <Message @type="warning" @dismissable={{true}} @onDismiss={{this.hideMessage}}>
    Clicking hide will fire the dismiss action after a CSS transition
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
