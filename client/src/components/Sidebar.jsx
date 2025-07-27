import OnlineUsers from './OnlineUsers';
import GroupList from './GroupList';

export default function Sidebar({
  userId,
  users,
  groups,
  selectedUser,
  selectedGroup,
  setSelectedUser,
  setSelectedGroup,
  groupHandler,
  leaveGroup,
  createGroup,
  joinedGroups
}) {
  return (
    <div className="w-1/4 bg-indigo-50 border-r p-5 overflow-y-auto shadow-md">
      {/* Current User */}
      <div className="mb-6 text-sm text-gray-600">
        <div className="text-xs text-gray-400 uppercase font-semibold mb-1">Logged in as</div>
        <div className="flex items-center gap-2 font-medium text-indigo-800">
          <div className="bg-indigo-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">
            {userId.charAt(0).toUpperCase()}
          </div>
          {userId}
        </div>
      </div>

      <OnlineUsers
        users={users}
        userId={userId}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setSelectedGroup={setSelectedGroup}
      />

     <GroupList
  groups={groups}
  selectedGroup={selectedGroup}
  groupHandler={groupHandler}
  leaveGroup={leaveGroup}
  createGroup={createGroup}
  joinedGroups={joinedGroups}
/>

    </div>
  );
}
