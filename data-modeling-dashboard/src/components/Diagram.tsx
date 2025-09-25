'use client';

import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Plus,
  Database,
  Table,
  Key,
  Link,
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
  PlusCircle,
  MinusCircle,
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
  StickyNote,
  Group,
  Ungroup,
  Hand,
  Shapes,
  Sparkles,
  Layers,
  AlignLeft,
  AlignCenter,
  Type,
  BookOpen,
  HelpCircle,
  Info,
  ClipboardList,
  Palette,
  BarChart3,
  Link2,
  FileText,
  Settings,
  Cpu,
  Hash,
  List,
  Columns,
  ToggleLeft,
  ToggleRight,
  Minimize2,
  Expand,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  GitBranch,
  GitMerge,
} from 'lucide-react';

interface DiagramProps {
  isDark: boolean;
  toggleTheme: () => void;
}

// Toolbar Button Component
const ToolbarButton = ({
  icon: Icon,
  tooltip,
  isDark,
  isActive = false,
  onClick
}: {
  icon: any;
  tooltip: string;
  isDark: boolean;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        className={`p-2.5 rounded-lg hover:scale-105 transition-all duration-200 cursor-pointer ${
          isActive
            ? isDark
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-indigo-500 text-white shadow-md'
            : isDark
            ? 'hover:bg-zinc-700 text-gray-300'
            : 'hover:bg-gray-100 text-gray-600'
        }`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={onClick}
        style={{ pointerEvents: 'auto', zIndex: 10000 }}
      >
        <Icon className="w-4 h-4" />
      </button>
      {showTooltip && (
        <div className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg text-xs whitespace-nowrap z-50 ${
          isDark ? 'bg-zinc-700 text-white' : 'bg-gray-800 text-white'
        }`}>
          {tooltip}
        </div>
      )}
    </div>
  );
};

// Object Toolbar Component
const ObjectToolbar = ({
  isDark,
  isDrawingMode,
  onSelectTool
}: {
  isDark: boolean;
  isDrawingMode: 'entity' | 'annotation' | 'identifying' | 'non-identifying' | null;
  onSelectTool: (mode: 'entity' | 'annotation' | 'identifying' | 'non-identifying' | null) => void;
}) => {
  return (
    <div className={`absolute top-6 left-6 flex flex-col gap-1 p-1.5 rounded-xl shadow-lg backdrop-blur-sm border z-50 ${
      isDark ? 'bg-zinc-800/90 border-zinc-700' : 'bg-white/90 border-gray-200'
    }`} style={{ fontFamily: 'Inter, system-ui, sans-serif', zIndex: 9999, pointerEvents: 'auto' }}>
      <ToolbarButton
        icon={MousePointer}
        tooltip="Pointer/Select Tool"
        isDark={isDark}
        isActive={isDrawingMode === null}
        onClick={() => onSelectTool(null)}
      />
      <ToolbarButton
        icon={Table}
        tooltip="Add Entity/Table"
        isDark={isDark}
        isActive={isDrawingMode === 'entity'}
        onClick={() => onSelectTool('entity')}
      />
      <ToolbarButton
        icon={GitBranch}
        tooltip="Identifying Relationship (Solid Line)"
        isDark={isDark}
        isActive={isDrawingMode === 'identifying'}
        onClick={() => onSelectTool('identifying')}
      />
      <ToolbarButton
        icon={GitMerge}
        tooltip="Non-Identifying Relationship (Dashed Line)"
        isDark={isDark}
        isActive={isDrawingMode === 'non-identifying'}
        onClick={() => onSelectTool('non-identifying')}
      />
      <ToolbarButton
        icon={StickyNote}
        tooltip="Add Note/Annotation"
        isDark={isDark}
        isActive={isDrawingMode === 'annotation'}
        onClick={() => onSelectTool('annotation')}
      />
      <div className={`h-px w-6 my-1 ${isDark ? 'bg-zinc-700' : 'bg-gray-300'}`} />
      <ToolbarButton icon={Group} tooltip="Group Entities" isDark={isDark} />
      <ToolbarButton icon={Ungroup} tooltip="Ungroup Entities" isDark={isDark} />
      <div className={`h-px w-6 my-1 ${isDark ? 'bg-zinc-700' : 'bg-gray-300'}`} />
      <ToolbarButton icon={Square} tooltip="Draw Rectangle" isDark={isDark} />
      <ToolbarButton icon={Circle} tooltip="Draw Ellipse" isDark={isDark} />
      <ToolbarButton icon={ArrowRight} tooltip="Draw Line" isDark={isDark} />
    </div>
  );
};

// View Toolbar Button Component
const ViewToolbarButton = ({ icon: Icon, tooltip, isDark, onClick }: { icon: any; tooltip: string; isDark: boolean; onClick?: () => void }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        className={`p-2.5 rounded-lg hover:scale-105 transition-all duration-200 ${
          isDark ? 'hover:bg-zinc-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
        }`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={onClick}
      >
        <Icon className="w-4 h-4" />
      </button>
      {showTooltip && (
        <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-xs whitespace-nowrap z-50 ${
          isDark ? 'bg-zinc-700 text-white' : 'bg-gray-800 text-white'
        }`}>
          {tooltip}
        </div>
      )}
    </div>
  );
};

// View Controls Toolbar Component
const ViewControlsToolbar = ({ isDark, onToggleFullScreen, isFullScreen }: { isDark: boolean; onToggleFullScreen: () => void; isFullScreen: boolean }) => {
  return (
    <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-1 p-1.5 rounded-xl shadow-lg backdrop-blur-sm border ${
      isDark ? 'bg-zinc-800/90 border-zinc-700' : 'bg-white/90 border-gray-200'
    }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <ViewToolbarButton icon={ZoomIn} tooltip="Zoom In" isDark={isDark} />
      <ViewToolbarButton icon={ZoomOut} tooltip="Zoom Out" isDark={isDark} />
      <ViewToolbarButton icon={Maximize2} tooltip="Fit to Screen" isDark={isDark} />
      <div className={`w-px h-6 mx-1 ${isDark ? 'bg-zinc-700' : 'bg-gray-300'}`} />
      <ViewToolbarButton icon={Hand} tooltip="Pan/Hand Tool" isDark={isDark} />
      <div className={`w-px h-6 mx-1 ${isDark ? 'bg-zinc-700' : 'bg-gray-300'}`} />
      <ViewToolbarButton icon={Grid} tooltip="Toggle Grid" isDark={isDark} />
      <ViewToolbarButton icon={Target} tooltip="Snap to Grid/Alignment" isDark={isDark} />
      <div className={`w-px h-6 mx-1 ${isDark ? 'bg-zinc-700' : 'bg-gray-300'}`} />
      <ViewToolbarButton icon={Sparkles} tooltip="Auto-layout" isDark={isDark} />
      <ViewToolbarButton icon={Map} tooltip="Toggle Minimap" isDark={isDark} />
      <div className={`w-px h-6 mx-1 ${isDark ? 'bg-zinc-700' : 'bg-gray-300'}`} />
      <ViewToolbarButton
        icon={isFullScreen ? Minimize2 : Expand}
        tooltip={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
        isDark={isDark}
        onClick={onToggleFullScreen}
      />
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
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className={`h-20 rounded-lg border ${
          isDark ? 'bg-zinc-900/50 border-zinc-700' : 'bg-gray-50 border-gray-300'
        }`}>
          <div className="p-2">
            <div className={`w-full h-full flex items-center justify-center text-xs ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} style={{ fontWeight: 400 }}>
              Model Overview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Model Tree Component
const ModelTree = ({
  isDark,
  onClose,
  entities = [],
  relationships = [],
  selectedEntity,
  selectedRelationship,
  onSelectEntity,
  onSelectRelationship
}: {
  isDark: boolean;
  onClose?: () => void;
  entities?: CanvasEntity[];
  relationships?: Relationship[];
  selectedEntity?: string | null;
  selectedRelationship?: string | null;
  onSelectEntity?: (entityId: string | null) => void;
  onSelectRelationship?: (relationshipId: string | null) => void;
}) => {
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['model1', 'entities', 'relationships', 'domains', 'views', 'indexes']);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev =>
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  return (
    <div className={`w-72 border-r ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'}`}>
      {/* Tree Header */}
      <div className={`p-3 border-b ${isDark ? 'border-zinc-800' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Model Explorer</h3>
          <div className="flex gap-1">
            <button className={`p-1.5 rounded-lg hover:scale-105 transition-all duration-200 ${
              isDark ? 'hover:bg-zinc-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button className={`p-1.5 rounded-lg hover:scale-105 transition-all duration-200 ${
              isDark ? 'hover:bg-zinc-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <Search className="w-3.5 h-3.5" />
            </button>
            <button className={`p-1.5 rounded-lg hover:scale-105 transition-all duration-200 ${
              isDark ? 'hover:bg-zinc-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <Filter className="w-3.5 h-3.5" />
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className={`p-1.5 rounded-lg hover:scale-105 transition-all duration-200 ${
                  isDark ? 'hover:bg-zinc-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Hide Tree Panel"
              >
                <PanelLeftClose className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tree Content */}
      <div className="p-2 text-xs">
        {/* Model Root */}
        <div className="mb-1">
          <button
            onClick={() => toggleNode('model1')}
            className={`w-full flex items-center gap-1 p-1.5 rounded-lg hover:scale-[1.02] transition-all duration-200 ${
              isDark ? 'hover:bg-zinc-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {expandedNodes.includes('model1') ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
            <Database className="w-3.5 h-3.5 text-blue-500" />
            <span>E-Commerce Model</span>
          </button>

          {expandedNodes.includes('model1') && (
            <div className="ml-3">
              {/* Entities Section */}
              <button
                onClick={() => toggleNode('entities')}
                className={`w-full flex items-center gap-1 p-1.5 rounded-lg hover:scale-[1.02] transition-all duration-200 ${
                  isDark ? 'hover:bg-zinc-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {expandedNodes.includes('entities') ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
                <Folder className="w-3.5 h-3.5 text-amber-500" />
                <span>Entities</span>
              </button>

              {expandedNodes.includes('entities') && (
                <div className="ml-3">
                  {entities.length === 0 ? (
                    <div className={`p-2 text-xs italic ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      No entities created yet
                    </div>
                  ) : (
                    entities.filter(e => e.type === 'entity').map((entity) => (
                      <button
                        key={entity.id}
                        onClick={() => onSelectEntity?.(entity.id)}
                        className={`w-full flex items-center gap-1 p-1.5 rounded-lg hover:scale-[1.02] transition-all duration-200 ${
                          selectedEntity === entity.id
                            ? isDark
                              ? 'bg-indigo-600 text-white'
                              : 'bg-indigo-100 text-indigo-800'
                            : isDark
                            ? 'hover:bg-zinc-800 text-gray-300'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Table className="w-3.5 h-3.5 text-green-500" />
                        <span className="truncate">{entity.name}</span>
                        <span className={`ml-auto text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {entity.attributes?.length || 0}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}

              {/* Relationships Section */}
              <button
                onClick={() => toggleNode('relationships')}
                className={`w-full flex items-center gap-1 p-1.5 rounded-lg hover:scale-[1.02] transition-all duration-200 ${
                  isDark ? 'hover:bg-zinc-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {expandedNodes.includes('relationships') ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
                <GitBranch className="w-3.5 h-3.5 text-purple-500" />
                <span>Relationships</span>
                <span className={`ml-auto text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {relationships.length}
                </span>
              </button>

              {expandedNodes.includes('relationships') && (
                <div className="ml-3">
                  {relationships.length === 0 ? (
                    <div className={`p-2 text-xs italic ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      No relationships created yet
                    </div>
                  ) : (
                    relationships.map((relationship) => {
                      const sourceEntity = entities.find(e => e.id === relationship.sourceEntityId);
                      const targetEntity = entities.find(e => e.id === relationship.targetEntityId);
                      const relationshipLabel = `${sourceEntity?.name || 'Unknown'} → ${targetEntity?.name || 'Unknown'}`;

                      return (
                        <button
                          key={relationship.id}
                          onClick={() => onSelectRelationship?.(relationship.id)}
                          className={`w-full flex items-center gap-1 p-1.5 rounded-lg hover:scale-[1.02] transition-all duration-200 ${
                            selectedRelationship === relationship.id
                              ? isDark
                                ? 'bg-indigo-600 text-white'
                                : 'bg-indigo-100 text-indigo-800'
                              : isDark
                              ? 'hover:bg-zinc-800 text-gray-300'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {relationship.type === 'identifying' ? (
                            <GitBranch className="w-3.5 h-3.5 text-blue-500" />
                          ) : (
                            <GitMerge className="w-3.5 h-3.5 text-orange-500" />
                          )}
                          <span className="truncate text-xs">{relationshipLabel}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              )}

              {/* Domains Section */}
              <button
                onClick={() => toggleNode('domains')}
                className={`w-full flex items-center gap-1 p-1.5 rounded-lg hover:scale-[1.02] transition-all duration-200 ${
                  isDark ? 'hover:bg-zinc-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {expandedNodes.includes('domains') ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
                <Box className="w-3.5 h-3.5 text-teal-500" />
                <span>Domains</span>
                <span className={`ml-auto text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  4
                </span>
              </button>

              {expandedNodes.includes('domains') && (
                <div className="ml-3">
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Target className="w-3.5 h-3.5 text-teal-400" />
                    <span>EmailDomain</span>
                  </div>
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Target className="w-3.5 h-3.5 text-teal-400" />
                    <span>PhoneDomain</span>
                  </div>
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Target className="w-3.5 h-3.5 text-teal-400" />
                    <span>CurrencyDomain</span>
                  </div>
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Target className="w-3.5 h-3.5 text-teal-400" />
                    <span>DateTimeDomain</span>
                  </div>
                </div>
              )}

              {/* Views Section */}
              <button
                onClick={() => toggleNode('views')}
                className={`w-full flex items-center gap-1 p-1.5 rounded-lg hover:scale-[1.02] transition-all duration-200 ${
                  isDark ? 'hover:bg-zinc-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {expandedNodes.includes('views') ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
                <Eye className="w-3.5 h-3.5 text-cyan-500" />
                <span>Views</span>
                <span className={`ml-auto text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  3
                </span>
              </button>

              {expandedNodes.includes('views') && (
                <div className="ml-3">
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>CustomerOrdersView</span>
                  </div>
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>ProductSalesView</span>
                  </div>
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>InventoryStatusView</span>
                  </div>
                </div>
              )}

              {/* Indexes Section */}
              <button
                onClick={() => toggleNode('indexes')}
                className={`w-full flex items-center gap-1 p-1.5 rounded-lg hover:scale-[1.02] transition-all duration-200 ${
                  isDark ? 'hover:bg-zinc-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {expandedNodes.includes('indexes') ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
                <Activity className="w-3.5 h-3.5 text-orange-500" />
                <span>Indexes</span>
                <span className={`ml-auto text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  6
                </span>
              </button>

              {expandedNodes.includes('indexes') && (
                <div className="ml-3">
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Activity className="w-3.5 h-3.5 text-orange-400" />
                    <span>idx_customer_email</span>
                  </div>
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Activity className="w-3.5 h-3.5 text-orange-400" />
                    <span>idx_product_sku</span>
                  </div>
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Activity className="w-3.5 h-3.5 text-orange-400" />
                    <span>idx_order_date</span>
                  </div>
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Activity className="w-3.5 h-3.5 text-orange-400" />
                    <span>idx_category_name</span>
                  </div>
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Activity className="w-3.5 h-3.5 text-orange-400" />
                    <span>idx_payment_status</span>
                  </div>
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Activity className="w-3.5 h-3.5 text-orange-400" />
                    <span>idx_inventory_level</span>
                  </div>
                </div>
              )}

              {/* Procedures Section */}
              <button
                onClick={() => toggleNode('procedures')}
                className={`w-full flex items-center gap-1 p-1.5 rounded-lg hover:scale-[1.02] transition-all duration-200 ${
                  isDark ? 'hover:bg-zinc-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {expandedNodes.includes('procedures') ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
                <Zap className="w-3.5 h-3.5 text-yellow-500" />
                <span>Procedures</span>
                <span className={`ml-auto text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  2
                </span>
              </button>

              {expandedNodes.includes('procedures') && (
                <div className="ml-3">
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    <span>sp_ProcessOrder</span>
                  </div>
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    <span>sp_UpdateInventory</span>
                  </div>
                </div>
              )}

              {/* Triggers Section */}
              <button
                onClick={() => toggleNode('triggers')}
                className={`w-full flex items-center gap-1 p-1.5 rounded-lg hover:scale-[1.02] transition-all duration-200 ${
                  isDark ? 'hover:bg-zinc-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {expandedNodes.includes('triggers') ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
                <Activity className="w-3.5 h-3.5 text-red-500" />
                <span>Triggers</span>
                <span className={`ml-auto text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  1
                </span>
              </button>

              {expandedNodes.includes('triggers') && (
                <div className="ml-3">
                  <div className={`p-1.5 flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Activity className="w-3.5 h-3.5 text-red-400" />
                    <span>trg_audit_changes</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Properties Panel Component - Context-aware properties panel
const PropertiesPanel = ({
  isDark,
  onClose,
  selectedEntity,
  selectedRelationship,
  entities,
  relationships,
  onUpdateEntity,
  onUpdateRelationship,
  onAddEntity,
  onRemoveEntity
}: {
  isDark: boolean;
  onClose?: () => void;
  selectedEntity?: string | null;
  selectedRelationship?: string | null;
  entities?: CanvasEntity[];
  relationships?: Relationship[];
  onUpdateEntity?: (entityId: string, updates: Partial<CanvasEntity>) => void;
  onUpdateRelationship?: (relationshipId: string, updates: Partial<Relationship>) => void;
  onAddEntity?: () => void;
  onRemoveEntity?: (entityId: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState('general');

  const renderContent = () => {
    if (selectedEntity) {
      // Entity Properties - Erwin-style tabs
      const currentEntity = entities?.find(e => e.id === selectedEntity);
      const entityTabs = [
        { id: 'general', label: 'General', icon: FileText },
        { id: 'attributes', label: 'Attributes', icon: Table },
        { id: 'display', label: 'Display', icon: Eye },
        { id: 'keys', label: 'Keys', icon: Key },
        { id: 'data', label: 'Data', icon: Database },
        { id: 'relations', label: 'Relations', icon: GitBranch },
        { id: 'rules', label: 'Rules', icon: Settings },
        { id: 'advanced', label: 'Advanced', icon: Settings }
      ];

      return (
        <div className="flex h-full">
          {/* Left Icon Strip */}
          <div className={`w-6 border-r transition-colors flex flex-col ${
            isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
          }`}>
            {entityTabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`h-8 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  activeTab === tab.id
                    ? `${isDark ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'} shadow-sm`
                    : `${isDark ? 'text-gray-400 hover:text-gray-100 hover:bg-zinc-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-indigo-50/50'}`
                }`}
                title={tab.label}
                style={{ marginBottom: '1px' }}
              >
                <div className="w-3.5 h-3.5">
                  <tab.icon className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className={`flex-1 overflow-y-auto transition-colors ${
            isDark ? 'bg-zinc-900' : 'bg-white'
          }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {/* Context Header */}
            <div className={`p-3 border-b transition-colors ${
              isDark ? 'border-zinc-800 bg-zinc-900' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-2">
                {entityTabs.find(tab => tab.id === activeTab)?.icon &&
                  React.createElement(entityTabs.find(tab => tab.id === activeTab)!.icon, {
                    className: `w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`
                  })
                }
                <h2 className={`text-sm font-semibold ${
                  isDark ? 'text-gray-100' : 'text-gray-900'
                }`} style={{ fontWeight: 600 }}>
                  {entityTabs.find(t => t.id === activeTab)?.label} Properties
                </h2>
              </div>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentEntity?.name || selectedEntity}
              </p>
            </div>

            <div className="p-3 space-y-3">
            {activeTab === 'general' && (
              <div className="space-y-2">
                <div>
                  <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Entity Name
                  </label>
                  <input
                    type="text"
                    defaultValue={currentEntity?.name || ''}
                    className={`w-full p-1.5 text-xs rounded border ${
                      isDark
                        ? 'bg-zinc-800 border-zinc-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Definition
                  </label>
                  <textarea
                    rows={2}
                    className={`w-full p-1.5 text-xs rounded border ${isDark ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    placeholder="Entity definition..."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="abstract" className="rounded" />
                  <label htmlFor="abstract" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Abstract Entity
                  </label>
                </div>

                {/* Entity Management Actions */}
                <div className={`border-t pt-3 space-y-2 ${isDark ? 'border-zinc-700' : 'border-gray-200'}`}>
                  <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Entity Actions
                  </label>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={onAddEntity}
                      className={`flex items-center gap-2 px-3 py-2 text-xs rounded-md transition-colors ${
                        isDark
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <PlusCircle className="w-3 h-3" />
                      Add New Entity
                    </button>
                    <button
                      onClick={() => selectedEntity && onRemoveEntity?.(selectedEntity)}
                      className={`flex items-center gap-2 px-3 py-2 text-xs rounded-md transition-colors ${
                        isDark
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove Entity
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attributes' && (
              <div className="space-y-3">
                {/* Header with attribute count and quick actions */}
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Attributes ({currentEntity?.attributes?.length || 0})
                  </h4>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        if (!currentEntity || !onUpdateEntity) return;
                        const newAttributes = [...(currentEntity.attributes || [])];
                        newAttributes.push({
                          name: 'id',
                          type: 'INT',
                          isPrimaryKey: true,
                          isForeignKey: false,
                          isRequired: true
                        });
                        onUpdateEntity(currentEntity.id, { attributes: newAttributes });
                      }}
                      className={`px-2 py-1 text-xs rounded ${
                        isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                      title="Add Primary Key"
                    >
                      Add PK
                    </button>
                    <button
                      onClick={() => {
                        if (!currentEntity || !onUpdateEntity) return;
                        const newAttributes = [...(currentEntity.attributes || [])];
                        newAttributes.push(
                          {
                            name: 'created_at',
                            type: 'TIMESTAMP',
                            isPrimaryKey: false,
                            isForeignKey: false,
                            isRequired: true
                          },
                          {
                            name: 'updated_at',
                            type: 'TIMESTAMP',
                            isPrimaryKey: false,
                            isForeignKey: false,
                            isRequired: true
                          }
                        );
                        onUpdateEntity(currentEntity.id, { attributes: newAttributes });
                      }}
                      className={`px-2 py-1 text-xs rounded ${
                        isDark ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                      title="Add Timestamps"
                    >
                      Add TS
                    </button>
                  </div>
                </div>

                {/* Add attribute button */}
                <button
                  onClick={() => {
                    if (!currentEntity || !onUpdateEntity) return;
                    const newAttributes = [...(currentEntity.attributes || [])];
                    newAttributes.push({
                      name: 'new_attribute',
                      type: 'VARCHAR(255)',
                      isPrimaryKey: false,
                      isForeignKey: false,
                      isRequired: false
                    });
                    onUpdateEntity(currentEntity.id, { attributes: newAttributes });
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded border border-dashed ${
                    isDark
                      ? 'border-zinc-600 hover:border-zinc-500 text-gray-300 hover:bg-zinc-700/50'
                      : 'border-gray-300 hover:border-gray-400 text-gray-600 hover:bg-gray-50'
                  } transition-colors duration-200`}
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Attribute
                </button>

                {/* Attributes table */}
                {currentEntity?.attributes && currentEntity.attributes.length > 0 ? (
                  <div className={`border rounded-lg overflow-hidden ${isDark ? 'border-zinc-600' : 'border-gray-300'}`}>
                    {/* Table header */}
                    <div className={`grid grid-cols-7 gap-1 p-2 text-xs font-medium ${
                      isDark ? 'bg-zinc-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      <div className="col-span-2">Name</div>
                      <div>Type</div>
                      <div className="text-center">PK</div>
                      <div className="text-center">FK</div>
                      <div className="text-center">Req</div>
                      <div className="text-center">Del</div>
                    </div>

                    {/* Table body */}
                    <div className="divide-y divide-gray-200 dark:divide-zinc-600">
                      {currentEntity.attributes.map((attr, index) => (
                        <div key={index} className={`grid grid-cols-7 gap-1 p-2 items-center ${
                          isDark ? 'bg-zinc-800' : 'bg-white'
                        }`}>
                          {/* Attribute name */}
                          <div className="col-span-2">
                            <input
                              type="text"
                              value={attr.name}
                              onChange={(e) => {
                                if (!currentEntity || !onUpdateEntity) return;
                                const newAttributes = [...(currentEntity.attributes || [])];
                                newAttributes[index] = { ...attr, name: e.target.value };
                                onUpdateEntity(currentEntity.id, { attributes: newAttributes });
                              }}
                              className={`w-full px-2 py-1 text-xs rounded border ${
                                isDark
                                  ? 'bg-zinc-700 border-zinc-600 text-gray-300 focus:border-blue-500'
                                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            />
                          </div>

                          {/* Attribute type */}
                          <div>
                            <select
                              value={attr.type}
                              onChange={(e) => {
                                if (!currentEntity || !onUpdateEntity) return;
                                const newAttributes = [...(currentEntity.attributes || [])];
                                newAttributes[index] = { ...attr, type: e.target.value };
                                onUpdateEntity(currentEntity.id, { attributes: newAttributes });
                              }}
                              className={`w-full px-1 py-1 text-xs rounded border ${
                                isDark
                                  ? 'bg-zinc-700 border-zinc-600 text-gray-300 focus:border-blue-500'
                                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            >
                              <option value="INT">INT</option>
                              <option value="BIGINT">BIGINT</option>
                              <option value="VARCHAR(255)">VARCHAR(255)</option>
                              <option value="VARCHAR(100)">VARCHAR(100)</option>
                              <option value="VARCHAR(50)">VARCHAR(50)</option>
                              <option value="TEXT">TEXT</option>
                              <option value="DATE">DATE</option>
                              <option value="TIMESTAMP">TIMESTAMP</option>
                              <option value="BOOLEAN">BOOLEAN</option>
                              <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                              <option value="FLOAT">FLOAT</option>
                              <option value="DOUBLE">DOUBLE</option>
                              <option value="CHAR(3)">CHAR(3)</option>
                              <option value="JSON">JSON</option>
                            </select>
                          </div>

                          {/* Primary Key checkbox */}
                          <div className="text-center">
                            <input
                              type="checkbox"
                              checked={attr.isPrimaryKey || false}
                              onChange={(e) => {
                                if (!currentEntity || !onUpdateEntity) return;
                                const newAttributes = [...(currentEntity.attributes || [])];
                                newAttributes[index] = { ...attr, isPrimaryKey: e.target.checked };
                                onUpdateEntity(currentEntity.id, { attributes: newAttributes });
                              }}
                              className={`rounded ${isDark ? 'text-blue-400 focus:ring-blue-400' : 'text-blue-600 focus:ring-blue-600'}`}
                            />
                          </div>

                          {/* Foreign Key checkbox */}
                          <div className="text-center">
                            <input
                              type="checkbox"
                              checked={attr.isForeignKey || false}
                              onChange={(e) => {
                                if (!currentEntity || !onUpdateEntity) return;
                                const newAttributes = [...(currentEntity.attributes || [])];
                                newAttributes[index] = { ...attr, isForeignKey: e.target.checked };
                                onUpdateEntity(currentEntity.id, { attributes: newAttributes });
                              }}
                              className={`rounded ${isDark ? 'text-yellow-400 focus:ring-yellow-400' : 'text-yellow-600 focus:ring-yellow-600'}`}
                            />
                          </div>

                          {/* Required checkbox */}
                          <div className="text-center">
                            <input
                              type="checkbox"
                              checked={attr.isRequired || false}
                              onChange={(e) => {
                                if (!currentEntity || !onUpdateEntity) return;
                                const newAttributes = [...(currentEntity.attributes || [])];
                                newAttributes[index] = { ...attr, isRequired: e.target.checked };
                                onUpdateEntity(currentEntity.id, { attributes: newAttributes });
                              }}
                              className={`rounded ${isDark ? 'text-red-400 focus:ring-red-400' : 'text-red-600 focus:ring-red-600'}`}
                            />
                          </div>

                          {/* Delete button */}
                          <div className="text-center">
                            <button
                              onClick={() => {
                                if (!currentEntity || !onUpdateEntity) return;
                                const newAttributes = [...(currentEntity.attributes || [])];
                                newAttributes.splice(index, 1);
                                onUpdateEntity(currentEntity.id, { attributes: newAttributes });
                              }}
                              className={`p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'}`}
                              title="Delete attribute"
                            >
                              <MinusCircle className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={`text-center py-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    <Table className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No attributes defined</p>
                    <p className="text-xs mt-1">Click "Add Attribute" to get started</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'display' && (
              <div className="space-y-2">
                <div>
                  <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Display Color
                  </label>
                  <input
                    type="color"
                    defaultValue="#3b82f6"
                    className={`w-full h-8 rounded border ${
                      isDark ? 'border-zinc-600' : 'border-gray-300'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="showName" defaultChecked className="rounded" />
                  <label htmlFor="showName" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Show Entity Name
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="showAttrs" defaultChecked className="rounded" />
                  <label htmlFor="showAttrs" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Show Attributes
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'keys' && (
              <div className="space-y-2">
                <div>
                  <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Primary Key
                  </label>
                  <select className={`w-full p-1.5 text-xs rounded border ${
                    isDark
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}>
                    <option>Auto-generate</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="allowNulls" className="rounded" />
                  <label htmlFor="allowNulls" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Allow NULL Values
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-2">
                <div>
                  <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Default Data Type
                  </label>
                  <select className={`w-full p-1.5 text-xs rounded border ${
                    isDark
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}>
                    <option>VARCHAR</option>
                    <option>INTEGER</option>
                    <option>DECIMAL</option>
                    <option>DATE</option>
                    <option>BOOLEAN</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="enforceDataTypes" defaultChecked className="rounded" />
                  <label htmlFor="enforceDataTypes" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Enforce Data Types
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'relations' && (
              <div className="space-y-2">
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Relationships involving this entity will be displayed here.
                </div>
              </div>
            )}

            {activeTab === 'rules' && (
              <div className="space-y-2">
                <div>
                  <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Business Rules
                  </label>
                  <textarea
                    rows={3}
                    className={`w-full p-1.5 text-xs rounded border ${
                      isDark
                        ? 'bg-zinc-800 border-zinc-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter business rules..."
                  />
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="generateDDL" defaultChecked className="rounded" />
                  <label htmlFor="generateDDL" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Generate DDL
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="includeComments" className="rounded" />
                  <label htmlFor="includeComments" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Include Comments
                  </label>
                </div>
              </div>
            )}
            {activeTab === 'general' && (
              <div className="space-y-2">
                <div>
                  <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Entity Name
                  </label>
                  <input
                    type="text"
                    defaultValue={currentEntity?.name || ''}
                    className={`w-full p-1.5 text-xs rounded border ${
                      isDark
                        ? 'bg-zinc-800 border-zinc-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Definition
                  </label>
                  <textarea
                    rows={2}
                    className={`w-full p-1.5 text-xs rounded border ${isDark ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    placeholder="Entity definition..."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="abstract" className="rounded" />
                  <label htmlFor="abstract" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Abstract Entity
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'display' && (
              <div className="space-y-2">
                <div>
                  <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Display Color
                  </label>
                  <input
                    type="color"
                    defaultValue="#3b82f6"
                    className={`w-full h-8 rounded border ${
                      isDark ? 'border-zinc-600' : 'border-gray-300'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="showName" defaultChecked className="rounded" />
                  <label htmlFor="showName" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Show Entity Name
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="showAttrs" defaultChecked className="rounded" />
                  <label htmlFor="showAttrs" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Show Attributes
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'keys' && (
              <div className="space-y-2">
                <div>
                  <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Primary Key
                  </label>
                  <select className={`w-full p-1.5 text-xs rounded border ${
                    isDark
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}>
                    <option>Auto-generate</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="allowNulls" className="rounded" />
                  <label htmlFor="allowNulls" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Allow NULL Values
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-2">
                <div>
                  <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Default Data Type
                  </label>
                  <select className={`w-full p-1.5 text-xs rounded border ${
                    isDark
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}>
                    <option>VARCHAR</option>
                    <option>INTEGER</option>
                    <option>DECIMAL</option>
                    <option>DATE</option>
                    <option>BOOLEAN</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="enforceDataTypes" defaultChecked className="rounded" />
                  <label htmlFor="enforceDataTypes" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Enforce Data Types
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'relations' && (
              <div className="space-y-2">
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Relationships involving this entity will be displayed here.
                </div>
              </div>
            )}

            {activeTab === 'rules' && (
              <div className="space-y-2">
                <div>
                  <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Business Rules
                  </label>
                  <textarea
                    rows={3}
                    className={`w-full p-1.5 text-xs rounded border ${
                      isDark
                        ? 'bg-zinc-800 border-zinc-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter business rules..."
                  />
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="generateDDL" defaultChecked className="rounded" />
                  <label htmlFor="generateDDL" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Generate DDL
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="includeComments" className="rounded" />
                  <label htmlFor="includeComments" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Include Comments
                  </label>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      );
    }

    if (selectedRelationship) {
      // Relationship Properties
      const currentRelationship = relationships?.find(r => r.id === selectedRelationship);
      const sourceEntity = entities?.find(e => e.id === currentRelationship?.sourceEntityId);
      const targetEntity = entities?.find(e => e.id === currentRelationship?.targetEntityId);

      return (
        <div>
          <div className={`p-2 border-b ${isDark ? 'border-zinc-700' : 'border-gray-200'}`}>
            <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Relationship Properties
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {sourceEntity?.name} → {targetEntity?.name}
            </p>
          </div>

          <div className="p-3 space-y-3">
            <div>
              <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Relationship Type
              </label>
              <select
                defaultValue={currentRelationship?.type}
                className={`w-full p-1.5 text-xs rounded border ${
                  isDark
                    ? 'bg-zinc-800 border-zinc-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}>
                <option value="identifying">Identifying</option>
                <option value="non-identifying">Non-Identifying</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Cardinality
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  defaultValue={currentRelationship?.sourceCardinality}
                  className={`p-1.5 text-xs rounded border ${
                    isDark
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}>
                  <option value="1">One</option>
                  <option value="M">Many</option>
                </select>
                <select
                  defaultValue={currentRelationship?.targetCardinality}
                  className={`p-1.5 text-xs rounded border ${
                    isDark
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}>
                  <option value="1">One</option>
                  <option value="M">Many</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Foreign Key Name
              </label>
              <input
                type="text"
                defaultValue={currentRelationship?.name || ''}
                className={`w-full p-1.5 text-xs rounded border ${
                  isDark
                    ? 'bg-zinc-800 border-zinc-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="FK_relationship_name"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="enforceRI" defaultChecked className="rounded" />
              <label htmlFor="enforceRI" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Enforce Referential Integrity
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="cascadeDelete" className="rounded" />
              <label htmlFor="cascadeDelete" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Cascade on Delete
              </label>
            </div>
          </div>
        </div>
      );
    }

    // Model Properties (default when nothing selected)
    return (
      <div>
        <div className={`p-2 border-b ${isDark ? 'border-zinc-700' : 'border-gray-200'}`}>
          <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Model Properties
          </h3>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            E-Commerce Model
          </p>
        </div>

        <div className="p-3 space-y-3">
          <div>
            <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Model Name
            </label>
            <input
              type="text"
              defaultValue="E-Commerce Model"
              className={`w-full p-1.5 text-xs rounded border ${
                isDark
                  ? 'bg-zinc-800 border-zinc-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Description
            </label>
            <textarea
              rows={3}
              className={`w-full p-1.5 text-xs rounded border ${
                isDark
                  ? 'bg-zinc-800 border-zinc-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Model description..."
            />
          </div>

          <div>
            <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Database Type
            </label>
            <select className={`w-full p-1.5 text-xs rounded border ${
              isDark
                ? 'bg-zinc-800 border-zinc-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}>
              <option>SQL Server</option>
              <option>MySQL</option>
              <option>PostgreSQL</option>
              <option>Oracle</option>
              <option>SQLite</option>
            </select>
          </div>

          <div>
            <label className={`block text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Version
            </label>
            <input
              type="text"
              defaultValue="1.0"
              className={`w-full p-1.5 text-xs rounded border ${
                isDark
                  ? 'bg-zinc-800 border-zinc-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="autoSave" defaultChecked className="rounded" />
              <label htmlFor="autoSave" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Auto-save changes
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="generatePK" defaultChecked className="rounded" />
              <label htmlFor="generatePK" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Auto-generate primary keys
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="enforceNaming" className="rounded" />
              <label htmlFor="enforceNaming" className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Enforce naming conventions
              </label>
            </div>
          </div>

          <div className={`pt-2 border-t ${isDark ? 'border-zinc-700' : 'border-gray-300'}`}>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
              <div>Entities: {entities?.filter(e => e.type === 'entity').length || 0}</div>
              <div>Relationships: {relationships?.length || 0}</div>
              <div>Last Modified: {new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-64 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-l flex flex-col`}>
      <div className={`flex items-center justify-between p-2 border-b ${isDark ? 'border-zinc-800' : 'border-gray-200'}`}>
        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Properties</span>
        {onClose && (
          <button
            onClick={onClose}
            className={`p-1 rounded hover:bg-gray-100 ${isDark ? 'hover:bg-zinc-800 text-gray-400' : 'text-gray-500'}`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

// Canvas Entity Interface
interface CanvasEntity {
  id: string;
  type: 'entity' | 'annotation';
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  attributes?: Array<{ name: string; type: string; isPrimaryKey?: boolean; isForeignKey?: boolean; isRequired?: boolean; }>;
  text?: string; // For annotations
  category?: 'standard' | 'lookup' | 'view' | 'junction'; // Entity categories for color coding
}

interface Relationship {
  id: string;
  type: 'identifying' | 'non-identifying';
  sourceEntityId: string;
  targetEntityId: string;
  sourceCardinality: '1' | 'M';
  targetCardinality: '1' | 'M';
  name?: string;
}

// Main Diagram Component
const Diagram: React.FC<DiagramProps> = ({ isDark, toggleTheme }) => {

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showTreePanel, setShowTreePanel] = useState(true);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);
  const [entities, setEntities] = useState<CanvasEntity[]>([
    {
      id: 'sample-customer',
      type: 'entity',
      name: 'Customer',
      x: 100,
      y: 100,
      width: 220,
      height: 180,
      attributes: [
        { name: 'customer_id', type: 'INT', isPrimaryKey: true, isRequired: true },
        { name: 'first_name', type: 'VARCHAR(50)', isRequired: true },
        { name: 'last_name', type: 'VARCHAR(50)', isRequired: true },
        { name: 'email', type: 'VARCHAR(100)', isRequired: true },
        { name: 'phone', type: 'VARCHAR(20)' },
        { name: 'created_at', type: 'TIMESTAMP', isRequired: true },
      ]
    },
    {
      id: 'sample-country',
      type: 'entity',
      name: 'Country',
      x: 400,
      y: 100,
      width: 200,
      height: 120,
      attributes: [
        { name: 'country_id', type: 'INT', isPrimaryKey: true, isRequired: true },
        { name: 'country_name', type: 'VARCHAR(100)', isRequired: true },
        { name: 'country_code', type: 'CHAR(3)', isRequired: true },
        { name: 'is_active', type: 'BOOLEAN', isRequired: true },
      ]
    },
    {
      id: 'sample-order-summary',
      type: 'entity',
      name: 'OrderSummaryView',
      x: 700,
      y: 100,
      width: 240,
      height: 140,
      attributes: [
        { name: 'order_id', type: 'INT', isRequired: true },
        { name: 'customer_name', type: 'VARCHAR(100)', isRequired: true },
        { name: 'order_date', type: 'DATE', isRequired: true },
        { name: 'total_amount', type: 'DECIMAL(10,2)', isRequired: true },
        { name: 'order_status', type: 'VARCHAR(20)', isRequired: true },
      ]
    },
    {
      id: 'sample-customer-orders',
      type: 'entity',
      name: 'CustomerOrders',
      x: 400,
      y: 300,
      width: 200,
      height: 120,
      attributes: [
        { name: 'customer_id', type: 'INT', isPrimaryKey: true, isForeignKey: true, isRequired: true },
        { name: 'order_id', type: 'INT', isPrimaryKey: true, isForeignKey: true, isRequired: true },
        { name: 'order_date', type: 'TIMESTAMP', isRequired: true },
        { name: 'relationship_type', type: 'VARCHAR(20)' },
      ]
    }
  ]);
  const [relationships, setRelationships] = useState<Relationship[]>([
    {
      id: 'rel-customer-orders',
      type: 'identifying',
      sourceEntityId: 'sample-customer',
      targetEntityId: 'sample-customer-orders',
      sourceCardinality: '1',
      targetCardinality: 'M',
      name: 'customer_places_orders'
    }
  ]);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [selectedRelationship, setSelectedRelationship] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDrawingMode, setIsDrawingMode] = useState<'entity' | 'annotation' | 'identifying' | 'non-identifying' | null>(null);

  // Relationship creation state
  const [relationshipSourceId, setRelationshipSourceId] = useState<string | null>(null);
  const [relationshipType, setRelationshipType] = useState<'identifying' | 'non-identifying' | null>(null);

  // Entity Management Functions
  const handleAddEntity = () => {
    const newEntity: CanvasEntity = {
      id: `entity-${Date.now()}`,
      type: 'entity',
      name: 'NewEntity',
      x: 300,
      y: 300,
      width: 200,
      height: 100,
      attributes: [
        { name: 'id', type: 'INT', isPrimaryKey: true, isRequired: true }
      ]
    };

    setEntities(prev => [...prev, newEntity]);
    setSelectedEntity(newEntity.id);
  };

  const handleRemoveEntity = (entityId: string) => {
    setEntities(prev => prev.filter(e => e.id !== entityId));
    setRelationships(prev => prev.filter(r =>
      r.sourceEntityId !== entityId && r.targetEntityId !== entityId
    ));
    if (selectedEntity === entityId) {
      setSelectedEntity(null);
    }
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const toggleTreePanel = () => {
    setShowTreePanel(!showTreePanel);
  };

  const togglePropertiesPanel = () => {
    setShowPropertiesPanel(!showPropertiesPanel);
  };

  // Handle tool selection
  const handleToolSelection = (mode: 'entity' | 'annotation' | 'identifying' | 'non-identifying' | null) => {
    console.log('🔧 Tool selected from floating toolbar:', mode);
    setIsDrawingMode(mode);

    // Set relationship type for relationship tools
    if (mode === 'identifying' || mode === 'non-identifying') {
      setRelationshipType(mode);
      setRelationshipSourceId(null); // Reset relationship creation
    } else {
      setRelationshipType(null);
      setRelationshipSourceId(null);
    }
  };

  // Handle canvas click to add entities
  const handleCanvasClick = (e: React.MouseEvent<SVGElement>) => {
    // Only handle canvas clicks, not clicks on entities
    if (e.target !== e.currentTarget) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDrawingMode === 'entity') {
      const newEntity: CanvasEntity = {
        id: `entity-${Date.now()}`,
        type: 'entity',
        name: `Entity${entities.length + 1}`,
        x: x - 100,
        y: y - 60,
        width: 220,
        height: 140,
        attributes: [
          { name: 'id', type: 'INT', isPrimaryKey: true, isRequired: true },
          { name: 'name', type: 'VARCHAR(255)', isRequired: true },
          { name: 'email', type: 'VARCHAR(100)' },
          { name: 'created_at', type: 'TIMESTAMP', isRequired: true },
        ]
      };
      setEntities([...entities, newEntity]);
      setIsDrawingMode(null);
    } else if (isDrawingMode === 'annotation') {
      const newAnnotation: CanvasEntity = {
        id: `annotation-${Date.now()}`,
        type: 'annotation',
        name: 'Note',
        x: x - 75,
        y: y - 25,
        width: 150,
        height: 50,
        text: 'Add your note here...'
      };
      setEntities([...entities, newAnnotation]);
      setIsDrawingMode(null);
    } else {
      // Clear selection when clicking empty canvas
      setSelectedEntity(null);
    }
  };

  // Handle entity click for relationship creation or selection
  const handleEntityClick = (entityId: string) => {
    console.log('🎯 Entity clicked:', entityId, 'Drawing mode:', isDrawingMode);

    if (isDrawingMode === 'identifying' || isDrawingMode === 'non-identifying') {
      if (!relationshipSourceId) {
        // First click: select source entity
        setRelationshipSourceId(entityId);
        console.log('📌 Relationship source selected:', entityId);
      } else if (relationshipSourceId !== entityId) {
        // Second click: create relationship with target entity
        createRelationship(relationshipSourceId, entityId);
      }
    } else {
      // Normal selection
      setSelectedEntity(entityId);
    }
  };

  // Create a relationship between two entities
  const createRelationship = (sourceId: string, targetId: string) => {
    if (!relationshipType) return;

    const newRelationship: Relationship = {
      id: `relationship-${Date.now()}`,
      type: relationshipType,
      sourceEntityId: sourceId,
      targetEntityId: targetId,
      sourceCardinality: '1',
      targetCardinality: 'M'
    };

    setRelationships([...relationships, newRelationship]);
    console.log('🔗 Relationship created:', newRelationship);

    // Reset relationship creation state
    setRelationshipSourceId(null);
    setIsDrawingMode(null);
    setRelationshipType(null);
  };

  // Handle entity drag start
  const handleEntityMouseDown = (e: React.MouseEvent, entityId: string) => {
    e.stopPropagation();

    // If in relationship mode, handle entity click instead of drag
    if (isDrawingMode === 'identifying' || isDrawingMode === 'non-identifying') {
      handleEntityClick(entityId);
      return;
    }

    const entity = entities.find(e => e.id === entityId);
    if (!entity) return;

    setSelectedEntity(entityId);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - entity.x,
      y: e.clientY - entity.y
    });
  };

  // Handle entity drag
  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    if (isDragging && selectedEntity) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      setEntities(entities.map(entity =>
        entity.id === selectedEntity
          ? { ...entity, x: newX, y: newY }
          : entity
      ));
    }
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  // Handle entity delete
  const deleteEntity = (entityId: string) => {
    setEntities(entities.filter(e => e.id !== entityId));
    if (selectedEntity === entityId) {
      setSelectedEntity(null);
    }
  };


  // Render Entity Component
  const EntityComponent = ({ entity }: { entity: CanvasEntity }) => {
    const isSelected = selectedEntity === entity.id;
    const isRelationshipSource = relationshipSourceId === entity.id;
    const [isHovered, setIsHovered] = useState(false);

    const headerHeight = 40;
    const attributeRowHeight = 24;

    // Separate PK and non-PK attributes
    const pkAttributes = entity.attributes?.filter(attr => attr.isPrimaryKey) || [];
    const nonPkAttributes = entity.attributes?.filter(attr => !attr.isPrimaryKey) || [];
    const hasPrimaryKeys = pkAttributes.length > 0;

    return (
      <g
        className="cursor-move"
        onMouseDown={(e) => handleEntityMouseDown(e as any, entity.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleEntityClick(entity.id)}
      >
        {/* Entity Shadow */}
        <rect
          x={entity.x + 2}
          y={entity.y + 2}
          width={entity.width}
          height={entity.height}
          rx={6}
          className="fill-black fill-opacity-10"
        />

        {/* Entity Main Box */}
        <rect
          x={entity.x}
          y={entity.y}
          width={entity.width}
          height={entity.height}
          rx={6}
          className={`transition-all duration-200 ${
            isSelected
              ? isDark
                ? 'fill-zinc-800 stroke-indigo-400'
                : 'fill-white stroke-indigo-500'
              : isRelationshipSource
              ? isDark
                ? 'fill-zinc-800 stroke-green-400'
                : 'fill-white stroke-green-500'
              : isDark
              ? 'fill-zinc-800 stroke-zinc-700 hover:stroke-zinc-600'
              : 'fill-white stroke-gray-300 hover:stroke-gray-400'
          }`}
          strokeWidth={isSelected || isRelationshipSource ? "2" : "1"}
        />

        {/* Entity Header Background */}
        <rect
          x={entity.x}
          y={entity.y}
          width={entity.width}
          height={headerHeight}
          rx={6}
          className={`${
            isDark ? 'fill-zinc-700' : 'fill-indigo-50'
          }`}
        />

        {/* Header bottom border */}
        <line
          x1={entity.x}
          y1={entity.y + headerHeight}
          x2={entity.x + entity.width}
          y2={entity.y + headerHeight}
          className={`${isDark ? 'stroke-zinc-600' : 'stroke-gray-300'}`}
          strokeWidth={1}
        />

        {/* Entity Name */}
        <text
          x={entity.x + entity.width / 2}
          y={entity.y + 25}
          textAnchor="middle"
          className={`text-sm font-bold ${isDark ? 'fill-white' : 'fill-gray-900'}`}
          style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px' }}
        >
          {entity.name}
        </text>

        {/* Primary Key Attributes Section */}
        {pkAttributes.map((attr, index) => {
          const yPos = entity.y + headerHeight + 8 + index * attributeRowHeight;
          const isEvenRow = index % 2 === 0;

          return (
            <g key={`pk-${index}`}>
              {/* Alternating row background */}
              <rect
                x={entity.x + 1}
                y={yPos - 4}
                width={entity.width - 2}
                height={attributeRowHeight}
                fill={isEvenRow
                  ? 'transparent'
                  : isDark ? '#27272a' : '#fafafa'}
                className="opacity-50"
              />

              {/* Primary Key Icon - small key symbol */}
              <path
                d={`M ${entity.x + 10} ${yPos + 8}
                    l 0 -2
                    a 3 3 0 1 1 6 0
                    l 0 2
                    l -1 0
                    l 0 4
                    l -1 0
                    l 0 -2
                    l -1 0
                    l 0 2
                    l -1 0
                    l 0 -4
                    z`}
                fill="#fbbf24"
                strokeWidth={0.5}
                stroke="#f59e0b"
              />

              {/* Attribute name */}
              <text
                x={entity.x + 24}
                y={yPos + 12}
                className={`text-xs font-semibold ${isDark ? 'fill-gray-100' : 'fill-gray-900'}`}
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px' }}
              >
                {attr.name}
              </text>

              {/* Data type */}
              <text
                x={entity.x + entity.width - 8}
                y={yPos + 12}
                textAnchor="end"
                className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}
                style={{ fontFamily: 'JetBrains Mono, Consolas, monospace', fontSize: '10px' }}
              >
                {attr.type}
              </text>
            </g>
          );
        })}

        {/* Separator line between PK and non-PK */}
        {hasPrimaryKeys && nonPkAttributes.length > 0 && (
          <line
            x1={entity.x + 5}
            y1={entity.y + headerHeight + 8 + pkAttributes.length * attributeRowHeight}
            x2={entity.x + entity.width - 5}
            y2={entity.y + headerHeight + 8 + pkAttributes.length * attributeRowHeight}
            className={`${isDark ? 'stroke-zinc-600' : 'stroke-gray-300'}`}
            strokeWidth={1}
            strokeDasharray="2,2"
          />
        )}

        {/* Non-Primary Key Attributes Section */}
        {nonPkAttributes.map((attr, index) => {
          const pkSectionHeight = hasPrimaryKeys ? (pkAttributes.length * attributeRowHeight + 8) : 0;
          const yPos = entity.y + headerHeight + 8 + pkSectionHeight + index * attributeRowHeight;
          const isEvenRow = index % 2 === 0;

          return (
            <g key={`non-pk-${index}`}>
              {/* Alternating row background */}
              <rect
                x={entity.x + 1}
                y={yPos - 4}
                width={entity.width - 2}
                height={attributeRowHeight}
                fill={isEvenRow
                  ? 'transparent'
                  : isDark ? '#27272a' : '#fafafa'}
                className="opacity-50"
              />

              {/* Foreign Key Icon */}
              {attr.isForeignKey && (
                <g>
                  {/* Link icon for foreign key */}
                  <path
                    d={`M ${entity.x + 10} ${yPos + 10}
                        a 2 2 0 0 1 2 -2
                        l 2 0
                        a 2 2 0 0 1 0 4
                        l -2 0
                        a 2 2 0 0 1 -2 -2
                        m 3 -1
                        l 2 0
                        a 2 2 0 0 1 0 4
                        l -2 0`}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth={1.2}
                  />
                </g>
              )}

              {/* Required indicator */}
              {attr.isRequired && !attr.isForeignKey && (
                <circle
                  cx={entity.x + 12}
                  cy={yPos + 10}
                  r={2}
                  fill="#ef4444"
                />
              )}

              {/* Attribute name */}
              <text
                x={entity.x + (attr.isForeignKey || attr.isRequired ? 24 : 12)}
                y={yPos + 12}
                className={`text-xs ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px' }}
              >
                {attr.name}
              </text>

              {/* Data type */}
              <text
                x={entity.x + entity.width - 8}
                y={yPos + 12}
                textAnchor="end"
                className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}
                style={{ fontFamily: 'JetBrains Mono, Consolas, monospace', fontSize: '10px' }}
              >
                {attr.type}
              </text>
            </g>
          );
        })}

        {/* Connection Points (visible on hover) */}
        {isHovered && (
          <g className="opacity-60">
            {/* Top connection point */}
            <circle
              cx={entity.x + entity.width / 2}
              cy={entity.y}
              r={3}
              className={`${isDark ? 'fill-zinc-400' : 'fill-gray-500'} cursor-crosshair`}
            />
            {/* Bottom connection point */}
            <circle
              cx={entity.x + entity.width / 2}
              cy={entity.y + entity.height}
              r={3}
              className={`${isDark ? 'fill-zinc-400' : 'fill-gray-500'} cursor-crosshair`}
            />
            {/* Left connection point */}
            <circle
              cx={entity.x}
              cy={entity.y + entity.height / 2}
              r={3}
              className={`${isDark ? 'fill-zinc-400' : 'fill-gray-500'} cursor-crosshair`}
            />
            {/* Right connection point */}
            <circle
              cx={entity.x + entity.width}
              cy={entity.y + entity.height / 2}
              r={3}
              className={`${isDark ? 'fill-zinc-400' : 'fill-gray-500'} cursor-crosshair`}
            />
          </g>
        )}

        {/* Delete Button (when selected) */}
        {isSelected && (
          <g>
            <circle
              cx={entity.x + entity.width - 12}
              cy={entity.y + 12}
              r={8}
              className="fill-red-500 hover:fill-red-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                deleteEntity(entity.id);
              }}
            />
            <text
              x={entity.x + entity.width - 12}
              y={entity.y + 16}
              textAnchor="middle"
              className="fill-white text-xs cursor-pointer pointer-events-none font-bold"
            >
              ×
            </text>
          </g>
        )}
      </g>
    );
  };

  // Render Relationship Component
  const RelationshipComponent = ({ relationship }: { relationship: Relationship }) => {
    const sourceEntity = entities.find(e => e.id === relationship.sourceEntityId);
    const targetEntity = entities.find(e => e.id === relationship.targetEntityId);

    if (!sourceEntity || !targetEntity) return null;

    // Calculate connection points (center of entities)
    const sourceX = sourceEntity.x + sourceEntity.width / 2;
    const sourceY = sourceEntity.y + sourceEntity.height / 2;
    const targetX = targetEntity.x + targetEntity.width / 2;
    const targetY = targetEntity.y + targetEntity.height / 2;

    // Line style based on relationship type
    const strokeDasharray = relationship.type === 'identifying' ? 'none' : '5,5';
    const strokeWidth = relationship.type === 'identifying' ? 2 : 2;

    return (
      <g key={relationship.id}>
        {/* Relationship Line */}
        <line
          x1={sourceX}
          y1={sourceY}
          x2={targetX}
          y2={targetY}
          stroke={isDark ? '#6366F1' : '#4F46E5'}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          markerEnd="url(#arrowhead)"
        />

        {/* Cardinality Labels */}
        <text
          x={sourceX + (targetX - sourceX) * 0.2}
          y={sourceY + (targetY - sourceY) * 0.2 - 5}
          fill={isDark ? '#9CA3AF' : '#6B7280'}
          fontSize="12"
          textAnchor="middle"
        >
          {relationship.sourceCardinality}
        </text>

        <text
          x={sourceX + (targetX - sourceX) * 0.8}
          y={sourceY + (targetY - sourceY) * 0.8 - 5}
          fill={isDark ? '#9CA3AF' : '#6B7280'}
          fontSize="12"
          textAnchor="middle"
        >
          {relationship.targetCardinality}
        </text>

        {/* Relationship Name (if exists) */}
        {relationship.name && (
          <text
            x={sourceX + (targetX - sourceX) * 0.5}
            y={sourceY + (targetY - sourceY) * 0.5 - 8}
            fill={isDark ? '#D1D5DB' : '#374151'}
            fontSize="11"
            textAnchor="middle"
            className="font-medium"
          >
            {relationship.name}
          </text>
        )}
      </g>
    );
  };

  // Render Annotation Component
  const AnnotationComponent = ({ entity }: { entity: CanvasEntity }) => {
    const isSelected = selectedEntity === entity.id;
    return (
      <g
        className="cursor-move"
        onMouseDown={(e) => handleEntityMouseDown(e as any, entity.id)}
      >
        {/* Annotation Box */}
        <rect
          x={entity.x}
          y={entity.y}
          width={entity.width}
          height={entity.height}
          rx={4}
          className={`transition-all duration-200 ${
            isSelected
              ? isDark
                ? 'fill-amber-800 stroke-amber-400 stroke-2'
                : 'fill-amber-50 stroke-amber-500 stroke-2'
              : isDark
              ? 'fill-amber-900 stroke-amber-600 stroke-1 hover:stroke-amber-500'
              : 'fill-amber-50 stroke-amber-300 stroke-1 hover:stroke-amber-400'
          }`}
          filter="drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))"
        />

        {/* Annotation Text */}
        <text
          x={entity.x + entity.width / 2}
          y={entity.y + entity.height / 2 + 4}
          textAnchor="middle"
          className={`text-xs ${isDark ? 'fill-amber-200' : 'fill-amber-800'}`}
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          {entity.text}
        </text>

        {/* Delete Button (when selected) */}
        {isSelected && (
          <circle
            cx={entity.x + entity.width - 8}
            cy={entity.y + 8}
            r={6}
            className="fill-red-500 hover:fill-red-600 cursor-pointer"
            onClick={() => deleteEntity(entity.id)}
          />
        )}
        {isSelected && (
          <text
            x={entity.x + entity.width - 8}
            y={entity.y + 11}
            textAnchor="middle"
            className="fill-white text-xs cursor-pointer pointer-events-none"
          >
            ×
          </text>
        )}
      </g>
    );
  };

  if (isFullScreen) {
    // Full Screen Mode - Only Canvas
    return (
      <div className={`h-screen w-screen relative ${isDark ? 'bg-zinc-950' : 'bg-gray-100'}`}>
        {/* Canvas Grid Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(circle, #2a2a2a 1px, transparent 1px)'
              : 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Floating Toolbars */}
        <ObjectToolbar
          isDark={isDark}
          isDrawingMode={isDrawingMode}
          onSelectTool={handleToolSelection}
        />
        <ViewControlsToolbar isDark={isDark} onToggleFullScreen={handleToggleFullScreen} isFullScreen={isFullScreen} />
        <MiniMap isDark={isDark} />

        {/* Tool Status Indicator */}
        {(isDrawingMode || relationshipSourceId) && (
          <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm border ${
            isDark ? 'bg-indigo-800/90 border-indigo-700 text-indigo-200' : 'bg-indigo-100/90 border-indigo-300 text-indigo-800'
          }`}>
            <div className="text-sm font-medium">
              {isDrawingMode === 'entity' && '🔗 Click canvas to add Entity'}
              {isDrawingMode === 'annotation' && '📝 Click canvas to add Note'}
              {isDrawingMode === 'identifying' && !relationshipSourceId && '🔗 Click source entity, then target entity'}
              {isDrawingMode === 'non-identifying' && !relationshipSourceId && '💠 Click source entity, then target entity'}
              {relationshipSourceId && '👆 Now click target entity to complete relationship'}
            </div>
          </div>
        )}

        {/* Exit Full Screen Button (Top Right) */}
        <button
          onClick={handleToggleFullScreen}
          className={`absolute top-6 right-6 p-2.5 rounded-xl shadow-lg backdrop-blur-sm border flex items-center gap-2 ${
            isDark ? 'bg-zinc-800/90 border-zinc-700 text-gray-300 hover:bg-zinc-700' : 'bg-white/90 border-gray-200 text-gray-600 hover:bg-gray-100'
          } hover:scale-105 transition-all duration-200`}
        >
          <Minimize2 className="w-4 h-4" />
          <span className="text-xs font-medium">Exit Full Screen</span>
        </button>

        {/* Canvas Content */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            cursor: isDrawingMode ? 'crosshair' : 'default'
          }}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill={isDark ? '#6b7280' : '#9ca3af'}
              />
            </marker>
          </defs>

          {/* Render Relationships (behind entities) */}
          {relationships.map((relationship) => (
            <RelationshipComponent key={relationship.id} relationship={relationship} />
          ))}

          {/* Render Entities and Annotations */}
          {entities.map((entity) => {
            if (entity.type === 'entity') {
              return <EntityComponent key={entity.id} entity={entity} />;
            } else if (entity.type === 'annotation') {
              return <AnnotationComponent key={entity.id} entity={entity} />;
            }
            return null;
          })}
        </svg>
      </div>
    );
  }

  // Regular Mode - With Panels
  return (
    <div className={`h-full flex ${isDark ? 'bg-zinc-950' : 'bg-white'}`}>

      {/* Model Tree Panel */}
      {showTreePanel && (
        <ModelTree
          isDark={isDark}
          onClose={toggleTreePanel}
          entities={entities}
          relationships={relationships}
          selectedEntity={selectedEntity}
          selectedRelationship={selectedRelationship}
          onSelectEntity={setSelectedEntity}
          onSelectRelationship={setSelectedRelationship}
        />
      )}

      {/* Main Canvas Area */}
      <div className="flex-1 relative">
        {/* Canvas Grid Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(circle, #2a2a2a 1px, transparent 1px)'
              : 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Panel Toggle Buttons */}
        <div className={`absolute top-6 left-6 z-10 flex gap-2`}>
          {!showTreePanel && (
            <button
              onClick={toggleTreePanel}
              className={`p-2.5 rounded-xl shadow-lg backdrop-blur-sm border ${
                isDark ? 'bg-zinc-800/90 border-zinc-700 text-gray-300 hover:bg-zinc-700' : 'bg-white/90 border-gray-200 text-gray-600 hover:bg-gray-100'
              } hover:scale-105 transition-all duration-200`}
              title="Show Tree Panel"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className={`absolute top-6 right-6 z-10 flex gap-2`}>
          {!showPropertiesPanel && (
            <button
              onClick={togglePropertiesPanel}
              className={`p-2.5 rounded-xl shadow-lg backdrop-blur-sm border ${
                isDark ? 'bg-zinc-800/90 border-zinc-700 text-gray-300 hover:bg-zinc-700' : 'bg-white/90 border-gray-200 text-gray-600 hover:bg-gray-100'
              } hover:scale-105 transition-all duration-200`}
              title="Show Properties Panel"
            >
              <PanelRightOpen className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tool Status Indicator */}
        {(isDrawingMode || relationshipSourceId) && (
          <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm border ${
            isDark ? 'bg-indigo-800/90 border-indigo-700 text-indigo-200' : 'bg-indigo-100/90 border-indigo-300 text-indigo-800'
          }`}>
            <div className="text-sm font-medium">
              {isDrawingMode === 'entity' && '🔗 Click canvas to add Entity'}
              {isDrawingMode === 'annotation' && '📝 Click canvas to add Note'}
              {isDrawingMode === 'identifying' && !relationshipSourceId && '🔗 Click source entity, then target entity'}
              {isDrawingMode === 'non-identifying' && !relationshipSourceId && '💠 Click source entity, then target entity'}
              {relationshipSourceId && '👆 Now click target entity to complete relationship'}
            </div>
          </div>
        )}


        {/* Floating Toolbars - Fixed position relative to canvas */}
        <ObjectToolbar
          isDark={isDark}
          isDrawingMode={isDrawingMode}
          onSelectTool={handleToolSelection}
        />
        <ViewControlsToolbar isDark={isDark} onToggleFullScreen={handleToggleFullScreen} isFullScreen={isFullScreen} />
        <MiniMap isDark={isDark} />

        {/* Canvas Content */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            cursor: isDrawingMode ? 'crosshair' : 'default'
          }}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill={isDark ? '#6b7280' : '#9ca3af'}
              />
            </marker>
          </defs>

          {/* Render Relationships (behind entities) */}
          {relationships.map((relationship) => (
            <RelationshipComponent key={relationship.id} relationship={relationship} />
          ))}

          {/* Render Entities and Annotations */}
          {entities.map((entity) => {
            if (entity.type === 'entity') {
              return <EntityComponent key={entity.id} entity={entity} />;
            } else if (entity.type === 'annotation') {
              return <AnnotationComponent key={entity.id} entity={entity} />;
            }
            return null;
          })}
        </svg>
      </div>

      {/* Properties Panel */}
      {showPropertiesPanel && (
        <PropertiesPanel
          isDark={isDark}
          onClose={togglePropertiesPanel}
          selectedEntity={selectedEntity}
          selectedRelationship={selectedRelationship}
          entities={entities}
          relationships={relationships}
          onUpdateEntity={(entityId, updates) => {
            setEntities(entities.map(e => e.id === entityId ? {...e, ...updates} : e));
          }}
          onUpdateRelationship={(relationshipId, updates) => {
            setRelationships(relationships.map(r => r.id === relationshipId ? {...r, ...updates} : r));
          }}
          onAddEntity={handleAddEntity}
          onRemoveEntity={handleRemoveEntity}
        />
      )}
    </div>
  );
};

export default Diagram;