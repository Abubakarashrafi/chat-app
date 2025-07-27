export default function GroupList({
  groups,
  selectedGroup,
  groupHandler,
  leaveGroup,
  createGroup,
  joinedGroups,
}) {
  return (
    <>
      <hr className="my-4 border-gray-300" />
      <h3 className="text-sm font-bold text-indigo-700 mb-2">Groups</h3>
      {groups.map((groupName, index) => {
        const isJoined = joinedGroups.includes(groupName);

        return (
          <div key={index} className="mb-2 flex items-center justify-between">
            <div
              onClick={() => {
                if (isJoined) {
                  groupHandler(groupName);
                }
              }}
              className={`flex-1 px-3 py-2 rounded-lg cursor-pointer ${
                selectedGroup === groupName
                  ? 'bg-indigo-200 text-indigo-900 font-semibold'
                  : 'hover:bg-indigo-100'
              }`}
            >
              {groupName}
            </div>

            {isJoined ? (
              <button
                onClick={() => leaveGroup(groupName)}
                className="ml-2 text-xs bg-red-100 text-red-500 px-2 py-1 rounded-md hover:bg-red-200"
              >
                Leave
              </button>
            ) : (
              <button
                onClick={() => groupHandler(groupName)}
                className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-md hover:bg-green-200"
              >
                Join
              </button>
            )}
          </div>
        );
      })}

      <button
        onClick={createGroup}
        className="mt-4 bg-black text-white px-4 py-2 rounded-md shadow-md"
      >
        Create Group
      </button>
    </>
  );
}
