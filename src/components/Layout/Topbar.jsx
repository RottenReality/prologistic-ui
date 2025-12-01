import React from 'react'

const Topbar = () => {
  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">ProLogistic System</h2>
      <div className="text-sm text-gray-500">Logged in</div>
    </header>
  )
}

export default Topbar