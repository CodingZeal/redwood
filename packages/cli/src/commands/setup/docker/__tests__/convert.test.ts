import { convertJson } from '../converter'
import fs from 'fs-extra'
import path from 'path'
const MOCK_INPUT = {
  str: 'foobarbaz',
  obj1: {
    key1: {
      bar1: 'foo',
      bar2: ['one', 'two', 'three'],
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
obj:
  key:
    bar: foo
    thing:
      - one
      - two
      - three
  key2: value2
obj2:
  foo: bar
arr:
  - item1
  - item2
`

describe('json to yml converter', () => {
  it('converts json to yml', () => {
    const actual = convertJson(MOCK_INPUT)
    console.log(actual)
    // const p = path.join(__dirname, 'foobar')
    // fs.writeFileSync(p, actual)
    // expect(actual).toBe(EXPECTED)
  })
})
