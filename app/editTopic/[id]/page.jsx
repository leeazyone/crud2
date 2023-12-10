import EditTopicForm from '@/components/EditTopicForm'
import React from 'react'

const getTopicByld = async (id) => {
  const apiUrl = process.env.API_URL
  try {
    const res = await fetch(`${apiUrl}/api/topics/${id}`, {
      method: 'GET',
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Faild to fetch topic.')
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default async function EditTopicpage({ params }) {
  const { id } = params
  const { topic } = await getTopicByld(id)
  const { title, description } = topic

  return <EditTopicForm id={id} title={title} description={description} />
}
