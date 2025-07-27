export default function OnlineUsers({
  users,
  userId,
  selectedUser,
  setSelectedUser,
  setSelectedGroup,
}) {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 ring-1 ring-green-300"></span>
          Online Users
        </span>
        <span className="bg-indigo-100 text-indigo-600 text-sm px-2 py-0.5 rounded-full">
          {users.length - 1}
        </span>
      </h2>

      {users.filter((u) => u !== userId).map((u) => (
        <div
          key={u}
          className={`cursor-pointer p-3 rounded-xl flex items-center gap-3 transition-all ${
            selectedUser === u
              ? 'bg-indigo-100 text-indigo-800 font-semibold shadow-sm'
              : 'hover:bg-indigo-100'
          }`}
          onClick={() => {
            setSelectedUser(u);
            setSelectedGroup(null);
          }}
        >
          <div className="bg-indigo-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold">
            {u.charAt(0).toUpperCase()}
          </div>
          <span className="truncate">{u}</span>
          <span className="ml-auto w-2.5 h-2.5 bg-green-500 rounded-full"></span>
        </div>
      ))}
    </>
  );
}
