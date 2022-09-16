import { convertJson } from '../jsonConverter'
// import fs from 'fs-extra'
// import path from 'path'

const MOCK_INPUT = {
  str: 'foobarbaz',
  obj1: {
    key1: {
      bar1: 'foo',
      bar2: ['one', 'two', 'three'],
      bar3: {
        baz1: 'baz',
        baz2: [1, 2, 3],
      },
      bar4: [
        { im: 'a', b: 'b' },
        { little: 'tea' },
        { pot: ['short', 'and', 'stout'] },
      ],
    },
    key2: 'value2',
  },
  obj2: {
    key1: 'bar',
  },
  arr: ['item1', 'item2'],
  nuller: null,
  bool: true,
}

const EXPECTED = `str: foobarbaz
obj1:
  key1:
    bar1: foo
    bar2:
      - one
      - two
      - three
    bar3:
      baz1: baz
      baz2:
        - 1
        - 2
        - 3
    bar4:
      - im: a
        b: b
      - little: tea
      - pot:
          - short
          - and
          - stout
  key2: value2
obj2:
  key1: bar
arr:
  - item1
  - item2
nuller:
bool: true
`

describe('json to yml converter', () => {
  it('converts json to yml', () => {
    const actual = convertJson(MOCK_INPUT)
    // console.log(actual)
    // const p = path.join(__dirname, 'foobar')
    // fs.writeFileSync(p, actual)
    expect(actual).toBe(EXPECTED)
  })
})
