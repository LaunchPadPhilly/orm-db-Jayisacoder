// Clean duplicate header/imports from previous edits
"use client";
import { useEffect, useRef, useState } from "react";

const SUGGESTED_TECHNOLOGIES = [
  "JavaScript",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Bootstrap",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Prisma",
  "Git",
  "Docker",
  "AWS",
  "Vercel",
  "Vite",
  "React Router",
  "Firebase",
];

export default function TechnologyInput({ technologies = [], onChange, error }) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const addTechnology = (tech) => {
    const trimmedTech = (tech || "").trim();
    if (!trimmedTech) return;
    if (technologies.includes(trimmedTech)) return;
    onChange && onChange([...technologies, trimmedTech]);
    setInputValue("");
  };

  const removeTechnology = (techToRemove) => {
    onChange && onChange(technologies.filter((tech) => tech !== techToRemove));
  };

  const addFromKeyEvent = (value) => {
    addTechnology(value || inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFromKeyEvent(e.target.value);
    }
  };

  // Fallback for environments where onKeyPress doesn't fire
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFromKeyEvent(e.target.value);
    }
  };

  // Ensure Enter key works even if onKeyPress is deprecated
  useEffect(() => {
    const inputEl = inputRef.current;
    if (!inputEl) return;

    const handleNativeKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addFromKeyEvent(event.target.value);
      }
    };

    inputEl.addEventListener("keypress", handleNativeKeyPress);
    return () => inputEl.removeEventListener("keypress", handleNativeKeyPress);
  }, [inputValue, technologies]);

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Technologies *</label>
      <div className="flex gap-2 mb-3">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          placeholder="Type a technology"
          className={`flex-1 p-2 border rounded ${error ? "border-red-500" : "border-gray-300"}`}
        />
        <button
          type="button"
          onClick={() => addTechnology(inputValue)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              data-testid={`selected-tech-${tech}`}
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

      <div className="mb-2">
        <p className="text-sm text-gray-600 mb-2">Quick add:</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_TECHNOLOGIES.map((tech) => {
            const disabled = technologies.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                aria-label={tech}
                data-testid={`quick-add-${tech}`}
                onClick={() => addTechnology(tech)}
                disabled={disabled}
                className={`px-3 py-1 text-sm border rounded ${
                  disabled
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                + {tech}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}