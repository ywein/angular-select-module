# UI Select Angular component
Select box replacement for Angular2+

## angular-select-module [![npm version](https://badge.fury.io/js/angular-select-module.svg)](https://badge.fury.io/js/angular-select-module)

## Quick start

1) Install it:
  
  `npm i ng2-select --save`
  
2) Include it in your angular project:

  In NgModule add:
  ```javascript
   import { SelectModule } from 'angular-select-module';
  
   @NgModule({
     imports: [
       ...
       SelectModule,
       ...
     ]
   });
   ```
3) Use it in your components:
   ```html
    <angular-select items="items" placeholder="'some-text'"></angular-select>
   ```
   
## API

### Properties

- `items` - (`Array<any>`) - Array of items from which to select. Should be an array of objects with `value` and `text` properties.
- `selected` - (`?string=''`) - Default value of the select. Should be `value` of the desired object. 
- `placeholder` - (`?string=''`) - Placeholder text to display when the element has no focus and selected items.
- `showSearch` - (`?boolean=true`) - When `true`, it enabled search withitn the select box.
- `showSearchThreshold` - (`?number=10`) - The minimum number of options that must be present for search box to be shown.
- `showHtml` - (`?boolean=false`) - When `true`, `text` expected to be an html string and will be rendered as such (via `[innerHTML]` property)
- `open` - (`?boolean=false`) - When `true`, the select list will be open. Useful for controlling the select from parent component. 

### Events

- valueSelected - it fires after a new option selected; returns string with the value of the selected option.

### Customize

To customize select box - simply override default styles in css. There is not many of them, it is deliberatly minimalistic by default. 

### Dislaimer

Project is in very early stages. Expect heavy bugs and everything breaking(though it is very simple, so there is not really much to break). 

I created this component for my own project, because all existing components are either part of the bigger framework, or depends on jQuery, or do not work with my project because of the conflicting dependencies, or probably I simply did not found them. So there you have it, yet another select component for you).

### Future plans

- implement `multiple` option. 
- more events (on search, on open, etc.)
- methods to control select box
- key shortcuts
- advanced search
- handle large lists
- more options
- add themes



### License

The MIT License (see the [LICENSE](https://github.com/ywein/angular-select-module/blob/master/LICENSE) file for the full text)

  
