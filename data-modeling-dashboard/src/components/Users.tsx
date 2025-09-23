'use client';

import React, { useState } from 'react';
import {
  Users as UsersIcon,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Shield,
  Crown,
  Eye,
  Edit3,
  Mail,
  Calendar,
  Activity,
  Settings,
  Trash2,
  Plus,
  Check,
  X,
  Upload,
  Download,
  Building2,
  FileText,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Senior Modeler' | 'Modeler' | 'Viewer';
  avatar: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastActive: string;
  modelsCreated: number;
  joinedDate: string;
  permissions: string[];
}

interface TeamStats {
  totalUsers: number;
  activeUsers: number;
  pendingInvites: number;
  adminUsers: number;
}

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showADModal, setShowADModal] = useState(false);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Viewer');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<any[]>([]);
  const [adDomain, setAdDomain] = useState('');
  const [adUsers, setAdUsers] = useState<any[]>([]);

  const teamStats: TeamStats = {
    totalUsers: 12,
    activeUsers: 9,
    pendingInvites: 2,
    adminUsers: 2
  };

  const users: User[] = [
    {
      id: '1',
      name: 'Raunak Pandey',
      email: 'raunak.pandey@company.com',
      role: 'Admin',
      avatar: 'RP',
      status: 'Active',
      lastActive: '2 minutes ago',
      modelsCreated: 15,
      joinedDate: 'Jan 2023',
      permissions: ['Create Models', 'Manage Users', 'Export Data', 'System Settings']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Senior Modeler',
      avatar: 'SJ',
      status: 'Active',
      lastActive: '1 hour ago',
      modelsCreated: 23,
      joinedDate: 'Mar 2023',
      permissions: ['Create Models', 'Review Models', 'Export Data']
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      role: 'Modeler',
      avatar: 'MC',
      status: 'Active',
      lastActive: '3 hours ago',
      modelsCreated: 8,
      joinedDate: 'Jun 2023',
      permissions: ['Create Models', 'Edit Models']
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      role: 'Viewer',
      avatar: 'ED',
      status: 'Active',
      lastActive: '1 day ago',
      modelsCreated: 0,
      joinedDate: 'Aug 2023',
      permissions: ['View Models']
    },
    {
      id: '5',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Modeler',
      avatar: 'JS',
      status: 'Inactive',
      lastActive: '1 week ago',
      modelsCreated: 12,
      joinedDate: 'Feb 2023',
      permissions: ['Create Models', 'Edit Models']
    },
    {
      id: '6',
      name: 'Lisa Wilson',
      email: 'lisa.wilson@company.com',
      role: 'Senior Modeler',
      avatar: 'LW',
      status: 'Pending',
      lastActive: 'Never',
      modelsCreated: 0,
      joinedDate: 'Pending',
      permissions: []
    }
  ];

  const roleIcons = {
    'Admin': <Crown className="w-4 h-4 text-yellow-500" />,
    'Senior Modeler': <Shield className="w-4 h-4 text-blue-500" />,
    'Modeler': <Edit3 className="w-4 h-4 text-green-500" />,
    'Viewer': <Eye className="w-4 h-4 text-zinc-500" />
  };

  const statusColors = {
    'Active': 'bg-green-500',
    'Inactive': 'bg-zinc-500',
    'Pending': 'bg-yellow-500'
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleInviteUser = () => {
    console.log('Inviting user:', { email: inviteEmail, role: inviteRole });
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('Viewer');
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCsvFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const preview = lines.slice(1, 6).map(line => {
          const values = line.split(',').map(v => v.trim());
          const user: any = {};
          headers.forEach((header, index) => {
            user[header] = values[index] || '';
          });
          return user;
        }).filter(user => user.name || user.email);
        setCsvPreview(preview);
      };
      reader.readAsText(file);
    }
  };

  const handleCSVImport = () => {
    console.log('Importing CSV users:', csvPreview);
    setShowCSVModal(false);
    setCsvFile(null);
    setCsvPreview([]);
  };

  const handleADSync = () => {
    console.log('Syncing AD users:', { domain: adDomain, users: adUsers });
    setShowADModal(false);
    setAdDomain('');
    setAdUsers([]);
  };

  const mockADUsers = [
    { name: 'John Smith', email: 'john.smith@company.com', department: 'IT', title: 'Database Administrator' },
    { name: 'Sarah Johnson', email: 'sarah.johnson@company.com', department: 'Engineering', title: 'Senior Developer' },
    { name: 'Mike Chen', email: 'mike.chen@company.com', department: 'Data', title: 'Data Analyst' },
    { name: 'Emily Davis', email: 'emily.davis@company.com', department: 'Product', title: 'Product Manager' }
  ];

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-zinc-100">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-[#161616] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UsersIcon className="w-6 h-6 text-zinc-400" />
            <h1 className="text-xl font-semibold text-zinc-100">Team Management</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center space-x-2 bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Invite User</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowOnboardingModal(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Bulk Onboard</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Team Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#161616] border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Total Users</p>
                <p className="text-2xl font-semibold text-zinc-100">{teamStats.totalUsers}</p>
              </div>
              <UsersIcon className="w-8 h-8 text-zinc-500" />
            </div>
          </div>

          <div className="bg-[#161616] border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Active Users</p>
                <p className="text-2xl font-semibold text-green-400">{teamStats.activeUsers}</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-[#161616] border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Pending Invites</p>
                <p className="text-2xl font-semibold text-yellow-400">{teamStats.pendingInvites}</p>
              </div>
              <Mail className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-[#161616] border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Administrators</p>
                <p className="text-2xl font-semibold text-blue-400">{teamStats.adminUsers}</p>
              </div>
              <Crown className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-[#161616] border border-zinc-800 rounded-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent w-full sm:w-64"
                />
              </div>

              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Senior Modeler">Senior Modeler</option>
                <option value="Modeler">Modeler</option>
                <option value="Viewer">Viewer</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="text-sm text-zinc-400">
              Showing {filteredUsers.length} of {users.length} users
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-[#161616] border border-zinc-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-800 border-b border-zinc-700">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-zinc-300">User</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-zinc-300">Role</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-zinc-300">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-zinc-300">Last Active</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-zinc-300">Models</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-zinc-300">Joined</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-zinc-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-900 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center text-sm font-medium text-zinc-200">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-100">{user.name}</p>
                          <p className="text-sm text-zinc-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {roleIcons[user.role]}
                        <span className="text-sm text-zinc-300">{user.role}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${statusColors[user.status]}`}></div>
                        <span className="text-sm text-zinc-300">{user.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-400">{user.lastActive}</td>
                    <td className="py-4 px-6 text-sm text-zinc-300">{user.modelsCreated}</td>
                    <td className="py-4 px-6 text-sm text-zinc-400">{user.joinedDate}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center">
                        <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-zinc-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#161616] border border-zinc-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-zinc-100">Invite New User</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-zinc-400 hover:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@company.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
                >
                  <option value="Viewer">Viewer</option>
                  <option value="Modeler">Modeler</option>
                  <option value="Senior Modeler">Senior Modeler</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-zinc-300 mb-2">Role Permissions</h4>
                <ul className="text-sm text-zinc-400 space-y-1">
                  {inviteRole === 'Admin' && (
                    <>
                      <li>• Full system access</li>
                      <li>• Manage users and permissions</li>
                      <li>• Create and modify all models</li>
                      <li>• Export and import data</li>
                    </>
                  )}
                  {inviteRole === 'Senior Modeler' && (
                    <>
                      <li>• Create and modify models</li>
                      <li>• Review and approve models</li>
                      <li>• Export data</li>
                      <li>• Access advanced features</li>
                    </>
                  )}
                  {inviteRole === 'Modeler' && (
                    <>
                      <li>• Create and edit models</li>
                      <li>• Collaborate on team models</li>
                      <li>• Basic export functionality</li>
                    </>
                  )}
                  {inviteRole === 'Viewer' && (
                    <>
                      <li>• View models and diagrams</li>
                      <li>• Read-only access</li>
                      <li>• Comment on models</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 border border-zinc-700 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteUser}
                disabled={!inviteEmail}
                className="flex-1 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-zinc-100 transition-colors"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Onboarding Options Modal */}
      {showOnboardingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#161616] border border-zinc-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-zinc-100">Bulk User Onboarding</h3>
              <button
                onClick={() => setShowOnboardingModal(false)}
                className="text-zinc-400 hover:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setShowOnboardingModal(false);
                  setShowADModal(true);
                }}
                className="w-full p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-100">Active Directory</h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Sync users from your organization's Active Directory
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowOnboardingModal(false);
                  setShowCSVModal(true);
                }}
                className="w-full p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-100">CSV Import</h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Upload a CSV file with user information
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-6 p-3 bg-zinc-900 border border-zinc-700 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-zinc-400">
                  <p className="font-medium text-zinc-300 mb-1">CSV Format Requirements:</p>
                  <p>Include columns: name, email, role (optional), department (optional)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Directory Modal */}
      {showADModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#161616] border border-zinc-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-zinc-100">Active Directory Integration</h3>
              <button
                onClick={() => setShowADModal(false)}
                className="text-zinc-400 hover:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Domain/Server
                </label>
                <input
                  type="text"
                  value={adDomain}
                  onChange={(e) => setAdDomain(e.target.value)}
                  placeholder="corp.company.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
                />
              </div>

              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-zinc-300 mb-3">Available Users</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {mockADUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-sm font-medium text-zinc-200">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-100">{user.name}</p>
                          <p className="text-xs text-zinc-400">{user.email}</p>
                          <p className="text-xs text-zinc-500">{user.department} • {user.title}</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-zinc-700 border-zinc-600 rounded focus:ring-blue-500"
                        defaultChecked={index < 2}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-zinc-300 mb-2">Default Role Assignment</h4>
                <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent">
                  <option value="Viewer">Viewer</option>
                  <option value="Modeler">Modeler</option>
                  <option value="Senior Modeler">Senior Modeler</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowADModal(false)}
                className="flex-1 px-4 py-2 border border-zinc-700 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleADSync}
                disabled={!adDomain}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-zinc-100 transition-colors"
              >
                Sync Selected Users
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      {showCSVModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#161616] border border-zinc-800 rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-zinc-100">CSV Import</h3>
              <button
                onClick={() => setShowCSVModal(false)}
                className="text-zinc-400 hover:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Upload CSV File
                </label>
                <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center hover:border-zinc-600 transition-colors">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload className="w-8 h-8 text-zinc-500" />
                    <div>
                      <p className="text-sm font-medium text-zinc-300">Click to upload CSV</p>
                      <p className="text-xs text-zinc-500">or drag and drop</p>
                    </div>
                  </label>
                </div>
                {csvFile && (
                  <p className="text-sm text-zinc-400 mt-2">
                    Selected: {csvFile.name}
                  </p>
                )}
              </div>

              {csvPreview.length > 0 && (
                <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-zinc-300 mb-3">Preview ({csvPreview.length} users)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-zinc-700">
                        <tr className="text-zinc-400">
                          <th className="text-left py-2 px-3">Name</th>
                          <th className="text-left py-2 px-3">Email</th>
                          <th className="text-left py-2 px-3">Role</th>
                          <th className="text-left py-2 px-3">Department</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800">
                        {csvPreview.map((user, index) => (
                          <tr key={index} className="text-zinc-300">
                            <td className="py-2 px-3">{user.name || '-'}</td>
                            <td className="py-2 px-3">{user.email || '-'}</td>
                            <td className="py-2 px-3">{user.role || 'Viewer'}</td>
                            <td className="py-2 px-3">{user.department || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-zinc-400">
                    <p className="font-medium text-zinc-300 mb-1">CSV Format Requirements:</p>
                    <ul className="space-y-1">
                      <li>• Required columns: name, email</li>
                      <li>• Optional columns: role, department, title</li>
                      <li>• Default role will be "Viewer" if not specified</li>
                      <li>• Invalid emails will be skipped</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCSVModal(false)}
                className="flex-1 px-4 py-2 border border-zinc-700 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCSVImport}
                disabled={csvPreview.length === 0}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-zinc-100 transition-colors"
              >
                Import {csvPreview.length} Users
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;