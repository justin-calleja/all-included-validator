> … currying is the technique of translating the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, each with a single argument.
>
> [Currying](https://en.wikipedia.org/wiki/Currying)

Take the following function as an example:

```js
function plus (x, y) {
  return x + y
}
```

The curried version of `plus` is:

```js
function curriedPlus (x) {
  return function (y) {
    return x + y
  }
}
```

`curriedPlus` takes its arguments one at a time. Each time we supply an argument, we get back a function which accepts one less argument than before. This process continues until we supply the final argument, at which point the function actually executes:

```js
const inc = curriedPlus(1)

inc(5)
// 6
```

In the above example, `inc`'s `x` is bound to `1`. This technique allows us to create specialized functions from more generic ones (`inc` is a specialized form of `plus` - and we can create it if `plus` were curried).

You can consider this technique as being a way of making functions configurable.

This leads to a bit more clutter when, instead of creating more functions, you just want to invoke a curried function like a normal function:

```js
curriedPlus(5)(6)
// 11
```

That is a design decision (the added configurability may justify the lesser known form of usage). Note that some libraries like [Ramda's curry](http://ramdajs.com/docs/#curry) have extra features that allow you to invoke a [curried function like a normal function](http://ramdajs.com/repl/?v=0.23.0#?function%20plus%20%28x%2C%20y%29%20%7B%0A%20%20return%20x%20%2B%20y%0A%7D%0A%0Aconst%20curriedPlus%20%3D%20R.curry%28plus%29%0A%0A%3B%5BcurriedPlus%281%29%282%29%2C%20curriedPlus%283%2C%204%29%5D):

```js
function plus (x, y) {
  return x + y
}

const curriedPlus = R.curry(plus)

;[curriedPlus(1)(2), curriedPlus(3, 4)]
// [3, 7]
```

You should **not** rely on these niceties unless they are explicitly documentated as being supported. Currying is not in-built to Javascript. In its simplest form, it can be easily emulated but supporting extra features like the ones you'll find in Ramda requires the addition of more code. If you're authoring several small packages making use of currying, you might not find it desirable to require your users (and yourself) to install these extra currying features with every one of your packages.
