/**
 * @module @justinc/all-included-validator
 */

/**
 * This function is curried. Checks to see that all elements in the given 2nd iterable are
 * members of the given 1st iterable.
 * @param  {Iterable} iterableA - The 1st iterable
 * @param  {Iterable} iterableB - The 2nd iterable, whose elements should all be in the 1st iterable
 * @param  {String} errMsgPrefix - A string to prefix the error message
 * (the err msg is any found 2nd iterable elems which are not in the 1st iterable)
 * @return {Tuple<Boolean, Array<Error>>}
 * @see {@link module:@justinc/jsdocs.Tuple}
 * @tutorial curry
 */
function allIncluded (iterableA) {
  return iterableB => errMsgPrefix => {
    const arrA = Array.from(iterableA)
    const bsNotInA = [...iterableB].filter(elOfB => !arrA.includes(elOfB))
    return bsNotInA.length === 0
      ? [ true, [] ]
      : [ false, [ new Error(`${errMsgPrefix || ''}${bsNotInA.join(', ')}`) ] ]
  }
}

module.exports = allIncluded
