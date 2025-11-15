'use client'

import withUserList, { WithUserListProps } from './with-user-list'
import type { components } from '@/types/generated'

type User = components['schemas']['UserRead']

interface UserListOwnProps {
  title?: string
}

type UserListProps = UserListOwnProps & WithUserListProps

function UserList({ title = 'Users', users, loading, error, refetchUsers }: UserListProps) {
  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="text-red-600 bg-red-50 p-3 rounded">
          Error: {error}
        </div>
        <button
          onClick={refetchUsers}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={refetchUsers}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
        >
          Refresh
        </button>
      </div>

      {users.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No users found
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <span className="text-xs text-gray-400">
                  ID: {user.id}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Created: {new Date(user.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Export both the plain component and the wrapped version
export { UserList }
export default withUserList(UserList)
