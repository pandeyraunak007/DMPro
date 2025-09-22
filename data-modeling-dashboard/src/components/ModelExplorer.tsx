'use client';

import React, { useState } from 'react';
import {
  Search,
  Bell,
  Settings2,
  User,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  Plus,
  Database,
  Table,
  Key,
  Link,
  FileText,
  Layers3,
  Box,
  Grid3X3,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Move,
  MousePointer,
  Square,
  Circle,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Trash2,
  Edit3,
  Save,
  Folder,
  FolderOpen,
  Target,
  Map,
  Activity,
  Zap,
  Filter,
  SortAsc,
  MoreHorizontal,
  X,
  Download,
  Upload,
  Share2,
  Printer,
  RefreshCw,
  Undo2,
  Redo2,
  Scissors,
  ClipboardCopy,
  ClipboardPaste,
  AlignLeft,
  AlignCenter,
  Type,
  Palette,
  Layers,
  BookOpen,
  HelpCircle,
  Info
} from 'lucide-react';

// Color theme based on Premium UI Design Document
const theme = {
  light: {
    pageBackground: '#F9FAFB',
    panelBackground: '#FFFFFF',
    headerBackground: '#FFFFFF',
    accent: '#6366F1',
    primaryText: '#111827',
    secondaryText: '#6B7280',
    borders: '#E5E7EB',
    floatingToolbar: '#FFFFFF'
  },
  dark: {
    pageBackground: '#181818',
    panelBackground: '#242424',
    headerBackground: '#1F1F1F',
    accent: '#818CF8',
    primaryText: '#E4E4E4',
    secondaryText: '#A1A1AA',
    borders: '#3A3A3A',
    floatingToolbar: '#2C2C2C'
  }
};

// Types for Model Explorer
interface Entity {
  id: string;
  name: string;
  type: 'table' | 'view' | 'procedure';
  attributes: Attribute[];
  relationships: string[];
  position: { x: number; y: number };
}

interface Attribute {
  id: string;
  name: string;
  type: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  isNullable: boolean;
  defaultValue?: string;
}

interface Diagram {
  id: string;
  name: string;
  entities: Entity[];
  created: string;
  modified: string;
}

interface Model {
  id: string;
  name: string;
  description: string;
  diagrams: Diagram[];
  created: string;
  modified: string;
  status: 'active' | 'locked' | 'readonly';
}

// Header Bar Component
const HeaderBar = ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className={`h-14 px-6 flex items-center justify-between border-b ${
      isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
    } shadow-sm`}>
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Database className="w-5 h-5 text-white" />
        </div>
        <span className={`font-semibold text-lg ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          DMPro
        </span>
      </div>

      {/* Center: Model Name */}
      <div className="flex items-center gap-2">
        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Model:</span>
        <span className={`font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          E-Commerce Platform
        </span>
      </div>

      {/* Right: Search, Notifications, Theme, Profile */}
      <div className="flex items-center gap-3">
        {/* Global Search */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder="Search models, entities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 w-64 text-sm rounded-lg border ${
              isDark
                ? 'bg-zinc-800 border-zinc-700 text-gray-100 placeholder-gray-400'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-lg hover:${isDark ? 'bg-zinc-800' : 'bg-gray-100'} transition-colors`}
          >
            <Bell className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg hover:${isDark ? 'bg-zinc-800' : 'bg-gray-100'} transition-colors`}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-gray-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-indigo-600" />
          </div>
          <ChevronDown className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </div>
      </div>
    </div>
  );
};

// Main Tabs Component
const MainTabs = ({ isDark }: { isDark: boolean }) => {
  const [activeTab, setActiveTab] = useState('erwin');

  const tabs = [
    { id: 'erwin', label: 'erwin Data Modeler', icon: <Database className="w-4 h-4" /> },
    { id: 'file', label: 'File', icon: <FileText className="w-4 h-4" /> },
    { id: 'home', label: 'Home', icon: <Folder className="w-4 h-4" /> },
    { id: 'view', label: 'View', icon: <Eye className="w-4 h-4" /> },
    { id: 'diagram', label: 'Diagram', icon: <Grid3X3 className="w-4 h-4" /> },
    { id: 'actions', label: 'Actions', icon: <Zap className="w-4 h-4" /> },
    { id: 'help', label: 'Help', icon: <HelpCircle className="w-4 h-4" /> }
  ];

  return (
    <div className={`h-12 px-6 flex items-center border-b ${
      isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.id
                ? `${isDark ? 'bg-zinc-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`
                : `${isDark ? 'text-gray-400 hover:text-gray-100 hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Contextual Toolbar Component
const ContextualToolbar = ({ isDark, activeTab }: { isDark: boolean; activeTab: string }) => {
  const getToolbarContent = () => {
    switch (activeTab) {
      case 'home':
        return [
          { icon: <Plus className="w-4 h-4" />, label: 'Add Entity' },
          { icon: <Link className="w-4 h-4" />, label: 'Add Relationship' },
          { icon: <FileText className="w-4 h-4" />, label: 'Add Annotation' },
          { icon: <Copy className="w-4 h-4" />, label: 'Copy' },
          { icon: <ClipboardPaste className="w-4 h-4" />, label: 'Paste' }
        ];
      case 'view':
        return [
          { icon: <ZoomIn className="w-4 h-4" />, label: 'Zoom In' },
          { icon: <ZoomOut className="w-4 h-4" />, label: 'Zoom Out' },
          { icon: <Eye className="w-4 h-4" />, label: 'Show Grid' },
          { icon: <Filter className="w-4 h-4" />, label: 'Filter' },
          { icon: <Layers className="w-4 h-4" />, label: 'Layers' }
        ];
      case 'diagram':
        return [
          { icon: <Square className="w-4 h-4" />, label: 'Entity Tool' },
          { icon: <ArrowRight className="w-4 h-4" />, label: 'Relationship Tool' },
          { icon: <Type className="w-4 h-4" />, label: 'Text Tool' },
          { icon: <AlignLeft className="w-4 h-4" />, label: 'Align' },
          { icon: <Palette className="w-4 h-4" />, label: 'Format' }
        ];
      default:
        return [
          { icon: <Save className="w-4 h-4" />, label: 'Save' },
          { icon: <Undo2 className="w-4 h-4" />, label: 'Undo' },
          { icon: <Redo2 className="w-4 h-4" />, label: 'Redo' },
          { icon: <Download className="w-4 h-4" />, label: 'Export' },
          { icon: <Share2 className="w-4 h-4" />, label: 'Share' }
        ];
    }
  };

  const toolbarItems = getToolbarContent();

  return (
    <div className={`h-14 px-6 flex items-center gap-4 border-b ${
      isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'
    }`}>
      {toolbarItems.map((item, index) => (
        <button
          key={index}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
            isDark
              ? 'text-gray-300 hover:text-gray-100 hover:bg-zinc-800'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
};

// Model Tree Component
const ModelTree = ({ isDark }: { isDark: boolean }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['models', 'model-1', 'diagrams']));

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const TreeItem = ({
    id,
    label,
    icon,
    children,
    level = 0
  }: {
    id: string;
    label: string;
    icon: React.ReactNode;
    children?: any[];
    level?: number;
  }) => {
    const isExpanded = expandedItems.has(id);
    const hasChildren = children && children.length > 0;

    return (
      <div>
        <div
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
            isDark
              ? 'text-gray-300 hover:text-gray-100 hover:bg-zinc-800'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }`}
          style={{ paddingLeft: `${12 + level * 16}px` }}
          onClick={() => hasChildren && toggleExpanded(id)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )
          ) : (
            <div className="w-4 h-4" />
          )}
          {icon}
          <span className="flex-1">{label}</span>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {children.map((child) => (
              <TreeItem key={child.id} {...child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const treeData = [
    {
      id: 'models',
      label: 'Models',
      icon: <FolderOpen className="w-4 h-4 text-indigo-500" />,
      children: [
        {
          id: 'model-1',
          label: 'E-Commerce Platform',
          icon: <Database className="w-4 h-4 text-blue-500" />,
          children: [
            {
              id: 'diagrams',
              label: 'Diagrams',
              icon: <Folder className="w-4 h-4 text-gray-500" />,
              children: [
                {
                  id: 'diagram-1',
                  label: 'Logical Model',
                  icon: <Grid3X3 className="w-4 h-4 text-green-500" />
                },
                {
                  id: 'diagram-2',
                  label: 'Physical Model',
                  icon: <Grid3X3 className="w-4 h-4 text-orange-500" />
                }
              ]
            },
            {
              id: 'entities',
              label: 'Entities',
              icon: <Folder className="w-4 h-4 text-gray-500" />,
              children: [
                {
                  id: 'entity-1',
                  label: 'Customer',
                  icon: <Table className="w-4 h-4 text-purple-500" />
                },
                {
                  id: 'entity-2',
                  label: 'Order',
                  icon: <Table className="w-4 h-4 text-purple-500" />
                },
                {
                  id: 'entity-3',
                  label: 'Product',
                  icon: <Table className="w-4 h-4 text-purple-500" />
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className={`w-80 h-full border-r overflow-y-auto ${
      isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
    }`}>
      <div className="p-4">
        <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          Model Tree
        </h3>
        <div className="space-y-1">
          {treeData.map((item) => (
            <TreeItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Floating Toolbar Component
const FloatingToolbar = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`absolute top-4 left-4 flex items-center gap-2 p-2 rounded-lg shadow-lg ${
      isDark ? 'bg-zinc-800 border border-zinc-700' : 'bg-white border border-gray-200'
    }`}>
      <button className={`p-2 rounded-lg hover:${isDark ? 'bg-zinc-700' : 'bg-gray-100'} transition-colors`}>
        <MousePointer className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
      </button>
      <button className={`p-2 rounded-lg hover:${isDark ? 'bg-zinc-700' : 'bg-gray-100'} transition-colors`}>
        <Move className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
      </button>
      <button className={`p-2 rounded-lg hover:${isDark ? 'bg-zinc-700' : 'bg-gray-100'} transition-colors`}>
        <Square className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
      </button>
      <button className={`p-2 rounded-lg hover:${isDark ? 'bg-zinc-700' : 'bg-gray-100'} transition-colors`}>
        <ArrowRight className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
      </button>
      <div className={`w-px h-6 ${isDark ? 'bg-zinc-700' : 'bg-gray-300'}`} />
      <button className={`p-2 rounded-lg hover:${isDark ? 'bg-zinc-700' : 'bg-gray-100'} transition-colors`}>
        <ZoomIn className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
      </button>
      <button className={`p-2 rounded-lg hover:${isDark ? 'bg-zinc-700' : 'bg-gray-100'} transition-colors`}>
        <ZoomOut className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
      </button>
      <button className={`p-2 rounded-lg hover:${isDark ? 'bg-zinc-700' : 'bg-gray-100'} transition-colors`}>
        <Maximize2 className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
      </button>
    </div>
  );
};

// Mini Map Component
const MiniMap = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`absolute bottom-4 right-4 w-48 h-32 rounded-lg border shadow-lg ${
      isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'
    }`}>
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Mini Map
          </span>
          <button className={`p-1 rounded hover:${isDark ? 'bg-zinc-700' : 'bg-gray-100'} transition-colors`}>
            <X className={`w-3 h-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
        </div>
        <div className={`w-full h-20 rounded border-2 border-dashed relative ${
          isDark ? 'border-zinc-600 bg-zinc-900' : 'border-gray-300 bg-gray-50'
        }`}>
          {/* Viewport indicator */}
          <div className="absolute top-2 left-2 w-8 h-6 border-2 border-indigo-500 bg-indigo-500/20 rounded"></div>
          {/* Mock entities */}
          <div className={`absolute top-1 right-1 w-3 h-2 rounded ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`}></div>
          <div className={`absolute bottom-1 left-1 w-4 h-2 rounded ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
          <div className={`absolute bottom-1 right-2 w-3 h-2 rounded ${isDark ? 'bg-green-400' : 'bg-green-500'}`}></div>
        </div>
      </div>
    </div>
  );
};

// Diagram Canvas Component
const DiagramCanvas = ({ isDark }: { isDark: boolean }) => {
  const [activeModel, setActiveModel] = useState('model-1');
  const [activeDiagram, setActiveDiagram] = useState('diagram-1');

  const models = [
    { id: 'model-1', name: 'E-Commerce Platform' },
    { id: 'model-2', name: 'Customer Management' }
  ];

  const diagrams = [
    { id: 'diagram-1', name: 'Logical Model', modelId: 'model-1' },
    { id: 'diagram-2', name: 'Physical Model', modelId: 'model-1' },
    { id: 'diagram-3', name: 'Overview', modelId: 'model-2' }
  ];

  const activeModelDiagrams = diagrams.filter(d => d.modelId === activeModel);

  return (
    <div className="flex-1 flex flex-col">
      {/* Model Tabs */}
      <div className={`flex items-center gap-1 px-4 py-2 border-b ${
        isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'
      }`}>
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => setActiveModel(model.id)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
              activeModel === model.id
                ? `${isDark ? 'bg-zinc-800 text-indigo-400' : 'bg-white text-indigo-600 shadow-sm'}`
                : `${isDark ? 'text-gray-400 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'}`
            }`}
          >
            <Database className="w-4 h-4" />
            {model.name}
            {activeModel === model.id && (
              <X className="w-3 h-3 ml-1 hover:bg-gray-200 rounded" />
            )}
          </button>
        ))}
        <button className={`p-1.5 rounded-lg hover:${isDark ? 'bg-zinc-800' : 'bg-gray-200'} transition-colors`}>
          <Plus className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>
      </div>

      {/* Diagram Tabs */}
      <div className={`flex items-center gap-1 px-4 py-2 border-b ${
        isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'
      }`}>
        {activeModelDiagrams.map((diagram) => (
          <button
            key={diagram.id}
            onClick={() => setActiveDiagram(diagram.id)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
              activeDiagram === diagram.id
                ? `${isDark ? 'bg-zinc-700 text-gray-100' : 'bg-white text-gray-900 shadow-sm'}`
                : `${isDark ? 'text-gray-400 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'}`
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            {diagram.name}
            {activeDiagram === diagram.id && (
              <X className="w-3 h-3 ml-1 hover:bg-gray-200 rounded" />
            )}
          </button>
        ))}
        <button className={`p-1.5 rounded-lg hover:${isDark ? 'bg-zinc-800' : 'bg-gray-200'} transition-colors`}>
          <Plus className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>
      </div>

      {/* Canvas */}
      <div className={`flex-1 relative overflow-hidden ${
        isDark ? 'bg-zinc-950' : 'bg-gray-100'
      }`}>
        {/* Grid background */}
        <div
          className={`absolute inset-0 opacity-50`}
          style={{
            backgroundImage: `radial-gradient(circle, ${isDark ? '#374151' : '#d1d5db'} 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Sample entities */}
        <div className="absolute top-20 left-20">
          <div className={`w-48 rounded-lg border shadow-lg ${
            isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
          }`}>
            <div className={`px-3 py-2 border-b font-medium ${
              isDark ? 'border-zinc-700 text-gray-100' : 'border-gray-200 text-gray-900'
            }`}>
              Customer
            </div>
            <div className="p-3 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Key className="w-3 h-3 text-yellow-500" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>customer_id</span>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>INT</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>first_name</span>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>VARCHAR</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>email</span>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>VARCHAR</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-20 right-20">
          <div className={`w-48 rounded-lg border shadow-lg ${
            isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
          }`}>
            <div className={`px-3 py-2 border-b font-medium ${
              isDark ? 'border-zinc-700 text-gray-100' : 'border-gray-200 text-gray-900'
            }`}>
              Order
            </div>
            <div className="p-3 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Key className="w-3 h-3 text-yellow-500" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>order_id</span>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>INT</span>
              </div>
              <div className="flex items-center gap-2">
                <Link className="w-3 h-3 text-blue-500" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>customer_id</span>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>INT</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>order_date</span>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>DATE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Relationship line */}
        <svg className="absolute inset-0 pointer-events-none">
          <line
            x1="268"
            y1="140"
            x2="400"
            y2="140"
            stroke={isDark ? '#6366f1' : '#4f46e5'}
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill={isDark ? '#6366f1' : '#4f46e5'}
              />
            </marker>
          </defs>
        </svg>

        <FloatingToolbar isDark={isDark} />
        <MiniMap isDark={isDark} />
      </div>
    </div>
  );
};

// Property Pane Component
const PropertyPane = ({ isDark }: { isDark: boolean }) => {
  const [activeTab, setActiveTab] = useState('entity');

  const tabs = [
    { id: 'entity', label: 'Entity', icon: <Table className="w-4 h-4" /> },
    { id: 'attribute', label: 'Attribute', icon: <Box className="w-4 h-4" /> },
    { id: 'relationship', label: 'Relationship', icon: <Link className="w-4 h-4" /> },
    { id: 'model', label: 'Model', icon: <Database className="w-4 h-4" /> }
  ];

  return (
    <div className={`w-80 h-full border-l overflow-y-auto ${
      isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
    }`}>
      {/* Vertical Tabs */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                activeTab === tab.id
                  ? `${isDark ? 'bg-zinc-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`
                  : `${isDark ? 'text-gray-400 hover:text-gray-100 hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
              }`}
              title={tab.label}
            >
              {tab.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Properties Content */}
      <div className="p-4">
        <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          {tabs.find(t => t.id === activeTab)?.label} Properties
        </h3>

        {activeTab === 'entity' && (
          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Name
              </label>
              <input
                type="text"
                value="Customer"
                className={`w-full px-3 py-2 text-sm border rounded-lg ${
                  isDark
                    ? 'bg-zinc-800 border-zinc-700 text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                value="Customer entity storing customer information"
                rows={3}
                className={`w-full px-3 py-2 text-sm border rounded-lg ${
                  isDark
                    ? 'bg-zinc-800 border-zinc-700 text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            </div>
            <div>
              <label className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <input type="checkbox" className="rounded" />
                Abstract Entity
              </label>
            </div>
            <div>
              <label className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <input type="checkbox" className="rounded" />
                Auditable
              </label>
            </div>
          </div>
        )}

        {activeTab === 'attribute' && (
          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Name
              </label>
              <input
                type="text"
                value="customer_id"
                className={`w-full px-3 py-2 text-sm border rounded-lg ${
                  isDark
                    ? 'bg-zinc-800 border-zinc-700 text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Data Type
              </label>
              <select className={`w-full px-3 py-2 text-sm border rounded-lg ${
                isDark
                  ? 'bg-zinc-800 border-zinc-700 text-gray-100'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}>
                <option>INT</option>
                <option>VARCHAR</option>
                <option>DATE</option>
                <option>DECIMAL</option>
              </select>
            </div>
            <div>
              <label className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <input type="checkbox" className="rounded" checked />
                Primary Key
              </label>
            </div>
            <div>
              <label className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <input type="checkbox" className="rounded" />
                Nullable
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Model Explorer Component
const ModelExplorer = () => {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`h-screen flex flex-col ${
      isDark ? 'bg-zinc-950 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header Bar */}
      <HeaderBar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Main Tabs */}
      <MainTabs isDark={isDark} />

      {/* Contextual Toolbar */}
      <ContextualToolbar isDark={isDark} activeTab={activeTab} />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Model Tree */}
        <ModelTree isDark={isDark} />

        {/* Diagram Canvas */}
        <DiagramCanvas isDark={isDark} />

        {/* Property Pane */}
        <PropertyPane isDark={isDark} />
      </div>
    </div>
  );
};

export default ModelExplorer;