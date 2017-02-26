const repl = require('repl')
const allIncluded = require('.')

const r = repl.start('> ')

const ids = r.context.ids = [1, 2, 3, 4, 5]
const refs = r.context.refs = [1, 2]
const nums = r.context.nums = [2, 4, 2, 3, 1]
const over9000s = r.context.over9000s = [9001, 9002]

const allIncludedInIds = r.context.allIncludedInIds = allIncluded(ids)
const allIncludedInOver9000s = r.context.allIncludedInOver9000s = allIncluded(over9000s)

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
