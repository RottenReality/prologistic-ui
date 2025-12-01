import React from 'react'

const DataTable = ({ columns = [], data = [], actions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-left border border-gray-200 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-2 font-medium border-b">
                {col.label}
              </th>
            ))}

            {actions && <th className="px-4 py-2 font-medium border-b">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center text-gray-500 py-4 italic"
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.accessor} className="px-4 py-2">
                    {row[col.accessor]}
                  </td>
                ))}

                {actions && (
                  <td className="px-4 py-2 flex gap-2">
                    {actions.edit && (
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => actions.edit(row)}
                      >
                        Edit
                      </button>
                    )}
                    {actions.delete && (
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => actions.delete(row)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable