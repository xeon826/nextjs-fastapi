'use client'

import { useState, useEffect, ComponentType } from 'react'
import type { components } from '@/types/generated'

// Use the generated UserRead type from OpenAPI
type User = components['schemas']['UserRead']

// Props that will be injected into the wrapped component
export interface WithUserListProps {
  users: User[]
  loading: boolean
  error: string | null
  refetchUsers: () => void
}

// Higher-order component that fetches users and injects them
function withUserList<P extends object>(
  WrappedComponent: ComponentType<P & WithUserListProps>
) {
  return function WithUserListWrapper(props: P) {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchUsers = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/py/users')

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`)
        }

        const userData: User[] = await response.json()
        setUsers(userData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
        console.error('Error fetching users:', err)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      fetchUsers()
    }, [])

    return (
      <WrappedComponent
        {...props}
        users={users}
        loading={loading}
        error={error}
        refetchUsers={fetchUsers}
      />
    )
  }
}

export default withUserList
