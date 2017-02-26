# `all-included-validator` [![Build status][travis-image]][travis-url] [![NPM version][version-image]][version-url] [![License][license-image]][license-url] [![Semantic Release][semantic-release-image]][semantic-release-url] [![Js Standard Style][standard-image]][standard-url]

## Install

`npm i @justinc/all-included-validator`

### Demo

(look at tests for more examples)

```js
// NOTE: run  `node repl.js` to see this in action:
const allIncluded = require('@justinc/all-included-validator')

const ids = [1, 2, 3, 4, 5]
const refs = [1, 2]
const nums = [2, 4, 2, 3, 1]
const over9000s = [9001, 9002]

const allIncludedInIds = allIncluded(ids)
const allIncludedInOver9000s = allIncluded(over9000s)

console.log(allIncludedInIds(refs)('The following refs are not in ids: '))
// [ true, [] ]

console.log(allIncludedInIds(nums)())
// [true, [] ]

const allOver9000sIncludedInIds = allIncludedInIds(over9000s)
console.log(allOver9000sIncludedInIds('The following are not in ids: '))
// [ false, [ new Error('The following are not in ids: 9001, 9002') ]]

console.log(allOver9000sIncludedInIds('Ids knows not of these: '))
// [ false, [ new Error('Ids knows not of these: 9001, 9002') ]]

console.log(allIncludedInOver9000s(ids)(`These ids aren't even over 9000: `))
// [ false, [ new Error(`These ids aren't even over 9000: : 1, 2, 3, 4, 5`) ]]
```

### [combine-validations](https://github.com/justin-calleja/combine-validations)

If you're OK with using [Folktale Validation](http://docs.folktalejs.org/en/latest/api/data/validation/Validation.html), you might be interested in [combine-validations](https://github.com/justin-calleja/combine-validations).

To use this package with `combine-validations` you will need to convert its output `Tuple<Boolean, Array<Error>>` to a Folktale Validation with something like this:

```js
const Validation = require('data.validation')
const allIncluded = require('@justinc/all-included-validator')
const combineValidations = require('@justinc/combine-validations')

const { Success, Failure } = Validation

const asValidation = ([isValid, errors]) => isValid ? Success(true) : Failure(errors)

const ids = ['node1', 'node2', 'node3']
const dependencies = [ 'node1', 'node3' ]
const validation = combineValidations([
  asValidation(allIncluded(ids)(dependencies)())
])
```

### Tutorials

TODO: A JSDoc 3 tutorial (re currying) needs to be injected in this README.md. For now there's only a link:

* tutorial: [curry.md](https://github.com/justin-calleja/jsdocs/blob/master/tutorials/curry.md)
* issue: [jsdoc2md/jsdoc-to-markdown#115](https://github.com/jsdoc2md/jsdoc-to-markdown/issues/115)

## Modules

<dl>
<dt><a href="#module_@justinc/all-included-validator">@justinc/all-included-validator</a></dt>
<dd></dd>
<dt><a href="#module_@justinc/jsdocs">@justinc/jsdocs</a></dt>
<dd><p>This module houses JSDoc 3 type definitions which can be re-used in different packages.</p>
</dd>
</dl>

<a name="module_@justinc/all-included-validator"></a>

## @justinc/all-included-validator
<a name="module_@justinc/all-included-validator..allIncluded"></a>

### @justinc/all-included-validator~allIncluded([iterableA], [iterableB], [errMsgPrefix]) ⇒ <code>Tuple.&lt;Boolean, Array.&lt;Error&gt;&gt;</code>
This function is curried. Checks that all elements in the given 2nd iterable are
members of the given 1st iterable.

**Kind**: inner method of <code>[@justinc/all-included-validator](#module_@justinc/all-included-validator)</code>  
**See**: [Tuple](#module_@justinc/jsdocs.Tuple)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [iterableA] | <code>Iterable</code> | <code>[]</code> | The 1st iterable |
| [iterableB] | <code>Iterable</code> | <code>[]</code> | The 2nd iterable, whose elements should all be in the 1st iterable |
| [errMsgPrefix] | <code>String</code> | <code>&#x27;&#x27;</code> | A string to prefix the error message (the err msg is any found 2nd iterable elems which are not in the 1st iterable) |

<a name="module_@justinc/jsdocs"></a>

## @justinc/jsdocs
This module houses JSDoc 3 type definitions which can be re-used in different packages.

<a name="module_@justinc/jsdocs.Tuple"></a>

### @justinc/jsdocs.Tuple : <code>Array</code>
The type `Tuple` is an `Array` of fixed length whose elements at specific
indices are of the specified types.

**Kind**: static typedef of <code>[@justinc/jsdocs](#module_@justinc/jsdocs)</code>  
**Example**  
```js
// A Tuple of arity (length) 2, whose first el is a Boolean and second el is
// an Array of Error:
Tuple<Boolean, Array<Error>>
// e.g. [ true, [] ]
// e.g. [ false, [ new Error('computer says no') ] ]
```
**Example**  
```js
// A Tuple of arity (length) 3, whose first el is a String, and both the
// second and third els are an Array of String:
Tuple<String, Array<String>, Array<String>>
// e.g. [ 'hello', [ 'world' ], [ 'goodbye', 'world' ] ]
```

[travis-image]: https://img.shields.io/travis/justin-calleja/all-included-validator.svg?style=flat-square
[travis-url]: https://travis-ci.org/justin-calleja/all-included-validator

[version-image]: https://img.shields.io/npm/v/@justinc/all-included-validator.svg?style=flat-square
[version-url]: https://npmjs.org/package/@justinc/all-included-validator

[standard-image]: https://img.shields.io/badge/code-standard-yellow.svg?style=flat-square
[standard-url]: https://github.com/feross/standard

[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release-url]: https://github.com/semantic-release/semantic-release

[license-image]: https://img.shields.io/badge/License-MIT-orange.svg?style=flat-square
[license-url]: ./LICENSE
