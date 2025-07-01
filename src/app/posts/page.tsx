'use client'

import { useEffect, useState } from 'react'
import { Post } from '@/types/Post'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts')
      .then((res) => res.json())
      .then((data: Post[]) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch posts:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded shadow">
            <h2 className="text-xl">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
