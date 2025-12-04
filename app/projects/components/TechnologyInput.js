// TODO: Students will implement this component
// This is an advanced component building exercise

// Component Requirements:
// 1. Create a component that accepts { technologies, onChange, error } props
// 2. Allow users to type in a technology name and add it to the list
// 3. Provide quick-add buttons for common technologies
// 4. Display selected technologies as removable tags
// 5. Prevent duplicate technologies
// 6. Support both keyboard (Enter) and button (Add) interactions
// 7. Handle error states with visual feedback

// Learning Objectives:
// - Advanced React state management
// - Array manipulation patterns
// - User input handling
// - Conditional styling
// - Accessibility considerations
// - Component prop patterns

// Suggested Technologies for Quick-Add:
// ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
//  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java',
//  'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'GraphQL', 'REST API',
//  'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Photoshop']

// Implementation Hints:
// - Use 'use client' directive
// - Manage local input state with useState
// - Use filter() to remove technologies
// - Use includes() to check for duplicates
// - Handle keyPress event for Enter key
// - Style error states with conditional classes

"use client";
import { useState } from "react";

const QUICK_TECHS = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express",
  "HTML", "CSS", "Tailwind CSS", "Bootstrap", "Python", "Java",
  "PostgreSQL", "MongoDB", "MySQL", "Prisma", "GraphQL", "REST API",
  "Git", "Docker", "AWS", "Vercel", "Figma", "Photoshop"
];

export default function TechnologyInput({ value = [], onChange, error }) {
  const [input, setInput] = useState("");
  const [localError, setLocalError] = useState("");

  const addTech = (tech) => {
    const techTrimmed = tech.trim();
    if (!techTrimmed) return;
    if (value.includes(techTrimmed)) {
      setLocalError("Technology already added.");
      return;
    }
    setLocalError("");
    onChange([...value, techTrimmed]);
    setInput("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setLocalError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech(input);
    }
  };

  const handleAddClick = () => {
    addTech(input);
  };

  const handleRemove = (tech) => {
    onChange(value.filter((t) => t !== tech));
    setLocalError("");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tech) => (
          <span key={tech} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
            {tech}
            <button
              type="button"
              aria-label={`Remove ${tech}`}
              className="ml-1 text-blue-500 hover:text-red-500"
              onClick={() => handleRemove(tech)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add technology..."
          className={`border rounded px-3 py-2 flex-1 ${error || localError ? "border-red-500" : "border-gray-300"}`}
          aria-label="Technology name"
        />
        <button
          type="button"
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          onClick={handleAddClick}
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {QUICK_TECHS.map((tech) => (
          <button
            type="button"
            key={tech}
            className={`px-2 py-1 rounded border text-sm ${value.includes(tech) ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed" : "bg-gray-100 hover:bg-blue-200 border-gray-300 text-blue-700"}`}
            onClick={() => !value.includes(tech) && addTech(tech)}
            disabled={value.includes(tech)}
          >
            {tech}
          </button>
        ))}
      </div>
      {(error || localError) && (
        <div className="text-red-500 text-sm mt-1">{error || localError}</div>
      )}
    </div>
  );
}
// ...existing code...