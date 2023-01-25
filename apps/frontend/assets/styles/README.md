# Styles folder

You can inport index.scss file to components for using available utils.

This styles import `fonts` on site, register theme `colors` and forward `typography` mixin for easilly using typography from design.

> Colors registred from `_theme.scss` file. Every color will be registred with prefix `--c`. Example: `--c-color-name`

>```scss
> .target-class {
>     // color with 1 opacity
>     color: rgb(var(--c-color-name));
>     // color with 0.05 opacity
>     background-color: rgb(var(--c-another-color), 0.05);
> }
>```


> For use `typography` mixin `import` it in component and `include` it to class with name of typography from design.
> ```scss
> .target-class {
>     @include typography(typo-name);
> }
> ```
