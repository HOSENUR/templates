import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { increment,decrement } from '../features/counter/counterSlice'

export default function Counter() {
    const count = useSelector(state => state.counter.value)
  return (
    <section>
        <p>{count}</p>
    </section>
    )
}
