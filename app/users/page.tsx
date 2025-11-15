import UserList from '../components/user-list'

export default function UsersPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>

      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow">
          <UserList title="All Users" />
        </div>
      </div>
    </div>
  )
}
