'use client';

import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  Database,
  Table,
  Key,
  Link,
  Layers3,
  Box,
  Grid,
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
  Layers,
  BookOpen,
  HelpCircle,
  Info,
  ClipboardList,
  Palette,
  BarChart3,
  Link2,
  FileText,
  Settings,
  ChevronUp,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  CheckSquare,
  Radio,
  Hash
} from 'lucide-react';

// Linear.app-inspired Premium UI Color Theme
const theme = {
  light: {
    pageBackground: '#F9FAFB',
    panelBackground: '#FFFFFF',
    headerBackground: '#FFFFFF',
    accent: '#6366F1',
    primaryText: '#111827',
    secondaryText: '#6B7280',
    borders: '#E5E7EB',
    floatingToolbar: '#FFFFFF',
    hoverBackground: '#F3F4F6',
    activeBackground: '#EEF2FF'
  },
  dark: {
    pageBackground: '#181818',
    panelBackground: '#242424',
    headerBackground: '#1F1F1F',
    accent: '#818CF8',
    primaryText: '#E4E4E4',
    secondaryText: '#A1A1AA',
    borders: '#3A3A3A',
    floatingToolbar: '#2C2C2C',
    hoverBackground: '#2F2F2F',
    activeBackground: '#374151'
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

  return (
    <div className={`h-12 px-4 flex items-center justify-between border-b ${
      isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
    } shadow-sm transition-colors`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center shadow-sm">
          <Database className="w-4 h-4 text-white" />
        </div>
        <span className={`font-semibold text-sm tracking-tight ${isDark ? 'text-gray-100' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
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

      {/* Right: Search */}
      <div className="flex items-center">
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
            className={`pl-8 pr-3 py-1.5 w-48 text-xs rounded-md border ${
              isDark
                ? 'bg-zinc-800 border-zinc-700 text-gray-100 placeholder-gray-400'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
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
    { id: 'diagram', label: 'Diagram', icon: <Grid className="w-4 h-4" /> },
    { id: 'actions', label: 'Actions', icon: <Zap className="w-4 h-4" /> },
    { id: 'help', label: 'Help', icon: <HelpCircle className="w-4 h-4" /> }
  ];

  return (
    <div className={`h-10 px-4 flex items-center border-b ${
      isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
    } transition-colors`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? `${isDark ? 'bg-zinc-800 text-indigo-400 shadow-sm' : 'bg-indigo-50 text-indigo-600 shadow-sm'}`
                : `${isDark ? 'text-gray-400 hover:text-gray-100 hover:bg-zinc-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'}`
            }`}
            style={{ fontWeight: activeTab === tab.id ? 600 : 500 }}
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
    <div className={`h-12 px-4 flex items-center gap-2 border-b ${
      isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'
    } transition-colors`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {toolbarItems.map((item, index) => (
        <button
          key={index}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-all duration-200 shadow-sm ${
            isDark
              ? 'text-gray-300 hover:text-gray-100 hover:bg-zinc-800 hover:shadow-md border border-zinc-800 bg-zinc-900'
              : 'text-gray-700 hover:text-gray-900 hover:bg-white hover:shadow-md border border-gray-200 bg-gray-50'
          }`}
          style={{ fontWeight: 500 }}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
};

// Model Tree Component
const ModelTree = ({ isDark, isCollapsed, onToggle }: { isDark: boolean; isCollapsed: boolean; onToggle: () => void }) => {
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
          className={`flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-xl cursor-pointer transition-all duration-200 ${
            isDark
              ? 'text-gray-300 hover:text-gray-100 hover:bg-zinc-800/70'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/70'
          }`}
          style={{ paddingLeft: `${12 + level * 20}px`, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
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
                  icon: <Grid className="w-4 h-4 text-green-500" />
                },
                {
                  id: 'diagram-2',
                  label: 'Physical Model',
                  icon: <Grid className="w-4 h-4 text-orange-500" />
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
    <div className={`${isCollapsed ? 'w-12' : 'w-80'} h-full border-r overflow-y-auto transition-all duration-300 ${
      isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
    }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
              Model Tree
            </h3>
          )}
          <button
            onClick={onToggle}
            className={`p-1.5 rounded-lg transition-all duration-200 ${
              isDark ? 'hover:bg-zinc-800 text-gray-400 hover:text-gray-200' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
            title={isCollapsed ? 'Expand Tree' : 'Collapse Tree'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronUp className="w-4 h-4 rotate-90" />}
          </button>
        </div>
        {!isCollapsed && (
          <div className="space-y-1">
            {treeData.map((item) => (
              <TreeItem key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Floating Toolbar Component
const FloatingToolbar = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`absolute top-6 left-6 flex items-center gap-1 p-1.5 rounded-xl shadow-lg backdrop-blur-sm border ${
      isDark ? 'bg-zinc-800/90 border-zinc-700' : 'bg-white/90 border-gray-200'
    }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <button className={`p-2.5 rounded-lg hover:scale-105 transition-all duration-200 ${
        isDark ? 'hover:bg-zinc-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
      }`}>
        <MousePointer className="w-4 h-4" />
      </button>
      <button className={`p-2.5 rounded-lg hover:scale-105 transition-all duration-200 ${
        isDark ? 'hover:bg-zinc-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
      }`}>
        <Move className="w-4 h-4" />
      </button>
      <button className={`p-2.5 rounded-lg hover:scale-105 transition-all duration-200 ${
        isDark ? 'hover:bg-zinc-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
      }`}>
        <Square className="w-4 h-4" />
      </button>
      <button className={`p-2.5 rounded-lg hover:scale-105 transition-all duration-200 ${
        isDark ? 'hover:bg-zinc-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
      }`}>
        <ArrowRight className="w-4 h-4" />
      </button>
      <div className={`w-px h-6 mx-1 ${isDark ? 'bg-zinc-700' : 'bg-gray-300'}`} />
      <button className={`p-2.5 rounded-lg hover:scale-105 transition-all duration-200 ${
        isDark ? 'hover:bg-zinc-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
      }`}>
        <ZoomIn className="w-4 h-4" />
      </button>
      <button className={`p-2.5 rounded-lg hover:scale-105 transition-all duration-200 ${
        isDark ? 'hover:bg-zinc-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
      }`}>
        <ZoomOut className="w-4 h-4" />
      </button>
      <button className={`p-2.5 rounded-lg hover:scale-105 transition-all duration-200 ${
        isDark ? 'hover:bg-zinc-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
      }`}>
        <Maximize2 className="w-4 h-4" />
      </button>
    </div>
  );
};

// Mini Map Component
const MiniMap = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`absolute bottom-6 right-6 w-52 h-36 rounded-xl border shadow-xl backdrop-blur-sm ${
      isDark ? 'bg-zinc-800/90 border-zinc-700' : 'bg-white/90 border-gray-200'
    }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontWeight: 500 }}>
            Mini Map
          </span>
          <button className={`p-1.5 rounded-lg hover:scale-105 transition-all duration-200 ${
            isDark ? 'hover:bg-zinc-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}>
            <X className="w-3 h-3" />
          </button>
        </div>
        <div className={`w-full h-24 rounded-lg border-2 border-dashed relative transition-colors ${
          isDark ? 'border-zinc-600 bg-zinc-900/50' : 'border-gray-300 bg-gray-50/50'
        }`}>
          {/* Viewport indicator */}
          <div className="absolute top-2 left-2 w-10 h-7 border-2 border-indigo-500 bg-indigo-500/20 rounded-md shadow-sm"></div>
          {/* Mock entities with improved styling */}
          <div className={`absolute top-1 right-1 w-4 h-3 rounded-md shadow-sm ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`}></div>
          <div className={`absolute bottom-1 left-1 w-5 h-3 rounded-md shadow-sm ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
          <div className={`absolute bottom-1 right-2 w-4 h-3 rounded-md shadow-sm ${isDark ? 'bg-green-400' : 'bg-green-500'}`}></div>
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
      <div className={`flex items-center gap-1 px-3 py-2 border-b transition-colors ${
        isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'
      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => setActiveModel(model.id)}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-all duration-200 shadow-sm ${
              activeModel === model.id
                ? `${isDark ? 'bg-zinc-800 text-indigo-400 border border-zinc-700' : 'bg-white text-indigo-600 shadow-md border border-indigo-200'}`
                : `${isDark ? 'text-gray-400 hover:text-gray-100 border border-transparent' : 'text-gray-600 hover:text-gray-900 border border-transparent'}`
            }`}
            style={{ fontWeight: activeModel === model.id ? 600 : 500 }}
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
      <div className={`flex items-center gap-1 px-3 py-2 border-b transition-colors ${
        isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'
      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {activeModelDiagrams.map((diagram) => (
          <button
            key={diagram.id}
            onClick={() => setActiveDiagram(diagram.id)}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-all duration-200 shadow-sm ${
              activeDiagram === diagram.id
                ? `${isDark ? 'bg-zinc-700 text-gray-100 border border-zinc-600' : 'bg-white text-gray-900 shadow-md border border-gray-200'}`
                : `${isDark ? 'text-gray-400 hover:text-gray-100 border border-transparent' : 'text-gray-600 hover:text-gray-900 border border-transparent'}`
            }`}
            style={{ fontWeight: activeDiagram === diagram.id ? 600 : 500 }}
          >
            <Grid className="w-4 h-4" />
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
      <div className={`flex-1 relative overflow-hidden transition-colors ${
        isDark ? 'bg-zinc-950' : 'bg-gray-50'
      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* Premium Grid background */}
        <div
          className={`absolute inset-0 opacity-40`}
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? '#3A3A3A' : '#E5E7EB'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? '#3A3A3A' : '#E5E7EB'} 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
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

// Enhanced Property Pane Component with Linear.app Premium Design
const PropertyPane = ({ isDark, isCollapsed, onToggle }: { isDark: boolean; isCollapsed: boolean; onToggle: () => void }) => {
  const [selectedObject, setSelectedObject] = useState<'entity' | 'attribute'>('entity');
  const [selectedEntity] = useState('Customer');
  const [selectedAttribute] = useState('Email');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['general']));

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const propertyTabs = [
    { id: 'general', icon: <ClipboardList className="w-4 h-4" />, label: 'General' },
    { id: 'display', icon: <Palette className="w-4 h-4" />, label: 'Display' },
    { id: 'keys', icon: <Key className="w-4 h-4" />, label: 'Keys' },
    { id: 'data', icon: <BarChart3 className="w-4 h-4" />, label: 'Data' },
    { id: 'relations', icon: <Link2 className="w-4 h-4" />, label: 'Relations' },
    { id: 'rules', icon: <FileText className="w-4 h-4" />, label: 'Rules' },
    { id: 'advanced', icon: <Settings className="w-4 h-4" />, label: 'Advanced' }
  ];

  const AccordionSection = ({ id, title, children, defaultExpanded = false }: {
    id: string;
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
  }) => {
    const isExpanded = expandedSections.has(id);

    return (
      <div className={`border-b transition-colors ${
        isDark ? 'border-zinc-800' : 'border-gray-200'
      }`}>
        <button
          onClick={() => toggleSection(id)}
          className={`w-full flex items-center justify-between p-4 text-left transition-all duration-200 ${
            isDark
              ? 'hover:bg-zinc-800/50 text-gray-100'
              : 'hover:bg-indigo-50/50 text-gray-900'
          }`}
          style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
        >
          <span className="text-sm">{title}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            } ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 pt-0">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const PremiumInput = ({ label, value, type = 'text', placeholder = '', rows }: {
    label: string;
    value: string;
    type?: string;
    placeholder?: string;
    rows?: number;
  }) => (
    <div className="mb-4">
      <label className={`block text-xs font-medium mb-2 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`} style={{ fontWeight: 500 }}>
        {label}
      </label>
      {rows ? (
        <textarea
          value={value}
          placeholder={placeholder}
          rows={rows}
          className={`w-full px-4 py-3 text-sm border rounded-lg resize-none transition-all duration-200 ${
            isDark
              ? 'bg-zinc-800 border-zinc-700 text-gray-100 focus:border-indigo-500 focus:bg-zinc-750'
              : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:bg-gray-50'
          } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm hover:border-gray-400`}
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          className={`w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200 ${
            isDark
              ? 'bg-zinc-800 border-zinc-700 text-gray-100 focus:border-indigo-500 focus:bg-zinc-750'
              : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:bg-gray-50'
          } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm hover:border-gray-400`}
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        />
      )}
    </div>
  );

  const PremiumSelect = ({ label, value, options }: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
  }) => (
    <div className="mb-4">
      <label className={`block text-xs font-medium mb-2 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`} style={{ fontWeight: 500 }}>
        {label}
      </label>
      <select
        value={value}
        className={`w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200 ${
          isDark
            ? 'bg-zinc-800 border-zinc-700 text-gray-100 focus:border-indigo-500'
            : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'
        } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm hover:border-gray-400`}
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );

  const PremiumCheckbox = ({ label, checked = false }: {
    label: string;
    checked?: boolean;
  }) => (
    <label className={`flex items-center gap-3 text-sm cursor-pointer py-2 ${
      isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'
    } transition-colors`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <input
        type="checkbox"
        checked={checked}
        className={`w-4 h-4 rounded border-2 transition-colors ${
          isDark
            ? 'border-zinc-600 bg-zinc-800 checked:bg-indigo-500 checked:border-indigo-500'
            : 'border-gray-300 bg-white checked:bg-indigo-600 checked:border-indigo-600'
        }`}
        style={{ accentColor: isDark ? '#818CF8' : '#6366F1' }}
      />
      {label}
    </label>
  );

  return (
    <div className={`${isCollapsed ? 'w-12' : 'w-96'} border-l transition-all duration-300 ${
      isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
    }`}>
      {/* Collapse Toggle Button */}
      <div className={`h-12 border-b flex items-center justify-center ${
        isDark ? 'border-zinc-800' : 'border-gray-200'
      }`}>
        <button
          onClick={onToggle}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isDark ? 'hover:bg-zinc-800 text-gray-400 hover:text-gray-200' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
          title={isCollapsed ? 'Expand Properties' : 'Collapse Properties'}
        >
          {isCollapsed ? <ChevronUp className="w-4 h-4 -rotate-90" /> : <ChevronUp className="w-4 h-4 rotate-90" />}
        </button>
      </div>
      {!isCollapsed && (
        <div className="flex h-full">
          {/* Left Icon Strip */}
          <div className={`w-6 border-r transition-colors flex flex-col ${
            isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
          }`}>
        {propertyTabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`h-10 flex items-center justify-center cursor-pointer transition-all duration-200 ${
              index === 0
                ? `${isDark ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'} shadow-sm`
                : `${isDark ? 'text-gray-400 hover:text-gray-100 hover:bg-zinc-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-indigo-50/50'}`
            }`}
            title={tab.label}
            style={{ marginBottom: '2px' }}
          >
            {tab.icon}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 overflow-y-auto transition-colors ${
        isDark ? 'bg-zinc-900' : 'bg-white'
      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* Context Header */}
        <div className={`p-4 border-b transition-colors ${
          isDark ? 'border-zinc-800 bg-zinc-900' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center gap-3">
            <ClipboardList className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h2 className={`text-lg font-semibold ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`} style={{ fontWeight: 600 }}>
              {selectedObject === 'entity' ? selectedEntity : selectedAttribute}
            </h2>
          </div>
          <p className={`text-xs mt-1 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {selectedObject === 'entity' ? 'Entity Properties' : 'Attribute Properties'}
          </p>
        </div>

        {/* Property Sections */}
        <div>
          {selectedObject === 'entity' ? (
            <>
              <AccordionSection id="general" title="▼ Entity Properties" defaultExpanded>
                <PremiumInput label="Name" value="Customer" />
                <PremiumInput label="Physical Name" value="CUSTOMER" />
                <PremiumInput
                  label="Definition"
                  value="Core customer entity storing customer information and contact details for business operations"
                  rows={4}
                />
                <PremiumSelect
                  label="Owner"
                  value="dbo"
                  options={[
                    { value: 'dbo', label: 'dbo' },
                    { value: 'admin', label: 'admin' },
                    { value: 'app_user', label: 'app_user' }
                  ]}
                />
                <PremiumCheckbox label="Complete" checked />
                <PremiumCheckbox label="Conceptual Only" />
              </AccordionSection>

              <AccordionSection id="naming" title="▼ Naming Standards">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <PremiumInput label="Prefix" value="CUST_" />
                  <PremiumInput label="Suffix" value="_TBL" />
                </div>
                <PremiumInput label="Abbreviation" value="CUST" />
                <PremiumCheckbox label="Apply naming rules" checked />
              </AccordionSection>

              <AccordionSection id="display" title="▶ Display Options">
                <PremiumSelect
                  label="Color"
                  value="blue"
                  options={[
                    { value: 'blue', label: '🔵 Blue' },
                    { value: 'green', label: '🟢 Green' },
                    { value: 'red', label: '🔴 Red' },
                    { value: 'purple', label: '🟣 Purple' }
                  ]}
                />
                <PremiumSelect
                  label="Font Size"
                  value="medium"
                  options={[
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' }
                  ]}
                />
                <PremiumCheckbox label="Show in diagram" checked />
                <PremiumCheckbox label="Show entity name" checked />
                <PremiumCheckbox label="Show definition" />
                <PremiumCheckbox label="Show attributes" checked />
              </AccordionSection>

              <AccordionSection id="keys" title="▶ Keys & Indexes">
                <div className={`p-4 rounded-lg border mb-4 ${
                  isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
                }`}>
                  <h4 className={`text-sm font-medium mb-3 ${
                    isDark ? 'text-gray-100' : 'text-gray-900'
                  }`}>Primary Key</h4>
                  <PremiumInput label="Key Name" value="PK_Customer" />
                  <div className={`flex items-center gap-2 p-2 rounded border ${
                    isDark ? 'bg-zinc-700 border-zinc-600' : 'bg-white border-gray-300'
                  }`}>
                    <Key className="w-4 h-4 text-yellow-500" />
                    <span className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>CustomerID</span>
                  </div>
                  <div className="mt-3">
                    <PremiumCheckbox label="Generate constraint" checked />
                    <PremiumCheckbox label="Create index" checked />
                  </div>
                </div>
              </AccordionSection>
            </>
          ) : (
            <>
              <AccordionSection id="general" title="▼ Attribute Properties" defaultExpanded>
                <PremiumInput label="Name" value="Email" />
                <PremiumInput label="Physical Name" value="EMAIL" />
                <PremiumInput
                  label="Definition"
                  value="Customer email address for communication purposes"
                  rows={3}
                />
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  Parent Entity: Customer
                </div>
                <PremiumCheckbox label="Complete" checked />
              </AccordionSection>

              <AccordionSection id="datatype" title="▼ Data Type">
                <PremiumSelect
                  label="Domain"
                  value="emailaddress"
                  options={[
                    { value: 'emailaddress', label: 'EmailAddress' },
                    { value: 'string', label: 'String' },
                    { value: 'text', label: 'Text' }
                  ]}
                />
                <div className="grid grid-cols-3 gap-4">
                  <PremiumInput label="Length" value="255" />
                  <PremiumInput label="Precision" value="" />
                  <PremiumInput label="Scale" value="" />
                </div>
                <PremiumCheckbox label="Use domain settings" checked />

                <div className="mt-6">
                  <h4 className={`text-sm font-medium mb-3 ${
                    isDark ? 'text-gray-100' : 'text-gray-900'
                  }`}>Null Options</h4>
                  <div className="space-y-2">
                    <label className={`flex items-center gap-3 text-sm cursor-pointer ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <input type="radio" name="nullability" value="null" className={`${
                        isDark ? 'accent-indigo-400' : 'accent-indigo-600'
                      }`} />
                      Null
                    </label>
                    <label className={`flex items-center gap-3 text-sm cursor-pointer ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <input type="radio" name="nullability" value="not-null" checked className={`${
                        isDark ? 'accent-indigo-400' : 'accent-indigo-600'
                      }`} />
                      Not Null
                    </label>
                    <label className={`flex items-center gap-3 text-sm cursor-pointer ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <input type="radio" name="nullability" value="default-null" className={`${
                        isDark ? 'accent-indigo-400' : 'accent-indigo-600'
                      }`} />
                      Default Null
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <PremiumInput label="Default Value" value="" />
                </div>
              </AccordionSection>
            </>
          )}
        </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Model Explorer Component
const ModelExplorer = () => {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [isTreeCollapsed, setIsTreeCollapsed] = useState(false);
  const [isPropertyCollapsed, setIsPropertyCollapsed] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`h-full flex flex-col transition-colors ${
      isDark ? 'bg-zinc-950 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header Bar */}
      <HeaderBar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Main Tabs */}
      <MainTabs isDark={isDark} />

      {/* Contextual Toolbar */}
      <ContextualToolbar isDark={isDark} activeTab={activeTab} />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Model Tree */}
        <ModelTree isDark={isDark} isCollapsed={isTreeCollapsed} onToggle={() => setIsTreeCollapsed(!isTreeCollapsed)} />

        {/* Diagram Canvas */}
        <DiagramCanvas isDark={isDark} />

        {/* Property Pane */}
        <PropertyPane isDark={isDark} isCollapsed={isPropertyCollapsed} onToggle={() => setIsPropertyCollapsed(!isPropertyCollapsed)} />
      </div>
    </div>
  );
};

export default ModelExplorer;