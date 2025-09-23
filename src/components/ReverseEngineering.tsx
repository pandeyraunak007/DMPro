'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Database,
  RefreshCw,
  Search,
  Settings,
  Eye,
  EyeOff,
  Edit3,
  Key,
  Link,
  Upload,
  AlertCircle,
  Info,
  Save,
  GitBranch,
  Clock,
  Table,
  Columns,
  Zap,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Plus,
  Filter,
  X,
  Check,
  FileText,
  Folder
} from 'lucide-react';

// Types
interface DatabaseSource {
  id: string;
  name: string;
  icon: string;
  status: 'supported' | 'coming-soon';
  description: string;
}

interface DatabaseObject {
  id: string;
  name: string;
  type: 'table' | 'view' | 'index' | 'procedure';
  schema: string;
  columnCount: number;
  selected: boolean;
}

interface EntityAttribute {
  id: string;
  name: string;
  dataType: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  isNullable: boolean;
  domain?: string;
}

interface Entity {
  id: string;
  name: string;
  originalName: string;
  attributes: EntityAttribute[];
  expanded: boolean;
}

interface Relationship {
  id: string;
  fromEntity: string;
  toEntity: string;
  fromColumn: string;
  toColumn: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  selected: boolean;
}

interface RecentModel {
  id: string;
  name: string;
  path: string;
  lastModified: string;
  entityCount: number;
}

// Accordion Section Component
interface AccordionSectionProps {
  title: string;
  subtitle?: string;
  isExpanded: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
  completed?: boolean;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  subtitle,
  isExpanded,
  onToggle,
  icon,
  badge,
  children,
  completed = false
}) => {
  return (
    <div className="border border-zinc-800 rounded-lg bg-zinc-900/50">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {completed && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            {icon}
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium text-zinc-100">{title}</h3>
            {subtitle && <p className="text-xs text-zinc-400">{subtitle}</p>}
          </div>
          {badge && (
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        )}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-zinc-800/50">
          {children}
        </div>
      )}
    </div>
  );
};

// Main Component
const ReverseEngineering: React.FC = () => {
  // Accordion state - ERwin sequential flow
  const [expandedSections, setExpandedSections] = useState({
    source: true,
    schemas: false,
    tables: false,
    views: false,
    options: false,
    glossary: false,
    system: false,
    summary: false,
    actions: false
  });

  // Navigation state
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Source selection - ERwin style
  const [sourceType, setSourceType] = useState<'database' | 'script'>('database');
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [scriptFile, setScriptFile] = useState<string>('');
  const [connectionConfig, setConnectionConfig] = useState({
    server: '',
    database: '',
    username: '',
    password: '',
    connectionString: ''
  });
  const [connectionTested, setConnectionTested] = useState(false);

  // Objects selection
  const [selectedObjects, setSelectedObjects] = useState<DatabaseObject[]>([]);
  const [objectsFilter, setObjectsFilter] = useState('');
  const [objectTypeFilter, setObjectTypeFilter] = useState('all');
  const [schemaFilter, setSchemaFilter] = useState('all');
  const [showSystemObjects, setShowSystemObjects] = useState(false);
  const [showEmptyTables, setShowEmptyTables] = useState(true);

  // Entities and attributes - ERwin style
  const [entities, setEntities] = useState<Entity[]>([]);
  const [optionSet, setOptionSet] = useState('default');
  const [samplingMethod, setSamplingMethod] = useState('sequence');
  const [documentPercent, setDocumentPercent] = useState(10);
  const [enableDeepSearch, setEnableDeepSearch] = useState(true);
  const [modelingOptions, setModelingOptions] = useState({
    generateLogicalModel: true,
    generatePhysicalModel: true,
    includeIndexes: true,
    includeConstraints: true,
    includeTriggers: false,
    includeStoredProcedures: false,
    preserveCase: true,
    generateDomains: false
  });

  // Relationships
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [relationshipFilter, setRelationshipFilter] = useState('all');

  // Import rules
  const [importRules, setImportRules] = useState({
    includeIndexes: true,
    includeTriggers: false,
    includeStoredProcs: false,
    schemaPrefix: '',
    schemaSuffix: '',
    detectCircularRefs: true
  });

  // Recent models
  const [recentModels] = useState<RecentModel[]>([
    {
      id: '1',
      name: 'E-Commerce Schema',
      path: '/models/ecommerce-v2.1',
      lastModified: '2 hours ago',
      entityCount: 23
    },
    {
      id: '2',
      name: 'CRM Database',
      path: '/models/crm-production',
      lastModified: '1 day ago',
      entityCount: 41
    }
  ]);

  const sources: DatabaseSource[] = [
    {
      id: 'fabric',
      name: 'MS Fabric',
      icon: '🟦',
      status: 'supported',
      description: 'Microsoft Fabric Data Warehouse'
    },
    {
      id: 'mysql',
      name: 'MySQL',
      icon: '🐬',
      status: 'coming-soon',
      description: 'MySQL Database Server'
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      icon: '🐘',
      status: 'coming-soon',
      description: 'PostgreSQL Database Server'
    },
    {
      id: 'sqlserver',
      name: 'SQL Server',
      icon: '🟪',
      status: 'coming-soon',
      description: 'Microsoft SQL Server'
    },
    {
      id: 'oracle',
      name: 'Oracle',
      icon: '🅾️',
      status: 'coming-soon',
      description: 'Oracle Database'
    },
    {
      id: 'sqlite',
      name: 'SQLite',
      icon: '🗄️',
      status: 'coming-soon',
      description: 'SQLite Database File'
    }
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const goToNextStep = (currentSection: keyof typeof expandedSections, nextSection: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [currentSection]: false,
      [nextSection]: true
    }));
  };

  const testConnection = async () => {
    setConnectionTested(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <RefreshCw className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-zinc-100">Reverse Engineering</h1>
          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">New</span>
        </div>
        <p className="text-zinc-400">
          Import existing database schemas and automatically generate visual data models with full entity relationships.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Accordion Panel */}
        <div className="xl:col-span-2 space-y-4">
          {/* 1. Source Selection */}
          <AccordionSection
            title="Source Selection"
            subtitle="Choose between database connection or script file import"
            icon={<Database className="w-4 h-4 text-blue-500" />}
            isExpanded={expandedSections.source}
            onToggle={() => toggleSection('source')}
            completed={Boolean((sourceType === 'database' && selectedSource && connectionTested) || (sourceType === 'script' && scriptFile))}
          >
            <div className="space-y-6 mt-4">
              {/* Source Type Selection - ERwin Style */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-zinc-100">Choose Source Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSourceType('database')}
                    className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                      sourceType === 'database'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-zinc-700 bg-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <Database className="w-5 h-5 text-blue-500" />
                    <div className="text-left">
                      <h4 className="text-sm font-medium text-zinc-100">Database</h4>
                      <p className="text-xs text-zinc-400">Connect to live database</p>
                    </div>
                    {sourceType === 'database' && <Check className="w-4 h-4 text-blue-500 ml-auto" />}
                  </button>

                  <button
                    onClick={() => setSourceType('script')}
                    className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                      sourceType === 'script'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-zinc-700 bg-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <FileText className="w-5 h-5 text-emerald-500" />
                    <div className="text-left">
                      <h4 className="text-sm font-medium text-zinc-100">Script File</h4>
                      <p className="text-xs text-zinc-400">Import from DDL script</p>
                    </div>
                    {sourceType === 'script' && <Check className="w-4 h-4 text-blue-500 ml-auto" />}
                  </button>
                </div>
              </div>

              {/* Database Source Selection */}
              {sourceType === 'database' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-100">Database Source</label>
                    <div className="relative">
                      <button
                        onClick={() => setShowSourceDropdown(!showSourceDropdown)}
                        className="w-full flex items-center justify-between bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-left hover:border-zinc-600 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {selectedSource ? (
                            <>
                              <span className="text-lg">{sources.find(s => s.id === selectedSource)?.icon}</span>
                              <div>
                                <span className="text-sm font-medium text-zinc-100">
                                  {sources.find(s => s.id === selectedSource)?.name}
                                </span>
                                <p className="text-xs text-zinc-400">
                                  {sources.find(s => s.id === selectedSource)?.description}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <Database className="w-5 h-5 text-zinc-400" />
                              <span className="text-sm text-zinc-400">Select database source...</span>
                            </>
                          )}
                        </div>
                        {showSourceDropdown ? (
                          <ChevronUp className="w-4 h-4 text-zinc-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-400" />
                        )}
                      </button>

                      {showSourceDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                          {sources.map((source) => (
                            <button
                              key={source.id}
                              onClick={() => {
                                if (source.status === 'supported') {
                                  setSelectedSource(source.id);
                                  setShowSourceDropdown(false);
                                }
                              }}
                              disabled={source.status === 'coming-soon'}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                                source.status === 'supported'
                                  ? 'hover:bg-zinc-800'
                                  : 'opacity-50 cursor-not-allowed'
                              } ${
                                selectedSource === source.id ? 'bg-blue-500/10 border-l-2 border-l-blue-500' : ''
                              }`}
                            >
                              <span className="text-lg">{source.icon}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-zinc-100">{source.name}</span>
                                  {source.status === 'coming-soon' && (
                                    <span className="text-xs bg-amber-600 text-white px-1.5 py-0.5 rounded">
                                      Soon
                                    </span>
                                  )}
                                  {selectedSource === source.id && (
                                    <Check className="w-4 h-4 text-blue-500" />
                                  )}
                                </div>
                                <p className="text-xs text-zinc-400">{source.description}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Script File Selection */}
              {sourceType === 'script' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-100">Script File</label>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          className="flex-1 bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
                          placeholder="Select DDL script file..."
                          value={scriptFile}
                          onChange={(e) => setScriptFile(e.target.value)}
                        />
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors">
                          <Folder className="w-4 h-4" />
                          Browse
                        </button>
                      </div>

                      <div className="p-3 bg-emerald-900/20 border border-emerald-700 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-medium text-emerald-100">Supported File Types</span>
                        </div>
                        <ul className="text-xs text-emerald-200 space-y-1">
                          <li>• SQL Script Files (.sql, .ddl)</li>
                          <li>• CREATE TABLE statements</li>
                          <li>• ALTER TABLE statements</li>
                          <li>• CREATE VIEW statements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSource === 'fabric' && (
                <div className="space-y-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-zinc-100 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Connection Configuration
                    </h4>
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">MS Fabric</span>
                  </div>

                  {/* Connection Method */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-zinc-100">Connection Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg text-sm">
                        <Key className="w-4 h-4" />
                        Authentication
                      </button>
                      <button className="flex items-center justify-center gap-2 p-3 border border-zinc-600 text-zinc-300 rounded-lg text-sm hover:bg-zinc-700">
                        <Database className="w-4 h-4" />
                        Connection String
                      </button>
                    </div>
                  </div>

                  {/* Connection Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-2">Server/Endpoint *</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
                        placeholder="your-fabric-workspace.datawarehouse.fabric.microsoft.com"
                        value={connectionConfig.server}
                        onChange={(e) => setConnectionConfig(prev => ({ ...prev, server: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-2">Database/Warehouse *</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
                        placeholder="your-warehouse-name"
                        value={connectionConfig.database}
                        onChange={(e) => setConnectionConfig(prev => ({ ...prev, database: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-2">Username</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
                        placeholder="your-username@domain.com"
                        value={connectionConfig.username}
                        onChange={(e) => setConnectionConfig(prev => ({ ...prev, username: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-2">Password</label>
                      <input
                        type="password"
                        className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
                        placeholder="••••••••••••"
                        value={connectionConfig.password}
                        onChange={(e) => setConnectionConfig(prev => ({ ...prev, password: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Advanced Options */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-zinc-600 bg-zinc-700 text-blue-600" />
                      <label className="text-sm text-zinc-100">Use Windows Authentication</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-zinc-600 bg-zinc-700 text-blue-600" />
                      <label className="text-sm text-zinc-100">Trust Server Certificate</label>
                    </div>
                  </div>

                  {/* Connection Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-2">
                      <button
                        onClick={testConnection}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                      >
                        Test Connection
                      </button>
                      <button className="border border-zinc-600 text-zinc-300 hover:bg-zinc-700 px-4 py-2 rounded text-sm transition-colors">
                        Advanced...
                      </button>
                    </div>
                    {connectionTested && (
                      <div className="flex items-center gap-2 text-emerald-500 text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        Connection verified
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Next Button */}
              {((sourceType === 'database' && selectedSource && connectionTested) || (sourceType === 'script' && scriptFile)) && (
                <div className="flex justify-end pt-4 border-t border-zinc-700">
                  <button
                    onClick={() => goToNextStep('source', 'schemas')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Next: Select Objects
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </AccordionSection>

          {/* 2. Object Selection */}
          <AccordionSection
            title="Schema & Object Selection"
            subtitle="Select database schemas and objects to reverse engineer"
            icon={<Table className="w-4 h-4 text-emerald-500" />}
            isExpanded={expandedSections.schemas}
            onToggle={() => toggleSection('schemas')}
            badge={selectedObjects.length > 0 ? selectedObjects.length.toString() : undefined}
          >
            <div className="space-y-4 mt-4">
              {/* Schema and Object Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">Schema Filter</label>
                  <select
                    className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
                    value={schemaFilter}
                    onChange={(e) => setSchemaFilter(e.target.value)}
                  >
                    <option value="all">All Schemas</option>
                    <option value="dbo">dbo</option>
                    <option value="sales">sales</option>
                    <option value="inventory">inventory</option>
                    <option value="hr">hr</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">Object Type</label>
                  <select
                    className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
                    value={objectTypeFilter}
                    onChange={(e) => setObjectTypeFilter(e.target.value)}
                  >
                    <option value="all">All Objects</option>
                    <option value="table">Tables Only</option>
                    <option value="view">Views Only</option>
                    <option value="procedure">Stored Procedures</option>
                    <option value="function">Functions</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">Search Objects</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
                    <input
                      type="text"
                      className="w-full bg-zinc-900 border border-zinc-600 rounded pl-10 pr-4 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
                      placeholder="Search by name..."
                      value={objectsFilter}
                      onChange={(e) => setObjectsFilter(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Filter Options */}
              <div className="flex items-center gap-6 p-3 bg-zinc-800/50 rounded-lg">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showSystemObjects}
                    onChange={(e) => setShowSystemObjects(e.target.checked)}
                    className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                  />
                  <span className="text-sm text-zinc-100">Include system objects</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showEmptyTables}
                    onChange={(e) => setShowEmptyTables(e.target.checked)}
                    className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                  />
                  <span className="text-sm text-zinc-100">Include empty tables</span>
                </label>
              </div>

              {/* Object Selection Panel */}
              <div className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-zinc-700">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-zinc-100">Available Objects</span>
                    <span className="text-xs text-zinc-400 bg-zinc-700 px-2 py-1 rounded">47 objects found</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1">Select All</button>
                    <button className="text-xs text-zinc-400 hover:text-zinc-300 px-2 py-1">Select None</button>
                    <button className="text-xs text-emerald-400 hover:text-emerald-300 px-2 py-1">Select Tables Only</button>
                  </div>
                </div>

                {/* Object List */}
                <div className="max-h-72 overflow-y-auto">
                  {[
                    { name: 'Users', type: 'table', schema: 'dbo', columnCount: 12, rowCount: '2.3K', size: '1.2MB', hasIndexes: true, hasFKs: true },
                    { name: 'Products', type: 'table', schema: 'dbo', columnCount: 18, rowCount: '850', size: '2.8MB', hasIndexes: true, hasFKs: false },
                    { name: 'Orders', type: 'table', schema: 'sales', columnCount: 15, rowCount: '15.2K', size: '5.4MB', hasIndexes: true, hasFKs: true },
                    { name: 'OrderItems', type: 'table', schema: 'sales', columnCount: 6, rowCount: '48.7K', size: '8.1MB', hasIndexes: true, hasFKs: true },
                    { name: 'Categories', type: 'table', schema: 'dbo', columnCount: 4, rowCount: '25', size: '16KB', hasIndexes: false, hasFKs: false },
                    { name: 'v_UserOrders', type: 'view', schema: 'sales', columnCount: 20, rowCount: '15.2K', size: 'N/A', hasIndexes: false, hasFKs: false },
                    { name: 'v_ProductSummary', type: 'view', schema: 'dbo', columnCount: 8, rowCount: '850', size: 'N/A', hasIndexes: false, hasFKs: false },
                    { name: 'sp_GetUserOrders', type: 'procedure', schema: 'sales', columnCount: 0, rowCount: 'N/A', size: 'N/A', hasIndexes: false, hasFKs: false }
                  ].map((obj, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 hover:bg-zinc-700/50 border-b border-zinc-800 last:border-b-0">
                      <input
                        type="checkbox"
                        className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                        defaultChecked={obj.type === 'table'}
                      />
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        {obj.type === 'table' && <Table className="w-4 h-4 text-blue-500 flex-shrink-0" />}
                        {obj.type === 'view' && <Eye className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                        {obj.type === 'procedure' && <Settings className="w-4 h-4 text-purple-500 flex-shrink-0" />}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-zinc-100 truncate">{obj.name}</span>
                            {obj.hasIndexes && <span className="text-xs bg-blue-600 text-white px-1 py-0.5 rounded">IDX</span>}
                            {obj.hasFKs && <span className="text-xs bg-purple-600 text-white px-1 py-0.5 rounded">FK</span>}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <span>{obj.schema}</span>
                            <span>•</span>
                            <span>{obj.columnCount} cols</span>
                            <span>•</span>
                            <span>{obj.rowCount} rows</span>
                            <span>•</span>
                            <span>{obj.size}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selection Summary */}
              <div className="flex items-center justify-between p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-blue-100">
                    <strong>5</strong> tables selected
                  </span>
                  <span className="text-blue-200">
                    <strong>2</strong> views selected
                  </span>
                  <span className="text-blue-200">
                    <strong>55</strong> total columns
                  </span>
                </div>
                <button className="text-xs text-blue-400 hover:text-blue-300 px-3 py-1 border border-blue-600 rounded">
                  Preview Selection
                </button>
              </div>

              {/* Next Button */}
              <div className="flex justify-between pt-4 border-t border-zinc-700">
                <button
                  onClick={() => goToNextStep('schemas', 'source')}
                  className="flex items-center gap-2 border border-zinc-600 text-zinc-300 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back: Source Selection
                </button>
                <button
                  onClick={() => goToNextStep('schemas', 'options')}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Next: Configure Options
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </AccordionSection>

          {/* 3. Reverse Engineering Options */}
          <AccordionSection
            title="Reverse Engineering Options"
            subtitle="Configure option sets, sampling, and modeling preferences"
            icon={<Settings className="w-4 h-4 text-amber-500" />}
            isExpanded={expandedSections.options}
            onToggle={() => toggleSection('options')}
          >
            <div className="space-y-6 mt-4">
              {/* Option Sets - ERwin Style */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-zinc-100">Option Set</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <select
                      className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
                      value={optionSet}
                      onChange={(e) => setOptionSet(e.target.value)}
                    >
                      <option value="default">Default Options</option>
                      <option value="minimal">Minimal (Tables Only)</option>
                      <option value="complete">Complete (All Objects)</option>
                      <option value="custom">Custom Configuration</option>
                    </select>
                  </div>
                  <button className="flex items-center justify-center gap-2 border border-zinc-600 text-zinc-300 hover:bg-zinc-700 px-4 py-2 rounded text-sm transition-colors">
                    <Settings className="w-4 h-4" />
                    Customize Options
                  </button>
                </div>
              </div>

              {/* Sampling Configuration - ERwin Style */}
              <div className="space-y-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-500" />
                  <h4 className="text-sm font-medium text-zinc-100">Schema Detection & Sampling</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-2">Sampling Method</label>
                    <select
                      className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
                      value={samplingMethod}
                      onChange={(e) => setSamplingMethod(e.target.value)}
                    >
                      <option value="sequence">Sequential Sampling</option>
                      <option value="random">Random Sampling</option>
                      <option value="full">Full Table Scan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-2">Document Percentage (%)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={documentPercent}
                        onChange={(e) => setDocumentPercent(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm text-zinc-100 min-w-[3ch]">{documentPercent}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={enableDeepSearch}
                      onChange={(e) => setEnableDeepSearch(e.target.checked)}
                      className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                    />
                    <span className="text-sm text-zinc-100">Enable Deep Search Algorithm</span>
                    <span title="Uses advanced pattern recognition to detect complex relationships and data types">
                      <HelpCircle className="w-4 h-4 text-zinc-400" />
                    </span>
                  </label>
                  <p className="text-xs text-zinc-400 ml-6">
                    Analyzes data patterns, relationship structures, and naming conventions for enhanced schema detection
                  </p>
                </div>
              </div>

              {/* Modeling Options - ERwin Style */}
              <div className="space-y-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                <div className="flex items-center gap-2">
                  <Columns className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-sm font-medium text-zinc-100">Model Generation Options</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="text-xs font-medium text-zinc-300 uppercase tracking-wide">Model Types</h5>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={modelingOptions.generateLogicalModel}
                          onChange={(e) => setModelingOptions(prev => ({ ...prev, generateLogicalModel: e.target.checked }))}
                          className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                        />
                        <span className="text-sm text-zinc-100">Generate Logical Model</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={modelingOptions.generatePhysicalModel}
                          onChange={(e) => setModelingOptions(prev => ({ ...prev, generatePhysicalModel: e.target.checked }))}
                          className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                        />
                        <span className="text-sm text-zinc-100">Generate Physical Model</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-medium text-zinc-300 uppercase tracking-wide">Object Inclusion</h5>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={modelingOptions.includeIndexes}
                          onChange={(e) => setModelingOptions(prev => ({ ...prev, includeIndexes: e.target.checked }))}
                          className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                        />
                        <span className="text-sm text-zinc-100">Include Indexes</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={modelingOptions.includeConstraints}
                          onChange={(e) => setModelingOptions(prev => ({ ...prev, includeConstraints: e.target.checked }))}
                          className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                        />
                        <span className="text-sm text-zinc-100">Include Constraints</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={modelingOptions.includeTriggers}
                          onChange={(e) => setModelingOptions(prev => ({ ...prev, includeTriggers: e.target.checked }))}
                          className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                        />
                        <span className="text-sm text-zinc-100">Include Triggers</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={modelingOptions.includeStoredProcedures}
                          onChange={(e) => setModelingOptions(prev => ({ ...prev, includeStoredProcedures: e.target.checked }))}
                          className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                        />
                        <span className="text-sm text-zinc-100">Include Stored Procedures</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-700 pt-4">
                  <h5 className="text-xs font-medium text-zinc-300 uppercase tracking-wide mb-3">Additional Options</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={modelingOptions.preserveCase}
                        onChange={(e) => setModelingOptions(prev => ({ ...prev, preserveCase: e.target.checked }))}
                        className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                      />
                      <span className="text-sm text-zinc-100">Preserve Original Case</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={modelingOptions.generateDomains}
                        onChange={(e) => setModelingOptions(prev => ({ ...prev, generateDomains: e.target.checked }))}
                        className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                      />
                      <span className="text-sm text-zinc-100">Auto-Generate Domains</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-between p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-100">Configuration ready for reverse engineering</span>
                </div>
                <div className="text-xs text-blue-200">
                  Estimated processing time: <strong>2-3 minutes</strong>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-between pt-4 border-t border-zinc-700">
                <button
                  onClick={() => goToNextStep('options', 'schemas')}
                  className="flex items-center gap-2 border border-zinc-600 text-zinc-300 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back: Object Selection
                </button>
                <button
                  onClick={() => goToNextStep('options', 'glossary')}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Next: Relationships
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </AccordionSection>

          {/* 4. Relationships */}
          <AccordionSection
            title="Relationships"
            subtitle="Configure entity relationships and foreign keys"
            icon={<Link className="w-4 h-4 text-purple-500" />}
            isExpanded={expandedSections.glossary}
            onToggle={() => toggleSection('glossary')}
            badge="5"
          >
            <div className="space-y-4 mt-4">
              <div className="flex gap-4">
                <select
                  className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100"
                  value={relationshipFilter}
                  onChange={(e) => setRelationshipFilter(e.target.value)}
                >
                  <option value="all">All Relationships</option>
                  <option value="one-to-one">One-to-One</option>
                  <option value="one-to-many">One-to-Many</option>
                  <option value="many-to-many">Many-to-Many</option>
                </select>
                <button className="text-xs text-blue-400 hover:text-blue-300 px-3 py-2">
                  Auto-detect
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { from: 'orders', to: 'users', type: 'many-to-one', column: 'user_id' },
                  { from: 'order_items', to: 'orders', type: 'many-to-one', column: 'order_id' },
                  { from: 'order_items', to: 'products', type: 'many-to-one', column: 'product_id' }
                ].map((rel, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                    />
                    <div className="flex-1 flex items-center gap-2 text-sm">
                      <span className="text-zinc-100">{rel.from}</span>
                      <span className="text-zinc-400">→</span>
                      <span className="text-zinc-100">{rel.to}</span>
                      <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                        {rel.type}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-400">{rel.column}</span>
                  </div>
                ))}
              </div>

              {/* Next Button */}
              <div className="flex justify-between pt-4 border-t border-zinc-700">
                <button
                  onClick={() => goToNextStep('glossary', 'options')}
                  className="flex items-center gap-2 border border-zinc-600 text-zinc-300 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back: Configure Options
                </button>
                <button
                  onClick={() => goToNextStep('glossary', 'system')}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Next: Import Rules
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </AccordionSection>

          {/* 5. Import Rules & System Configuration */}
          <AccordionSection
            title="Import Rules & System Configuration"
            subtitle="Configure naming conventions, permissions, and system catalog access"
            icon={<Key className="w-4 h-4 text-orange-500" />}
            isExpanded={expandedSections.system}
            onToggle={() => toggleSection('system')}
          >
            <div className="space-y-6 mt-4">
              {/* System Catalog Configuration - ERwin Style */}
              <div className="space-y-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-500" />
                  <h4 className="text-sm font-medium text-zinc-100">System Catalog Access</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={true}
                        className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                      />
                      <span className="text-sm text-zinc-100">Query system catalog</span>
                      <span title="ERwin queries system catalog instead of individual objects for better performance">
                        <HelpCircle className="w-4 h-4 text-zinc-400" />
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={true}
                        className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                      />
                      <span className="text-sm text-zinc-100">Verify read/write permissions</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={importRules.detectCircularRefs}
                        onChange={(e) => setImportRules(prev => ({ ...prev, detectCircularRefs: e.target.checked }))}
                        className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                      />
                      <span className="text-sm text-zinc-100">Detect circular references</span>
                    </label>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-amber-900/20 border border-amber-700 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium text-amber-100">Permission Requirements</span>
                      </div>
                      <ul className="text-xs text-amber-200 space-y-1">
                        <li>• SELECT on INFORMATION_SCHEMA</li>
                        <li>• READ access to system tables</li>
                        <li>• VIEW DATABASE STATE permission</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Naming Conventions - ERwin Style */}
              <div className="space-y-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-sm font-medium text-zinc-100">Naming Conventions & Transformations</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="text-xs font-medium text-zinc-300 uppercase tracking-wide">Entity Naming</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-2">Table Name Prefix</label>
                        <input
                          type="text"
                          className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
                          placeholder="e.g., tbl_, ent_"
                          value={importRules.schemaPrefix}
                          onChange={(e) => setImportRules(prev => ({ ...prev, schemaPrefix: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-2">Table Name Suffix</label>
                        <input
                          type="text"
                          className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
                          placeholder="e.g., _v1, _data"
                          value={importRules.schemaSuffix}
                          onChange={(e) => setImportRules(prev => ({ ...prev, schemaSuffix: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-2">Case Transformation</label>
                        <select className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none">
                          <option value="preserve">Preserve Original Case</option>
                          <option value="upper">Convert to UPPERCASE</option>
                          <option value="lower">Convert to lowercase</option>
                          <option value="title">Convert to Title Case</option>
                          <option value="camel">Convert to camelCase</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-xs font-medium text-zinc-300 uppercase tracking-wide">Special Characters</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-2">Replace Spaces With</label>
                        <select className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none">
                          <option value="underscore">Underscore (_)</option>
                          <option value="hyphen">Hyphen (-)</option>
                          <option value="remove">Remove Spaces</option>
                          <option value="preserve">Preserve Spaces</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-2">Special Character Handling</label>
                        <select className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none">
                          <option value="remove">Remove Special Characters</option>
                          <option value="replace">Replace with Underscore</option>
                          <option value="preserve">Preserve Special Characters</option>
                        </select>
                      </div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                        />
                        <span className="text-sm text-zinc-100">Remove numeric prefixes</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Import Options - ERwin Style */}
              <div className="space-y-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <h4 className="text-sm font-medium text-zinc-100">Advanced Import Configuration</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h5 className="text-xs font-medium text-zinc-300 uppercase tracking-wide">Object Filtering</h5>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={importRules.includeIndexes}
                          onChange={(e) => setImportRules(prev => ({ ...prev, includeIndexes: e.target.checked }))}
                          className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                        />
                        <span className="text-sm text-zinc-100">Import Indexes</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={importRules.includeTriggers}
                          onChange={(e) => setImportRules(prev => ({ ...prev, includeTriggers: e.target.checked }))}
                          className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                        />
                        <span className="text-sm text-zinc-100">Import Triggers</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={importRules.includeStoredProcs}
                          onChange={(e) => setImportRules(prev => ({ ...prev, includeStoredProcs: e.target.checked }))}
                          className="rounded border-zinc-600 bg-zinc-700 text-blue-600"
                        />
                        <span className="text-sm text-zinc-100">Import Procedures</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-medium text-zinc-300 uppercase tracking-wide">Data Types</h5>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded border-zinc-600 bg-zinc-700 text-blue-600" />
                        <span className="text-sm text-zinc-100">Map to logical types</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-zinc-600 bg-zinc-700 text-blue-600" />
                        <span className="text-sm text-zinc-100">Create custom domains</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded border-zinc-600 bg-zinc-700 text-blue-600" />
                        <span className="text-sm text-zinc-100">Preserve precision/scale</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-medium text-zinc-300 uppercase tracking-wide">Performance</h5>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded border-zinc-600 bg-zinc-700 text-blue-600" />
                        <span className="text-sm text-zinc-100">Batch processing</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-zinc-600 bg-zinc-700 text-blue-600" />
                        <span className="text-sm text-zinc-100">Enable caching</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded border-zinc-600 bg-zinc-700 text-blue-600" />
                        <span className="text-sm text-zinc-100">Progress reporting</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Scheduling - ERwin Style */}
              <div className="space-y-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <h4 className="text-sm font-medium text-zinc-100">Scheduling Options</h4>
                  </div>
                  <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded">Optional</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-2">Execution Mode</label>
                    <select className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none">
                      <option value="immediate">Execute Immediately</option>
                      <option value="scheduled">Schedule for Later</option>
                      <option value="recurring">Recurring Schedule</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-2">Priority Level</label>
                    <select className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 focus:outline-none">
                      <option value="normal">Normal Priority</option>
                      <option value="high">High Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-between pt-4 border-t border-zinc-700">
                <button
                  onClick={() => goToNextStep('system', 'glossary')}
                  className="flex items-center gap-2 border border-zinc-600 text-zinc-300 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back: Relationships
                </button>
                <button
                  onClick={() => goToNextStep('system', 'summary')}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Next: Review Summary
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </AccordionSection>

          {/* 6. Summary & Validation */}
          <AccordionSection
            title="Summary & Validation"
            subtitle="Review import configuration and validate settings"
            icon={<BarChart3 className="w-4 h-4 text-emerald-500" />}
            isExpanded={expandedSections.summary}
            onToggle={() => toggleSection('summary')}
          >
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-zinc-100">5</div>
                  <div className="text-xs text-zinc-400">Tables Selected</div>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-zinc-100">61</div>
                  <div className="text-xs text-zinc-400">Total Columns</div>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-zinc-100">5</div>
                  <div className="text-xs text-zinc-400">Relationships</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-zinc-100">All primary keys detected</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-zinc-100">Foreign key relationships mapped</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-zinc-100">2 circular references detected</span>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-amber-100">Validation Warnings</span>
                </div>
                <ul className="text-xs text-amber-200 space-y-1">
                  <li>• Table 'temp_data' has no primary key defined</li>
                  <li>• View 'v_complex_report' contains computed columns</li>
                </ul>
              </div>

              {/* Next Button */}
              <div className="flex justify-between pt-4 border-t border-zinc-700">
                <button
                  onClick={() => goToNextStep('summary', 'system')}
                  className="flex items-center gap-2 border border-zinc-600 text-zinc-300 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back: Import Rules
                </button>
                <button
                  onClick={() => goToNextStep('summary', 'actions')}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Proceed to Actions
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </AccordionSection>

          {/* 7. Actions */}
          <AccordionSection
            title="Actions"
            subtitle="Save, compare, or export your model"
            icon={<Zap className="w-4 h-4 text-yellow-500" />}
            isExpanded={expandedSections.actions}
            onToggle={() => toggleSection('actions')}
          >
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg transition-colors">
                  <Save className="w-4 h-4" />
                  Save Model
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors">
                  <GitBranch className="w-4 h-4" />
                  Compare Models
                </button>
                <button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  Open Model
                </button>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-2">Model Name</label>
                <input
                  type="text"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100"
                  placeholder="Enter model name..."
                  defaultValue={`MS Fabric Import - ${new Date().toLocaleDateString()}`}
                />
              </div>

              {/* Back Button */}
              <div className="flex justify-start pt-4 border-t border-zinc-700">
                <button
                  onClick={() => goToNextStep('actions', 'summary')}
                  className="flex items-center gap-2 border border-zinc-600 text-zinc-300 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back: Review Summary
                </button>
              </div>
            </div>
          </AccordionSection>
        </div>

        {/* Right Sidebar - Recent Models */}
        <div className="space-y-4">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-100">Recent Models</h3>
              <button className="text-xs text-blue-400 hover:text-blue-300">View All</button>
            </div>

            <div className="space-y-3">
              {recentModels.map((model) => (
                <div key={model.id} className="p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-100">{model.name}</span>
                    <span className="text-xs bg-zinc-700 px-2 py-1 rounded">{model.entityCount}</span>
                  </div>
                  <div className="text-xs text-zinc-400">{model.path}</div>
                  <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                    <Clock className="w-3 h-3" />
                    {model.lastModified}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 text-xs text-blue-400 hover:text-blue-300 py-2">
              + Create New Model
            </button>
          </div>

          {/* Help & Tips */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4">
            <h3 className="text-sm font-semibold text-zinc-100 mb-3">Tips & Best Practices</h3>
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex gap-2">
                <Info className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Test your connection before proceeding to ensure data accuracy.</span>
              </div>
              <div className="flex gap-2">
                <Info className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Select only the objects you need to keep your model focused.</span>
              </div>
              <div className="flex gap-2">
                <Info className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Review entity names and relationships before finalizing.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReverseEngineering;