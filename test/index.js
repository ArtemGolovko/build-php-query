const buildPHPQuery = require('../src/.')

describe('buildPHPQuery Tests', () => {
  it('plain object', () => {
    expect(buildPHPQuery({ name: 'Artem' })).toBe('name=Artem')
    expect(buildPHPQuery({ name: 'Artem', age: 13 })).toBe('name=Artem&age=13')
  })

  it('urlencode in plain object', () => {
    expect(buildPHPQuery({ arrow: '^' })).toBe('arrow=%5E')
    expect(buildPHPQuery({ '^': 'arrow' })).toBe('%5E=arrow')
  })

  it('ture and false', () => {
    expect(buildPHPQuery({ shouldBeFalse: false })).toBe('shouldBeFalse=false')
    expect(buildPHPQuery({ shouldBeTrue: true })).toBe('shouldBeTrue=true')
  })

  it('null and undefined', () => {
    expect(buildPHPQuery({ shouldBeNull: null })).toBe('shouldBeNull=')
    expect(buildPHPQuery({ shouldBeUndefined: undefined })).toBe(
      'shouldBeUndefined='
    )
  })

  it('objects', () => {
    expect(buildPHPQuery({ person: { name: 'Artem', age: 13 } })).toBe(
      'person[name]=Artem&person[age]=13'
    )
    expect(buildPHPQuery({ arrows: { '<': 'left', '>': 'right' } })).toBe(
      'arrows[%3C]=left&arrows[%3E]=right'
    )
  })

  it('complex objects', () => {
    expect(
      buildPHPQuery({
        someObj: {
          someNestedObj: {
            someScalar1: 'value1',
            someScalar2: 'value2'
          },
          someNestedObj2: {
            someScalar1: 'value1',
            someScalar2: 'value2'
          }
        }
      })
    ).toBe(
      'someObj[someNestedObj][someScalar1]=value1&someObj[someNestedObj][someScalar2]=value2&someObj[someNestedObj2][someScalar1]=value1&someObj[someNestedObj2][someScalar2]=value2'
    )
  })

  it('true array', () => {
    expect(buildPHPQuery({ trueArray: [1, 2, 3] })).toBe(
      'trueArray[]=1&trueArray[]=2&trueArray[]=3'
    )
    expect(buildPHPQuery({ trueArray: [1, 2, { key: 'value' }] })).toBe(
      'trueArray[]=1&trueArray[]=2&trueArray[][key]=value'
    )
    expect(buildPHPQuery({ trueArray: [1, 2, [3]] })).toBe(
      'trueArray[]=1&trueArray[]=2&trueArray[][]=3'
    )
  })

  it('not true array', () => {
    expect(
      buildPHPQuery({ falseArray: [1, 2, { name: 'Artem', age: 13 }] })
    ).toBe(
      'falseArray[0]=1&falseArray[1]=2&falseArray[2][name]=Artem&falseArray[2][age]=13'
    )
    expect(buildPHPQuery({ falseArray: [1, 2, [3, 4]] })).toBe(
      'falseArray[0]=1&falseArray[1]=2&falseArray[2][]=3&falseArray[2][]=4'
    )
  })
})
