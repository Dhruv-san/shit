'use client';

import { useState } from 'react';

export default function Dashboard() {
  const stats = [
    { name: 'Active Matches', value: '12', change: '+2', changeType: 'increase' },
    { name: 'Messages', value: '34', change: '+5', changeType: 'increase' },
    { name: 'Profile Views', value: '145', change: '+22', changeType: 'increase' },
  ];

  const recentActivity = [
    { type: 'connection', text: 'Connected with Innovate Solutions', time: '2h ago' },
    { type: 'message', text: 'New message from Sarah K.', time: '3h ago' },
    { type: 'save', text: 'Your profile was saved by TechVentures', time: '5h ago' },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
            <dd className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</dd>
            <dd className={`mt-1 text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
          <div className="mt-6 flow-root">
            <ul role="list" className="-mb-8">
              {recentActivity.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <div className="relative pb-8">
                    {itemIdx !== recentActivity.length - 1 && (
                      <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white
                          ${item.type === 'connection' ? 'bg-blue-500' :
                            item.type === 'message' ? 'bg-green-500' : 'bg-yellow-500'}`}
                        >
                          {item.type === 'connection' ? '🤝' :
                           item.type === 'message' ? '💬' : '⭐'}
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">{item.text}</p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <time>{item.time}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          <div className="mt-4 space-y-4">
            <button className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Browse Co-founders
            </button>
            <button className="w-full rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">
              Start a Chat
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <h3 className="text-lg font-medium text-gray-900">Your Profile</h3>
          <div className="mt-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gray-200"></div>
              <div>
                <p className="font-medium text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">Tech Entrepreneur</p>
              </div>
            </div>
            <button className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
