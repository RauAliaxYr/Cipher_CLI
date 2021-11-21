import { caesarShift } from '../src/caesarAlg'
import { expect }  from '@jest/globals'
import {enAtbash} from '../src/AtbashAlg'

test('caesar algorithm is working', () => {
    expect(caesarShift("lolL---<,?фыв1", 1)).toBe("mpmM---<,?фыв1")
})
test('caesar algorithm is working', () => {
    expect(caesarShift("lol", -1)).toBe("knk")
})
test('return string', () => {
    const arg = 'aaa'
    expect(enAtbash(arg)).toBeDefined()
});
