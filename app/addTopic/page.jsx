'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AddTopicpage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description) {
      alert('Title and description are required.')
    }

    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ title, description }),
      })
      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        throw new Error('Failed to create a topic')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='border border-slate-500 p-2 '
        type='text'
        placeholder='Topic Title'
      />
      <textarea
        className='border border-slate-500 p-4 h-32'
        type='text'
        placeholder='Topic Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className='bg-green-800 text-white font-bold px-6 py-3 w-fit rounded-md'
        type='submit'
      >
        Add Topic
      </button>
    </form>
  )
}
