const { log } = console
const { stringify } = JSON

/*** Starting Out ***/

// Simple Arithmetic
log(2 + 15)         // 17
log(49 * 100)       // 4900
log(1892 - 1472)    // 420
log(5 / 2)          // 2.5

// Parens
log((50 * 100) - 4999)  // 1
log(50 * 100 - 4999)    // 1
log(50 * (100 - 4999))  // -244950

// Boolean Algebra
log(true && false)      // false
log(true && true)       // true
log(false || true)      // true
log(!false)             // true
log(!(true && true)) // false

// Equality Testing
log(5 === 5)                // true
log(1 === 0)                // false
log(5 !== 5)                // false
log(5 !== 4)                // true
log('hello' === 'hello')    // true

// Bad expressions
log(5 + 'llama')
// '5llama' (5 Converted into String)
log(5 === true)
// false (5 converted into Boolean false)

/* Boring Functions */
const succ = x => (x.charCodeAt ? x => String.fromCharCode(x) : x => x)((x.charCodeAt ? x.charCodeAt(0) : x) + 1)
const { min, max } = Math

log(succ(8))        // 9
log(min(9, 10))     // 9
log(min(3.4, 3.2))  // 3.2
log(max(100, 101))  // 101

// Function application
log(succ(9) + max(5, 4) + 1)        // 16
log((succ(9)) + (max(5, 4)) + 1)    // 16
log(succ(9) * 10)                   // 100
log(succ(9 * 10))                   // 91

// Infix operators in JS!
this['/'] = div = (a, b) => a / b
const i = ([_, f], ...rs) => eval(this[f.trim()] || f)(...rs)
const I = ([s]) => {
    let [a, f, b] = s.split(' ');
    return eval(this[f.trim()] || f)(a, b)
}

log(92 / 10)            // 9.2
log(div(92, 10))        // 9.2
log(i`${92} div ${10}`) // 9.2
log(i`${92} / ${10}`)   // 9.2
log(I`92 / 10`)         // 9.2
log(I`92 div 10`)       // 9.2

/* Baby's First Functions */
const doubleMe = x => x + x

log(doubleMe(9))    // 18
log(doubleMe(8.3))  // 16.6


let doubleUs = (x, y) => x * 2 + y * 2

log(doubleUs(4, 9))                     // 26
log(doubleUs(2.3, 34.2))                // 73
log(doubleUs(28, 88) + doubleMe(123))   // 478

// Refine doubleUs using smaller function doubleMe
doubleUs = (x, y) => doubleMe(x) + doubleMe(y)


let doubleSmallNumber = x => x > 100 ? x : x * 2
doubleSmallNumber2 = x => (x > 100 ? x : x * 2) + 1

log(doubleSmallNumber2(30))

// In order to use ' as a valid identifier we have to make
// it a property of the this and use string keys, BONUS: We
// can use ANY character not just the single tick in JS!
this["conanO'Brien"] = "It's a-me, Conan O'Brien!"
log(this["conanO'Brien"])


/* An Intro to Lists */
const lostNumbers = [4, 8, 15, 16, 23, 42]
log(lostNumbers)    // [4, 8, 15, 16, 23, 42]

// Unlike Haskell we CAN use different types in a list!
log([1,2,'a',3,'b','c',4])  // [1,2,'a',3,'b','c',4]


// "hello" is just syntactic sugar for ['h','e','l','l','o'].
// In JS to convert a String to an Array we use .split('')
// Then we can use list functions on them, which is really handy
log("hello".split(''))  // ['h', 'e', 'l', 'l', 'o']

// In JS we use .concat() instead of ++
log([1, 2, 3, 4].concat([9, 10, 11, 12]))
// Or use spread operator
log([1, 2, 3, 4, ...[9, 10, 11, 12]])

// Concat Strings using the concatenation operator (+)
log('hello' + ' ' + 'world')
// In JS to convert from Array back to String use .join('')
log(['w', 'o'].concat(['o', 't']).join(''))

/* Cons Operator */
// JS does not differentiate between characters and Strings
// There is no cons operator (:) but you could unshift a single string onto the array?
this[':'] = cons = (a, b) => [a, ...(Array.isArray(b) ? b : b.split(''))]
log(i`${'A'} cons ${" SMALL CAT"}`.join(''))    // "A SMALL CAT"
log(i`${5} : ${[1,2,3,4,5]}`)

// In JS 1:2:3:[] is equivalent to [1, ...[2, ...[3]]]
// [].concat(1).concat(2).concat(3)
log([1, ...[2, ...[3]]])                // [1, 2, 3]
log([].concat(1).concat(2).concat(3))   // [1, 2, 3]

this['!!'] = at = (a, i) => a[i]
log("Steve Buscemi"[6])             // B
log("Steve Buscemi".charAt(6))      // B
log(i`${"Steve Buscemi"} !! ${6}`)  // B

let xs = [9.4, 33.2, 96.2, 11.2, 23.25]
log(xs[1])              // 33.2
log(i`${xs} !! ${1}`)   // 33.2


let b = [[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3]]
log(b)                      // [[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3]]
log([...b, ...[[1,1,1,1]]]) // [[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3],[1,1,1,1]]
log([[6,6,6], ...b])        // [[6,6,6],[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3]]
log(b[2])                   // [1,2,2,3,4]
log(i`${b} !! ${2}`)        // [1,2,2,3,4]

// JS does not have out of the box comparison against Arrays :'(
// So we roll out own using every and currying!
const acmp = f => (a,b) => a.every((x,i) => f(x, b[i]))
const agt = acmp((a, b) => a > b)
log(agt([3,2,1], [2,1,0]))
log(acmp((a,b) => a === b)([1,1,1], [1,1,1]))
this['[=]'] = acmp((a,b) => a === b)
log(i`${[1,2,3]} [=] ${[1,2,3]}`)

/* List Functions */
const head = ([x]) => x
log(head([5,4,3,2,1]))  // 5

const tail = ([x, ...xs]) => xs
log(tail([5,4,3,2,1]))  // [4,3,2,1]

// In JS to do negative indices
// we have to use .slice(index)[0]
const last = (xs) => xs.slice(-1)[0]
log(last([5,4,3,2,1]))  // 1

const init = (xs) => xs.slice(0, -1)
log(init([5,4,3,2,1]))  // [5,4,3,2]

// In JS when we take the head of an empty Array
// we don't get an error we get undefined.
log(head([]))   // undefined

const length = xs => xs.length
log(length([5,4,3,2,1]))    // 5

// In JS null is a keyword we cannot use
// it as an identifier so we use this[null] or under it.
this['null'] = _null = xs => xs.length === 0
log(_null([1,2,3]))     // false
log(this['null']([]))   // true

const reverse = xs => { xs.reverse(); return xs; }
log(reverse([5,4,3,2,1]))   // [1,2,3,4,5]

const take = (n, xs) => xs.slice(0, n)
log(take(3, [5,4,3,2,1]))   // [5,4,3]
log(take(1, [3,9,3]))       // [3]
log(take(5, [1,2]))         // [1,2]
log(take(0, [6,6,6]))       // []

const drop = (n, xs) => xs.slice(n)
log(drop(3, [84,4,2,1,5,6]))    // [1,5,6]
log(drop(0, [1,2,3,4]))         // [1,2,3,4]
log(drop(100, [1,2,3,4]))       // []

const maximum = xs => max(...xs)
const minimum = xs => min(...xs)
log(minimum([8,4,2,1,5,6]))     // 1
log(maximum([1,9,2,3,4]))       // 9
// log(minimum(['A', 'B']))        // 'A'

let sum = xs => xs.reduce((a,b) => a + b)
log(sum([5,2,1,6,3,2,5,7]))     // 31

const product = xs => xs.reduce((a,b) => a * b)
log(product([6,2,1,2]))         // 24

const elem = (x, xs) => xs.includes(x)
log(elem(4, [3,4,5,6]))         // true
log(i`${10} elem ${[3,4,5,6]}`)  // false


/* Texas Ranges */
const range = (a, b, n=1) => Array.from({ length: ((b - a) / n) + 1 }).map((_, i) => (i * n) + a)

const abn = s => {
    let [x, b] = s.slice(1, -1).split('..')
    let [a, n] = x.split(',')
    return { a, b, n }
}

const nr = s => {
    let { a, b, n } = abn(s)
    return range(...[a, b].map(x => +x), n ? n - a : 1)
}

const cr = s => {
    let { a, b, n } = abn(s)
    let cs = [a, b].map(x => eval(x).charCodeAt(0))
    return range(...cs, n ? eval(n).charCodeAt(0) - cs[0] : 1)
        .map(x => String.fromCharCode(x)).join('')
}

const r = ([s]) => (/\d/.test(s) ? nr : cr)(s)

log(range(1, 20))      // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
log(r`[1..20]`)        // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
log(r`['a'..'z']`)     // "abcdefghijklmnopqrstuvwxyz""
log(r`['K'..'Z']`)      // "KLMNOPQRSTUVWXYZ"
log(r`['A','C'..'U']`)  // "ACEGIKMOQSU"
// [2,4..10]
log(range(2, 10, 2))    // [2,4,6,8,10]
log(nr('[2..10]'))      // [2,3,4,5,6,7,8,9,10]
log(r`[2,4..10]`)       // [2,4,6,8,10]

// DONT USE FLOATS IN RANGES
log(r`[0.1,0.3..1.0]`)  //??? [ 0.1, 0.3, 0.5, 0.7, 0.8999999999999999 ]

/* Range Functions */
// In JS we use generators to simulate infinite lists
const cycle = function* (xs) {
    let i = 0;
    while (true) yield xs[i++ % xs.length]
}

// Helper for stopping infinite lists
const list = (n, xs, g) => {
    let j = 0
    let r = []
    for (let x of g(xs)) {
        j++
        r.push(x)
        if (j === n) break
    }
    return r
}

// take 10 (cycle [1,2,3])
log(cycle([1,2,3]))                     // Object { } Generator (cycle function*)
// for (let x of cycle([1,2,3])) log(x) // 123123123...
log(list(10, [1, 2, 3], cycle))         // [1,2,3,1,2,3,1,2,3,1]
let lc = list(12, r`['A'..'F']`, cycle)
log(take(6, drop(2, reverse(lc))))      // ['D','C','B','A','F','E']
log(take(12, list(12, "LOL ", cycle)).join(''))   // "LOL LOL LOL "

const repeat = function* (n) { while (true) yield n }

// for (let x of repeat(5)) log(x)      // 555555555555555555...
log(take(10, list(10, 5, repeat)))      // [5,5,5,5,5,5,5,5,5,5]

const replicate = function* (n, x) {
    let i = 0
    while (true) {
        yield x
        i++
        if (i === n) return
    }
}

log(Array.from(replicate(3, 10)))       // [10,10,10]


/* I'm a list comprehension */
// [x*2 | x <- [1..10]]
// const c = ([s], ...rs) => {
//     let [f, xs] = s.slice(1,-1).split('|')
//     let [v, r] = xs.split('<-')
//     let {a, b, n} = abn(r.trim())
//     let m = `(${v.trim().split(',')}) => ${f}`
//     return eval(`range(${a},${b}${n ? `,${n}`:''}).map(${m})`)
// }

const c = ([s], ...rs) => {
    let [f, xs] = s.slice(1,-1).split('|')
    let [v, r] = xs.split('<-')
    let [ra, ff] = r.trim().split(',')
    let {a, b, n} = abn(ra.trim())
    let al = `(${v.trim().split(',')})`
    let m = `${al} => ${f}`
    ff = ff ? `${al} => ${ff.trim()}` : null
    return (`range(${a},${b}${n ? `,${n}`:''})${ff ? `.filter(${ff})` : ''}.map(${m})`)
}

log(c`[x*2 | x <- [1..10]]`)
log(r`[1..10]`.map(x => x * 2))       // [2,4,6,8,10,12,14,16,18,20]
log(range(1, 10).map(x => x * 2))
log(nr('[1..10]').map(x => x * 2))

// [x*2 | x <- [1..10], x*2 >= 12]
log(c`[x*2 | x <- [1..10], x*2 >= 12]`)
log(range(1, 10).filter(x => x * 2 >= 12).map(x => x * 2))  // [ 12, 14, 16, 18, 20 ]

log(c`[ x | x <- [50..100], x % 7 == 3]`)
log(range(50,100).filter((x) => x % 7 == 3).map((x) => x))  //[ 52, 59, 66, 73, 80, 87, 94 ]

const odd = n => n % 2 !== 0
// boomBangs xs = [ if x < 10 then "BOOM!" else "BANG!" | x <- xs, odd x]
const boomBangs = xs => xs.filter(odd).map(x => x < 10 ? 'BOOM!' : 'BANG!')
log(boomBangs(range(7, 13)))  // ["BOOM!","BOOM!","BANG!","BANG!"]

// Note C Strings cannot handle multiple if conditions or nesting :(
// [ x | x <- [10..20], x /= 13, x /= 15, x /= 19]
log(range(10, 20).filter(x => ![13, 15, 19].includes(x))) // [10,11,12,14,16,17,18,20]
log(range(10, 20).filter(x => x !== 13 && x !== 15 && x !== 19)) // [10,11,12,14,16,17,18,20]

// [ x*y | x <- [2,5,10], y <- [8,10,11]]
log([2, 5, 10].flatMap(x => [8, 10, 11].flatMap(y => x * y)))  // [16,20,22,40,50,55,80,100,110]

// [ x*y | x <- [2,5,10], y <- [8,10,11], x*y > 50]
log([2,5,10].flatMap(x => [8,10,11].map(y => x * y > 50 ? x * y : null)).filter(x => x))
// [55,80,100,110]

// ghci> let nouns = ["hobo","frog","pope"]
const nouns = ["hobo", "frog", "pope"]
// ghci> let adjectives = ["lazy","grouchy","scheming"]
const adjectives = ["lazy","grouchy","scheming"]
// ghci> [adjective ++ " " ++ noun | adjective <- adjectives, noun <- nouns]
log(adjectives.flatMap(adjective => nouns.map(noun => `${adjective} ${noun}`)))
// ["lazy hobo","lazy frog","lazy pope","grouchy hobo","grouchy frog",
// "grouchy pope","scheming hobo","scheming frog","scheming pope"]

// length' xs = sum [1 | _ <- xs]
const length2 = xs => sum(xs.map(_ => 1))
log(length2([1, 2, 3, 4]))  // 4

// removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]
const removeNonUppercase = st => st.split('').filter(c => i`${c} elem ${r`['A'..'Z']`}`).join('')
log(removeNonUppercase("Hahaha! Ahahaha!")) // "HA"
log(removeNonUppercase("IdontLIKEFROGS"))   // "ILIKEFROGS"

// ghci> let xxs = [[1,3,5,2,3,1,2,4,5],[1,2,3,4,5,6,7,8,9],[1,2,4,2,1,6,3,1,3,2,3,6]]
let xxs = [[1,3,5,2,3,1,2,4,5],[1,2,3,4,5,6,7,8,9],[1,2,4,2,1,6,3,1,3,2,3,6]]
// ghci> [ [ x | x <- xs, even x ] | xs <- xxs]
const even = n => n % 2 === 0
log(xxs.map(xs => xs.filter(even)))
// [[2,2,4],[2,4,6,8],[2,4,2,6,2,6]]

// In JS tuples just don't work, parens returns the last expression only.
// BUT we can use just plain array's since we can mix types
// OR object literals with key syntax BUT we have to do Object.keys(..) if
// we want to access values positionaly.
log(("Wow", false))                 // NOPE! Just returns false
log(["Wow", false])                 // ["Wow", false]
log({Wow: "Wow", false: "false"})   // {Wow: "Wow", false: false}
let t = {Wow: "Wow", false: "false"}
log(Object.keys(t)[0])              // Wow

const fst = ([x]) => x
log(fst([8, 11]))                   // 8
log(fst(["Wow", false]))            // "Wow"

const snd = ([_, x]) => x
log(snd([8, 11]))                     // 11
log(snd(["Wow", false]))            // false

const zip = (xs, ys) => xs.map((x, i) => [x, ys[i]]).filter(([_, x]) => x)
log(zip([1,2,3,4,5],[5,5,5,5,5]))   // [(1,5),(2,5),(3,5),(4,5),(5,5)]

log(zip(range(1, 5), ["one", "two", "three", "four", "five"]))
// [[1,"one"],[2,"two"],[3,"three"],[4,"four"],[5,"five"]]

log(zip([5,3,2,6,2,7,2,5,4,6,6],["im","a","turtle"]))
// [ [ 5, 'im' ], [ 3, 'a' ], [ 2, 'turtle' ] ]

// ghci> zip [1..] ["apple", "orange", "cherry", "mango"]
const ifrom = function* (n) { let i = n; while (true) { yield i++ } }
const irange = function* (a, b, n=1) { let i = a; while (i <= b) { yield i; i += n } }
log(zip( Array.from( list(4, 1, ifrom) ), ["apple", "orange", "cherry", "mango"] ))
// [ [ 0, 'apple' ], [ 1, 'orange' ], [ 2, 'cherry' ], [ 3, 'mango' ] ]


// Here's a problem that combines tuples and list comprehensions:
// which right triangle that has integers for all sides and all sides
// equal to or smaller than 10 has a perimeter of 24?

// let triangles = [ (a,b,c) | c <- [1..10], b <- [1..10], a <- [1..10] ]
let perimeter = (a,b,c) => a + b + c
let isRight = (a,b,c) => a ** 2 + b ** 2 === c ** 2
let rng = range(1, 10)
let triangles = rng.flatMap(c =>
                    rng.flatMap(b =>
                        rng.map(a =>
                            isRight(a,b,c) && perimeter(a,b,c) == 24 ?
                                [a, b, c]
                              : null))).filter(x => x)
log(triangles)
// [ [ 8, 6, 10 ], [ 6, 8, 10 ] ]


/*** Types and Typeclasses ***/

// factorial :: Integer -> Integer
// factorial n = product [1..n]

// factorial :: Number -> Number
const factorial = n => product(range(1, n))
log(factorial(50))      // 30414093201713378043612608166064768844377641568960512000000000000

log("Abrakadabra" < "Zebra")    // true
log(succ('B'))  // 'C'
log(succ(8))    // 9

const minBound = t => ({ [Number]: Number.MIN_VALUE, [Boolean]: false })[t]
const maxBound = t => ({ [Number]: Number.MAX_VALUE, [Boolean]: true })[t]

log(minBound(Number))   // 5e-324
log(maxBound(Number))   // 1.7976931348623157e+308
log(minBound(Boolean))  // false
log(maxBound(Boolean))  // true


/*** Syntax in Functions ***/
// lucky :: (Integral a) => a -> String
// lucky 7 = "LUCKY NUMBER SEVEN!"
// lucky x = "Sorry, you're out of luck, pal!"

// In JS we have to extract all params and then check
// then in nested ternary checks.

// lucky :: (Number a) => a -> String
const lucky = x =>
              x == 7 ? "LUCKY NUMBER SEVEN!"
              : "Sorry, you're out of luck, pal!"


// sayMe :: (Integral a) => a -> String
// sayMe 1 = "One!"
// sayMe 2 = "Two!"
// sayMe 3 = "Three!"
// sayMe 4 = "Four!"
// sayMe 5 = "Five!"
// sayMe x = "Not between 1 and 5"

// In JS we could also use an Object to
// map parameter values to return values
// use pipe for base/otherwise case.

// sayMe :: (Number a) => a -> String
const sayMe = x => ({
        1: "One",
        2: "Two!",
        3: "Three!",
        4: "Four!",
        5: "Five!"
    })[x]
    || "Not between 1 and 5"

log(sayMe(1))   // One
log(sayMe(3))   // Three!
log(sayMe(6))   // Not between 1 and 5


// factorial :: (Integral a) => a -> a
// factorial 0 = 1
// factorial n = n * factorial (n - 1)

// In JS we don't need to specify that this function is recursive.
// factorial :: (Number a) => a -> a
const factorial2 = n => n == 0 ? 1 : n * factorial2(n - 1)
log(factorial2(3))  // 6


// It complains that we have non-exhaustive patterns, and rightfully so. When making patterns, we should always include a catch-all pattern so that our program doesn't crash if we get some unexpected input.
// charName :: Char -> String
// charName 'a' = "Albert"
// charName 'b' = "Broseph"
// charName 'c' = "Cecil"
// ghci> charName 'h'
// "*** Exception: tut.hs:(53,0)-(55,21): Non-exhaustive patterns in function charName

// In JS we don't out of the box throw an exception, but we can just define NEPError and
// have to remember to throw ot the end of important patterns to match.
const NEPError = f => { throw `Non-exhaustive patterns in function ${f.name}` }
const charName = x => ({'a': 'Albert', 'b': 'Broseph', 'c': 'Cecil'})[x] || NEPError(charName)

log(charName('b'))      // Broseph
// log(charName('h'))      // Error: Non-exhaustive patterns in function charName


// addVectors :: (Num a) => (a, a) -> (a, a) -> (a, a)
// addVectors a b = (fst a + fst b, snd a + snd b)

let addVectors = (a, b) => [fst(a) + fst(b), snd(a) + snd(b)]
log(addVectors([1, 2], [3, 4]))


// addVectors :: (Num a) => (a, a) -> (a, a) -> (a, a)
// addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)

// In JS we already have patterning matching!!
// addVectors :: (Num a) => (a, a) -> (a, a) -> (a, a)
addVectors = ([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2]
log(addVectors([1, 2], [3, 4])) // [4, 6]


// first (x, _, _) = x
  // second (_, y, _) = y
// third (_, _, z) = z
const first = ([x, _, __]) => x
const second = ([_, y, __]) => y
const third = ([_, __, z]) => z


// Pattern matching in comprehensions
// ghci> let xs = [(1,3), (4,3), (2,4), (5,3), (5,6), (3,1)]
// ghci> [a+b | (a,b) <- xs]
// [4,7,6,8,11,4]

// In JS we can do pattern matching in lambdas while mapping to
let xs2 =  [[1,3],[4,3],[2,4],[5,3],[5,6],[3,1]]
log(xs2.map(([a, b]) => a + b))

// We can use the error function to throw in expressions.
// To throw an error be sure to put it as the last case in JS!
const error = msg => { throw msg }
const head2 = ([x]) => x || error("Can't call head on an empty list, dummy!")

log(head2([1,2,3])) // 1
// log(head2([]))      // Error: Can't call head on an empty list, dummy!

// length' :: (Num b) => [a] -> b
// length' [] = 0
// length' (_:xs) = 1 + length' xs
const lengthr = ([x, ...xs]) => x ? 1 + lengthr(xs) : 0
log(lengthr("ham"))         // 3
log(lengthr(r`[1..10]`))    // `10

// sum' :: (Num a) => [a] -> a
// sum' [] = 0
// sum' (x:xs) = x + sum' xs
const sumr = ([x, ...xs]) => x + sumr(xs)
log(sum([1, 2, 3, 4, 5]))   // 15


// In JS we don't have As Patterns, we just have to destructure the arg.

// capital :: String -> String
// capital "" = "Empty string, whoops!"
// capital all@(x:xs) = "The first letter of " ++ all ++ " is " ++ [x]
const capital = all => {
    let [x, ...xs] = all
    return all ? `The first letter of ${all} is ${x}` : 'Emptry string, whoops!'
}

log(capital('Dracula')) // The first letter of Dracula is D
log(capital(''))        // Emptry string, whoops!


/* Guards, Guards! */
// In JS we don't have guards, BUT we can use nested ternaries!

// bmiTell :: (RealFloat a) => a -> String
// bmiTell bmi
//     | bmi <= 18.5 = "You're underweight, you emo, you!"
//     | bmi <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"
//     | bmi <= 30.0 = "You're fat! Lose some weight, fatty!"
//     | otherwise   = "You're a whale, congratulations!"

let bmiTell = bmi =>
              bmi <= 18.5 ? "You're underweight, you emo, you!"
            : bmi <= 25.0 ? "You're supposedly normal. Pffft, I bet you're ugly!"
            : bmi <= 30.0 ? "You're fat! Lose some weight, fatty!"
            : "You're a whale, congratulations!"

log(bmiTell(18.5))  // You're underweight, you emo, you!
log(bmiTell(28.25)) // You're fat! Lose some weight, fatty!
log(bmiTell(50))    // You're a whale, congratulations!


// bmiTell :: (RealFloat a) => a -> a -> String
// bmiTell weight height
//     | weight / height ^ 2 <= 18.5 = "You're underweight, you emo, you!"
//     | weight / height ^ 2 <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"
//     | weight / height ^ 2 <= 30.0 = "You're fat! Lose some weight, fatty!"
//     | otherwise                 = "You're a whale, congratulations!"

bmiTell = (weight, height) =>
           weight / height ** 2 <= 18.5 ? "You're underweight, you emo, you!"
         : weight / height ** 2 <= 25.0 ? "You're supposedly normal. Pffft, I bet you're ugly!"
         : weight / height ** 2 <= 30.0 ? "You're fat! Lose some weight, fatty!"
         : "You're a whale, congratulations!"

log(bmiTell(85, 1.90))  // You're supposedly normal. Pffft, I bet you're ugly!


// max' :: (Ord a) => a -> a -> a
// max' a b
//     | a > b     = a
//     | otherwise = b
let max2 = (a, b) => a > b ? a : b
log(max2(3, 4))  // 4

// myCompare :: (Ord a) => a -> a -> Ordering
// a `myCompare` b
//     | a > b     = GT
//     | a == b    = EQ
//     | otherwise = LT
const myCompare = (a, b) =>
                 a > b ? 'GT'
               : a == b ? 'EQ'
               : 'LT'

log(i`${3} myCompare ${2}`)   // GT
log(myCompare(3, 2))          // GT


/* Where!? */

// In JS we don't have a where clause we just define different
// variables with let/const before returning a nested ternary


// bmiTell :: (RealFloat a) => a -> a -> String
// bmiTell weight height
//     | bmi <= skinny = "You're underweight, you emo, you!"
//     | bmi <= normal = "You're supposedly normal. Pffft, I bet you're ugly!"
//     | bmi <= fat    = "You're fat! Lose some weight, fatty!"
//     | otherwise     = "You're a whale, congratulations!"
//     where bmi = weight / height ^ 2
//           skinny = 18.5
//           normal = 25.0
//           fat = 30.0
bmiTell = (weight, height) => {
    // where bmi = weight / height ^ 2
    //   (skinny, normal, fat) = (18.5, 25.0, 30.0)
    let bmi = weight / height ** 2,
        [skinny, normal, fat] = [18.5, 25, 30]

    return bmi <= skinny ? "You're underweight, you emo, you!"
         : bmi <= normal ? "You're supposedly normal. Pffft, I bet you're ugly!"
         : bmi <= fat ? "You're fat! Lose some weight, fatty!"
         : "You're a whale, congratulations!"
}

log(bmiTell(85, 1.90))  // You're supposedly normal. Pffft, I bet you're ugly!


// initials :: String -> String -> String
// initials firstname lastname = [f] ++ ". " ++ [l] ++ "."
//     where (f:_) = firstname
//           (l:_) = lastname
let initials = (firstname, lastname) => {
    let [f] = firstname,
        [l] = lastname
    return `${f}. ${l}.`
}

// Shorter and cleaner
initials = ([f], [l]) => `${f}. ${l}.`
log(initials('Michael', 'Schutt'))  // M. S.


// calcBmis :: (RealFloat a) => [(a, a)] -> [a]
// calcBmis xs = [bmi w h | (w, h) <- xs]
//     where bmi weight height = weight / height ^ 2
let calcBmis = xs => {
    let bmi = (weight, height) => weight / height ** 2
    return xs.map(([w, h]) => bmi(w, h))
}

log(calcBmis([[85, 1.90], [64, 3.2], [59, 0.8]]))
// [ 23.545706371191137, 6.249999999999999, 92.18749999999999 ]


/* Let it Be */
// cylinder :: (RealFloat a) => a -> a -> a
// cylinder r h =
//     let sideArea = 2 * pi * r * h
//         topArea = pi * r ^2
//     in  sideArea + 2 * topArea

const cylinder = (r, h) => {
    const { PI } = Math
    let sideArea = 2 * PI * r * h,
        topArea = PI * r ** 2
    return sideArea + 2 * topArea
}

// ghci> [if 5 > 3 then "Woo" else "Boo", if 'a' > 'b' then "Foo" else "Bar"]
// ["Woo", "Bar"]
// ghci> 4 * (if 10 > 5 then 10 else 0) + 2
// 42
log([5 > 3 ? 'Woo' : 'Boo', 'a' > 'b' ? 'Foo' : 'Bar']) // ['Woo', 'Bar']
log(4 * (10 > 5 ? 10 : 0) + 2)  // 42

// In JS inline let bindings in expressions use the parenthesis and comma
// operator with no let/const and a comma instead of the in keyword

// ghci> 4 * (let a = 9 in a + 1) + 2
// 42
log(4 * (a = 9, a + 1) + 2) // 42

// ghci> [let square x = x * x in (square 5, square 3, square 2)]
// [(25,9,4)]
log([(square = x => x * x, [square(5), square(3), square(2)])])
// [[25, 9, 4]]

// ghci> (let a = 100; b = 200; c = 300 in a*b*c, let foo="Hey "; bar = "there!" in foo ++ bar)
log([(a = 100, b = 200, C = 300, a * b * C), (foo = 'Hey ', bar = 'there!', foo + bar)])
// (6000000,"Hey there!")

// ghci> (let (a,b,c) = (1,2,3) in a+b+c) * 100
log(([a, b, C] = [1, 2, 3], a + b + C) * 100)
// 600

// calcBmis :: (RealFloat a) => [(a, a)] -> [a]
// calcBmis xs = [bmi | (w, h) <- xs, let bmi = w / h ^ 2]
calcBmis = xs => xs.map(([w, h]) => (bmi = w / h ** 2, bmi))
log(calcBmis([[85, 1.90]]))
// [ 23.545706371191137 ]

// calcBmis :: (RealFloat a) => [(a, a)] -> [a]
// calcBmis xs = [bmi | (w, h) <- xs, let bmi = w / h ^ 2, bmi >= 25.0]
calcBmis = xs => xs.map(([w, h]) => w / h ** 2).filter(bmi => bmi >= 25)
log(calcBmis([[85, 1.90], [95, 1.90]]))
// [ 26.315789473684212 ]

// In JS we don't have case statements so we can just use ternaries

// head' :: [a] -> a
// head' xs = case xs of [] -> error "No head for empty lists!"
//                       (x:_) -> x
let headr = xs =>
            _null(xs) ? error("No head for empty list")
                      : ([x] = xs, x)
log(headr([1,2,3]))     // 1
// log(headr([]))       // No head for empty list

// describeList :: [a] -> String
// describeList xs = "The list is " ++ case xs of [] -> "empty."
//                                                [x] -> "a singleton list."
//                                                xs -> "a longer list."
let describeList = a => {
    let [x, ...xs] = a
    return `The list is ${ _null(a) ? "empty" : x && _null(xs) ? "a singleton list" : "a longer list"}`
}

log(describeList([]))   // This list is empty
log(describeList([1]))  // The list is a singleton list
log(describeList([1,2,3]))  // The list is a longer list


// describeList :: [a] -> String
// describeList xs = "The list is " ++ what xs
//     where what [] = "empty."
//           what [x] = "a singleton list."
//           what xs = "a longer list."
describeList = a => {
    let what = ([x, ...xs]) => _null(xs) && !x ? "empty"
                              : x && _null(xs) ? "a singleton list"
                              : "a longer list"
    return `The list is ${what(a)}`
}

log(describeList([]))   // This list is empty
log(describeList([1]))  // The list is a singleton list
log(describeList([1,2,3]))  // The list is a longer list


// maximum' :: (Ord a) => [a] -> a
// maximum' [] = error "maximum of empty list"
// maximum' [x] = x
// maximum' (x:xs)
//     | x > maxTail = x
//     | otherwise = maxTail
//     where maxTail = maximum' xs
let maximumr = a => {
    let [x, ...xs] = a
    return _null(a) ? error("maximum of empty list")
          : x && _null(xs) ? x
          : x > maximumr(xs) ? x : maximumr(xs)
}

log(maximumr([1,2,3]))        // 3



// How's that for elegant! In essence,
// the maximum of a list is the max of the
// first element and the maximum of the tail.

// maximum' :: (Ord a) => [a] -> a
// maximum' [] = error "maximum of empty list"
// maximum' [x] = x
// maximum' (x:xs) = max x (maximum' xs)
let maximumm = a => {
    let [x, ...xs] = a
    return _null(a) ? error("maximum of empty list")
            : x && _null(xs) ? x
            : max(x, maximumm(xs))
}
log(maximumm([1,2,3]))        // 3


// replicate' :: (Num i, Ord i) => i -> a -> [a]
// replicate' n x
//     | n <= 0    = []
//     | otherwise = x:replicate' (n-1) x

const replicater = (n, x) => n <= 0 ? [] : [x, ...replicater(n - 1, x)]
log(replicater(3, 1))   // [1,1,1]


// take' :: (Num i, Ord i) => i -> [a] -> [a]
// take' n _
//     | n <= 0   = []
// take' _ []     = []
// take' n (x:xs) = x : take' (n-1) xs
const taker = (n, [x, ...xs]) =>
    n <= 0 ? []
    : !x ? []
    : [x, ...taker(n - 1, xs)]

log(taker(3, [1, 2, 3, 4, 5]))      // [1, 2, 3]


// reverse' :: [a] -> [a]
// reverse' [] = []
// reverse' (x:xs) = reverse' xs ++ [x]
let reverser = ([x, ...xs]) => !x && _null(xs) ? [] : [...reverser(xs), x]
log(reverser([1, 2, 3]))    // [3, 2, 1]

// In JS we don't have tail call optimization or infinite lists.
// We can generally use generators to simulate Haskell's infinite lists
// but there is no such thing as a generator arrow function so we cannot yield

// repeat' :: a -> [a]
// repeat' x = x:repeat' x
const repeatr = function* (x) { while (true) yield x } // yield [x, ...repeatr(x)]
log( list(10, 'A', repeatr) )   // "AAAAAAAAAAA"

// zip' :: [a] -> [b] -> [(a,b)]
// zip' _ [] = []
// zip' [] _ = []
// zip' (x:xs) (y:ys) = (x,y):zip' xs ys
const zipr = ([x, ...xs], [y, ...ys]) => [[x, y], ...zip(xs, ys)]
log(zipr([1, 2, 3], ['a', 'b', 'c']))   // [[1, 'a'], [2, 'b'], [3, 'c']]

// elem' :: (Eq a) => a -> [a] -> Bool
// elem' a [] = False
// elem' a (x:xs)
//     | a == x    = True
//     | otherwise = a `elem'` xs
const elemr = (e, a) => {
    let [x, ...xs] = a
    return e === x ? true : elem(e, xs)
}
log(elemr('a', 'hello'))    // false
log(elemr('a', 'hola'))     // true


/* Quick, sort! */

// quicksort :: (Ord a) => [a] -> [a]
// quicksort [] = []
// quicksort (x:xs) =
//     let smallerSorted = quicksort [a | a <- xs, a <= x]
//         biggerSorted = quicksort [a | a <- xs, a > x]
//     in  smallerSorted ++ [x] ++ biggerSorted

const quicksort = ([x, ...xs]) =>
    !x && _null(xs) ? [] : [
        ...quicksort(xs.filter(a => a <= x)),
        x,
        ...quicksort(xs.filter(a => a > x))
    ]

// ghci> quicksort [10,2,5,3,1,6,7,4,2,3,4,8,9]
// [1,2,2,3,3,4,4,5,6,7,8,9,10]
// ghci> quicksort "the quick brown fox jumps over the lazy dog"
// "        abcdeeefghhijklmnoooopqrrsttuuvwxyz"

log(quicksort([10,2,5,3,1,6,7,4,2,3,4,8,9]))      // [1,2,2,3,3,4,4,5,6,7,8,9,10]
log(quicksort("the quick brown fox jumps over the lazy dog").join('')) // "        abcdeeefghhijklmnoooopqrrsttuuvwxyz"


/*** Higher order functions ***/

/* Curried functions */

// In JS we have to define a curry helper function. So if we
// want to use a function curried we call curry(func)(...) instead.
const curry = fn => (...args) => fn.bind(null, ...args)
log(max(4, 5))  // 5
log(curry(max)(4)(5))  // 5

// multThree :: (Num a) => a -> a -> a -> a
// multThree x y z = x * y * z
const multThree = (x, y, z) => x * y * z

// ghci> let multTwoWithNine = multThree 9
let multTwoWithNine = curry(multThree)(9)
// ghci> multTwoWithNine 2 3
log(multTwoWithNine(2, 3))
// 54
// ghci> let multWithEighteen = multTwoWithNine 2
let multWithEighteen = curry(multTwoWithNine)(2)
// ghci> multWithEighteen 10
log(multWithEighteen(10))
// 180


// compareWithHundred :: (Num a, Ord a) => a -> Ordering
// compareWithHundred x = compare 100 x
let compareWithHundred = x => myCompare(100, x)
log(compareWithHundred(350))    // LT

// compareWithHundred :: (Num a, Ord a) => a -> Ordering
// compareWithHundred = compare 100
compareWithHundred = curry(myCompare)(100)
log(compareWithHundred(50))    // GT

// divideByTen :: (Floating a) => a -> a
// divideByTen = (/10)
const divideByTen = curry(this['/'])(50)
log(divideByTen(10))   // 5

// isUpperAlphanum :: Char -> Bool
// isUpperAlphanum = (`elem` ['A'..'Z'])
const isUpperAlphanum = curry(elem)(range('A', 'Z'))
log(isUpperAlphanum('A'))   // true

/* Some higher-orderism is in order */
// applyTwice :: (a -> a) -> a -> a
// applyTwice f x = f (f x)
const applyTwice = (f, x) => f(f(x))
log(applyTwice(x => x + 3, 10)) // 16

// ghci> applyTwice (++ " HAHA") "HEY"
log(applyTwice(x => `${x} HAHA`, "HEY"))    // HEY HAHA HAHA

// ghci> applyTwice (multThree 2 2) 9
log(applyTwice(curry(multThree)(2, 2), 9)) // 144

// applyTwice (3:) [1]
log(applyTwice(x => [3, ...x], [1]))    // [3, 3, 1]


// zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]
// zipWith' _ [] _ = []
// zipWith' _ _ [] = []
// zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys

// const zipWith = (f, [x, ...xs], [y, ...ys]) => [f(x, y), ...zipWith(f, xs, ys)]

const zipWith = (f, a, b) => {
    let [x, ...xs] = a
    let [y, ...ys] = b
    return _null(a) || _null(b) ? [] : [f(x, y), ...zipWith(f, xs, ys)]
}

log(zipWith((x, y) => x + y, [4, 2, 5, 6], [2, 6, 2, 3] )) // [6, 8, 7, 9]
log(zipWith(max, [6,3,2,1], [7,3,1,5]))  // [7, 3, 2, 5]
log(zipWith((x, y) => x + y, ["foo ", "bar ", "baz "], ["fighters", "hoppers", "aldrin"]))
// [ 'foo fighters', 'bar hoppers', 'baz aldrin' ]

log(zipWith((x, y) => x * y, replicate(5, 2), range(1, 5)))
// [ 2, 4, 6, 8, 10 ]

// ghci> zipWith' (zipWith' (*)) [[1,2,3],[3,5,6],[2,3,4]] [[3,2,2],[3,4,5],[5,4,3]]
log(zipWith(curry(zipWith)((x, y) => x * y),
    [[1,2,3], [3,5,6], [2,3,4]], [[3,2,2], [3,4,5], [5,4,3]]))
// [[3,4,6],[9,20,30],[10,12,12]]

// flip' :: (a -> b -> c) -> b -> a -> c
// flip' f y x = f x y
let flip = (f, y, x) => f(x, y)
log(flip(zip, [1,2,3,4,5], "hello".split('')))

// map :: (a -> b) -> [a] -> [b]
// map _ [] = []
// map f (x:xs) = f x : map f xs
const map = (f, [x, ...xs]) => !x && _null(xs) ? [] : [f(x), ...map(f, xs)]
// ghci> map (+3) [1,5,3,1,6]
log(map(x => x + 3, [1, 5, 3, 1, 6]))   // [4, 8, 6, 4, 9]
// ghci> map (++ "!") ["BIFF", "BANG", "POW"]
log(map(x => x + '!', ["BIFF", "BANG", "POW"])) // ["BIFF!", "BANG!", "POW!"]

// ghci> map (replicate 3) [3..6]

// Here we have to declare a new replicate function.
// We cannot easily use the replicate generator within map.
let replicatem = (n, x) => Array.from({length: n}).map(_ => x)
log(map( curry(replicatem)(3), r`[3..6]`))

// ghci> map (map (^2)) [[1,2],[3,4,5,6],[7,8]]
log(map( curry(map)(x => x ** 2), [[1,2], [3,4,5,6], [7,8]] ))
// [[1,4],[9,16,25,36],[49,64]]

// ghci> map fst [(1,2),(3,5),(6,3),(2,6),(2,5)]
log(map(fst, [[1,2],[3,5],[6,3],[2,6],[2,5]]))
// [1,3,6,2,2]

// filter :: (a -> Bool) -> [a] -> [a]
// filter _ [] = []
// filter p (x:xs)
//     | p x       = x : filter p xs
//     | otherwise = filter p xs
const filter = (p, [x, ...xs]) =>
    !p || (!x && _null(xs)) ? []
    : p(x) ? [x, ...filter(p, xs)]
    : filter(p, xs)

//ghci> filter (>3) [1,5,3,2,1,6,4,3,2,1]
log(filter(x => x > 3, [1,5,3,2,1,6,4,3,2,1])) // [5,6,4]
// ghci> filter (==3) [1,2,3,4,5]
log(filter(x => x === 3, [1, 2, 3, 4, 5]))      // [3]
// ghci> filter even [1..10]
log(filter(even, r`[1..10]`))                   // [2,4,6,8,10]
// let notNull x = not (null x) in filter notNull [[1,2,3],[],[3,4,5],[2,2],[],[],[]]
log((notNull = x => !_null(x), filter(notNull, [[1,2,3],[],[3,4,5],[2,2],[],[],[]])))
// [[1,2,3],[3,4,5],[2,2]]

// Extreme example using curry and flip!
// ghci> filter (`elem` ['a'..'z']) "u LaUgH aT mE BeCaUsE I aM diFfeRent"
log(filter(curry(curry(flip)(elem))(r`['a'..'z']`),
    "u LaUgH aT mE BeCaUsE I aM diFfeRent").join(''))
// uagameasadifeent

// Simple example without using curry and flip!
// ghci> filter (`elem` ['A'..'Z']) "i lauGh At You BecAuse u r aLL the Same"
log(filter(x => elem(x, r`['A'..'Z']`),
    "i lauGh At You BecAuse u r aLL the Same").join(''))
// GAYBALLS

// quicksort :: (Ord a) => [a] -> [a]
// quicksort [] = []
// quicksort (x:xs) =
//     let smallerSorted = quicksort (filter (<=x) xs)
//         biggerSorted = quicksort (filter (>x) xs)
//     in  smallerSorted ++ [x] ++ biggerSorted
const quicksortf = ([x, ...xs]) => {
    let smallerSorted = quicksortf(filter(a => a <= x, xs)),
        biggerSorted = quicksortf(filter(a => a > x, xs))
    return !x && _null(xs) ? [] : [...smallerSorted, x, ...biggerSorted]
}
log(quicksort([3,4,1,2,3,6,7,9]))   // [1,2,3,3,4,6,7,9]

// largestDivisible :: (Integral a) => a
// largestDivisible = head (filter p [100000,99999..])
//     where p x = x `mod` 3829 == 0

// In JS we should use the builtin filter because JS is not a tailcall optimized
// language, the level of recursion can exhaust the heap
const largestDivisible = head(reverse(range(0, 100000)).filter(x => x % 3829 === 0))
log(largestDivisible)
// 99554

// find the sum of all odd squares that are smaller than 10,000
// ghci> sum (takeWhile (<10000) (filter odd (map (^2) [1..])))
const takeWhile = (p, [x, ...xs]) =>
    !x && _null(xs) ? [] : p(x) ? [x, ...takeWhile(p, xs)] : []

log(takeWhile(x => x != ' ', "Elephants know how to party"))
// Elephants

// In JS we have to set an upper bound for the range because we don't have infinite lists
// ghci> sum (takeWhile (<10000) (filter odd (map (^2) [1..])))
// ghci> sum (takeWhile (<10000) [n^2 | n <- [1..], odd (n^2)])
log(sum(takeWhile(x => x < 10000, range(1, 10000).map(x => x ** 2).filter(odd))))
// 166650

// for all starting numbers between 1 and 100, how many chains have a length greater than 15?
// chain :: (Integral a) => a -> [a]
// chain 1 = [1]
// chain n
//     | even n =  n:chain (n `div` 2)
//     | odd n  =  n:chain (n*3 + 1)

const chain = n =>
    n == 1 ? [1]
    : even(n) ? [n, ...chain(n / 2)]
    : odd(n) ? [n, ...chain(n * 3 + 1)] : []

log(chain(10))  // [10,5,16,8,4,2,1]
log(chain(1))   // [1]
log(chain(30))  // [30,15,46,23,70,35,106,53,160,80,40,20,10,5,16,8,4,2,1]


// numLongChains :: Int
// numLongChains = length (filter isLong (map chain [1..100]))
//     where isLong xs = length xs > 15
let numLongChains = range(1,100).map(chain).filter(xs => xs.length > 15).length
log(numLongChains)  // 66

// ghci> let listOfFuns = map (*) [0..]
this['*'] = (x, y) => x * y
let listOfFuns = range(0, 4).map(x => curry(this['*'])(x))
log(listOfFuns)
// ghci> (listOfFuns !! 4) 5
log(listOfFuns[4](5))   // 20

// numLongChains :: Int
// numLongChains = length (filter (\xs -> length xs > 15) (map chain [1..100]))
numLongChains = range(1,100).map(chain).filter(xs => xs.length > 15).length
log(numLongChains)

// ghci> zipWith (\a b -> (a * 30 + 3) / b) [5,4,3,2,1] [1,2,3,4,5]
log(zipWith((a, b) => (a * 30 + 3) / b, [5,4,3,2,1], [1,2,3,4,5]))
// [153.0,61.5,31.0,15.75,6.6]

// ghci> map (\(a,b) -> a + b) [(1,2),(3,5),(6,3),(2,6),(2,5)]
log(map(([a, b]) => a + b, [[1,2],[3,5],[6,3],[2,6],[2,5]]))
// [3,8,9,8,7]

// addThree :: (Num a) => a -> a -> a -> a
// addThree x y z = x + y + z
let addThree = (x, y, z) => x + y + z
log(addThree(1,2,3))    // 6

// addThree :: (Num a) => a -> a -> a -> a
// addThree = \x -> \y -> \z -> x + y + z
addThree = x => y => z => x + y + z
log(addThree(1)(2)(3)) // 6

// flip' :: (a -> b -> c) -> b -> a -> c
// flip' f = \x y -> f y x
flip = f => (x, y) => f(y, x)


/* Only folds and horses */

// In JS we use reduce instead of foldl
// but here we define a helper
const foldl = (f, v, xs) => xs.reduce(f, v)

// sum' :: (Num a) => [a] -> a
// sum' xs = foldl (\acc x -> acc + x) 0 xs
sum = xs => foldl((acc, x) => acc + x, 0, xs)
// sum' [3,5,2,1]
log(sum([3,5,2,1])) // 11


// sum' :: (Num a) => [a] -> a
// sum' = foldl (+) 0
this['+'] = (x, y) => x + y
log(curry(foldl)(this['+'])(0, [1,2,3]))

// elem' :: (Eq a) => a -> [a] -> Bool
// elem' y ys = foldl (\acc x -> if x == y then True else acc) False ys
let elemf = (y, ys) => foldl((acc, x) => x == y ? true : acc, false, ys)
log(elemf('a', 'abc'.split('')))  // true
