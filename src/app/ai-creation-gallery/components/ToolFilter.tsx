'use client';

import { useState } from 'react';

interface ToolFilterProps {
  onFilterChange: (tool: string) => void;
  className?: string;
}

export default function ToolFilter({ onFilterChange, className = '' }: ToolFilterProps) {
  const [selectedTool, setSelectedTool] = useState<string>('all');

  const tools = [
    { id: 'all', name: 'All Tools' },
    { id: 'dalle', name: 'DALL-E' },
    { id: 'midjourney', name: 'Midjourney' },
    { id: 'stable-diffusion', name: 'Stable Diffusion' },
    { id: 'other', name: 'Other' },
  ];

  const handleToolChange = (tool: string) => {
    setSelectedTool(tool);
    onFilterChange(tool);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="text-sm font-medium text-gray-700">Filter by Tool</h3>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleToolChange(tool.id)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedTool === tool.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tool.name}
          </button>
        ))}
      </div>
    </div>
  );
}