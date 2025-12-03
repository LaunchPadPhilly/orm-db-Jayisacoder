'use client';

import { useState } from 'react';

const COMMON_TECHNOLOGIES = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java',
  'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'GraphQL', 'REST API',
  'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Photoshop'
];

export default function TechnologyInput({ technologies = [], onChange, error }) {
  const [inputValue, setInputValue] = useState('');

  const addTechnology = (tech) => {
    const trimmedTech = tech.trim();
    
    // Prevent empty or duplicate technologies
    if (!trimmedTech) return;
    if (technologies.includes(trimmedTech)) {
      alert('This technology is already added!');
      return;
    }

    onChange([...technologies, trimmedTech]);
    setInputValue(''); // Clear input after adding
  };

  const removeTechnology = (techToRemove) => {
    onChange(technologies.filter(tech => tech !== techToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology(inputValue);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Technologies *
      </label>

      {/* Input and Add Button */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a technology..."
          className={`flex-1 p-2 border rounded ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <button
          type="button"
          onClick={() => addTechnology(inputValue)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}

      {/* Selected Technologies (Tags) */}
      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="text-blue-600 hover:text-blue-800 font-bold"
                aria-label={`Remove ${tech}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Quick-Add Buttons */}
      <div className="mb-2">
        <p className="text-sm text-gray-600 mb-2">Quick add:</p>
        <div className="flex flex-wrap gap-2">
          {COMMON_TECHNOLOGIES.filter(tech => !technologies.includes(tech))
            .slice(0, 8)
            .map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => addTechnology(tech)}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
              >
                + {tech}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}