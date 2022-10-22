import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../redux/features/counterSlice'

export default function Counter() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  return (
    <section className='bg-white  rounded p-4 border border-black'>
      <p className='w-full text-center text-2xl'>{count}</p>

      <div className='flex justify-between p-2'>
        <button onClick={() => dispatch(increment())} class="relative mx-2 inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-neutral-100 bg-gray-800 rounded-md group">
          <span class="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-neutral-900 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
          <span class="absolute inset-0 w-full h-full bg-neutral-100 rounded-md "></span>
          <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-neutral-900 rounded-md opacity-0 group-hover:opacity-100 "></span>
          <span class="relative text-neutral-900 transition-colors duration-200 ease-in-out delay-100 group-hover:text-neutral-100">+ 1</span>
        </button>
        <button onClick={() => dispatch(decrement())} class="relative mx-2 inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-neutral-100 bg-gray-800 rounded-md group">
          <span class="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-neutral-900 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
          <span class="absolute inset-0 w-full h-full bg-neutral-100 rounded-md "></span>
          <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-neutral-900 rounded-md opacity-0 group-hover:opacity-100 "></span>
          <span class="relative text-neutral-900 transition-colors duration-200 ease-in-out delay-100 group-hover:text-neutral-100">- 1</span>
        </button>

      </div>
    </section>
  )
}
