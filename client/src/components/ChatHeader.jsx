export default function ChatHeader({ selectedUser, selectedGroup }) {
  return (
    <div className="p-4 border-b bg-white shadow-sm flex items-center gap-3 text-lg font-semibold text-indigo-800">
      {selectedUser && (
        <>
          <div className="bg-indigo-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold">
            {selectedUser.charAt(0).toUpperCase()}
          </div>
          {selectedUser}
        </>
      )}
      {selectedGroup && (
        <>
          <div className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold">
            {selectedGroup.charAt(0).toUpperCase()}
          </div>
          {selectedGroup}
        </>
      )}
      {!selectedUser && !selectedGroup && <span>Select a user or group</span>}
    </div>
  );
}
