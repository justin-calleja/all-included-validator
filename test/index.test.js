import test from 'ava'
import allIncluded from '..'

test('Should give [ true, [] ] when all 2nd iter els are in 1st', t => {
  t.deepEqual(allIncluded([1, 2, 3])([1, 2])(), [ true, [] ])
})

test('Should give [ true, [] ] when given [] for both 1st and 2nd iter', t => {
  t.deepEqual(allIncluded([])([])(), [ true, [] ])
})

test('Should give [ true, [] ] when not given both iterables', t => {
  t.deepEqual(allIncluded()()(), [ true, [] ])
})

test('Should give [ true, [] ] when not given 2nd iterable', t => {
  t.deepEqual(allIncluded([1, 2])()(), [ true, [] ])
})

test('Should work with iterables not just arrays', t => {
  const iterableA = {}
  iterableA[Symbol.iterator] = function* () {
    yield 1
    yield 2
    yield 3
  }
  const iterableB = {}
  iterableB[Symbol.iterator] = function* () {
    yield 1
    yield 2
  }
  t.deepEqual(allIncluded(iterableA)(iterableB)(), [ true, [] ])
})

test('Should give [ false, [errors] ] when not all 2nd iter els are in 1st', t => {
  const validation = allIncluded([1, 2])([1, 2, 3, 4])()
  t.false(validation[0])
  t.is(validation[1].length, 1)
  t.true(typeof validation[1][0].message === 'string')
  t.true(validation[1][0].message.endsWith('3, 4') || validation[1][0].message.endsWith('4, 3'))
})

test('Should prefix the Error message with the given prefix when not all 2nd iter els are in 1st', t => {
  const prefix = 'Not all are included: '
  const validation = allIncluded([1, 2])([1, 2, 3, 4])(prefix)
  t.false(validation[0])
  t.is(validation[1].length, 1)
  t.true(validation[1][0].message.startsWith(prefix))
  t.true(validation[1][0].message.endsWith('3, 4') || validation[1][0].message.endsWith('4, 3'))
})
