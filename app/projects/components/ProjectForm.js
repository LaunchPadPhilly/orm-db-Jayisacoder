// TODO: Students will implement this component
// This is a learning exercise - students should build this form component from scratch
// The tests will guide the implementation requirements

// Component Requirements:
// 1. Create a form component that accepts { onSubmit, onCancel, isOpen } props
// 2. Manage form state for: title, description, imageUrl, projectUrl, githubUrl, technologies
// 3. Implement form validation:
//    - title: required
//    - description: required
//    - technologies: required (at least one)
//    - URLs: validate format if provided
// 4. Handle form submission and loading states
// 5. Display validation errors to user
// 6. Reset form after successful submission
// 7. Only render when isOpen is true
// 8. Include TechnologyInput component for managing technologies

// Learning Objectives:
// - React state management with useState
// - Form validation patterns
// - Conditional rendering
// - Event handling
// - Error state management
// - Component composition

// Hints:
// - Use 'use client' directive for client-side functionality
// - Import TechnologyInput from './TechnologyInput'
// - Use regex for URL validation: /^https?:\/\/.+\..+/
// - Handle async form submission with try/catch
// - Use loading state to prevent double submission

"use client";
import { useState } from "react";
import TechnologyInput from "./TechnologyInput";

const urlRegex = /^https?:\/\/.+\..+/;

export default function ProjectForm({ onSubmit, onCancel, isOpen }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    projectUrl: "",
    githubUrl: "",
    technologies: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!form.technologies || form.technologies.length === 0)
      newErrors.technologies = "At least one technology is required.";
    ["imageUrl", "projectUrl", "githubUrl"].forEach((key) => {
      if (form[key] && !urlRegex.test(form[key])) {
        newErrors[key] = "Invalid URL format.";
      }
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (techs) => {
    setForm((prev) => ({ ...prev, technologies: techs }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    try {
      await onSubmit(form);
      setForm({
        title: "",
        description: "",
        imageUrl: "",
        projectUrl: "",
        githubUrl: "",
        technologies: [],
      });
      setErrors({});
    } catch (err) {
      setErrors({ submit: err.message || "Submission failed." });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({
      title: "",
      description: "",
      imageUrl: "",
      projectUrl: "",
      githubUrl: "",
      technologies: [],
    });
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2">Add New Project</h2>
      {errors.submit && <div className="text-red-500 mb-2">{errors.submit}</div>}
      <div>
        <label className="block font-semibold">Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          disabled={loading}
        />
        {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
      </div>
      <div>
        <label className="block font-semibold">Description *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          disabled={loading}
        />
        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
      </div>
      <div>
        <label className="block font-semibold">Technologies *</label>
        <TechnologyInput
          value={form.technologies}
          onChange={handleTechChange}
          disabled={loading}
        />
        {errors.technologies && <div className="text-red-500 text-sm">{errors.technologies}</div>}
      </div>
      <div>
        <label className="block font-semibold">Image URL</label>
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          disabled={loading}
        />
        {errors.imageUrl && <div className="text-red-500 text-sm">{errors.imageUrl}</div>}
      </div>
      <div>
        <label className="block font-semibold">Live Demo URL</label>
        <input
          name="projectUrl"
          value={form.projectUrl}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          disabled={loading}
        />
        {errors.projectUrl && <div className="text-red-500 text-sm">{errors.projectUrl}</div>}
      </div>
      <div>
        <label className="block font-semibold">GitHub URL</label>
        <input
          name="githubUrl"
          value={form.githubUrl}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          disabled={loading}
        />
        {errors.githubUrl && <div className="text-red-500 text-sm">{errors.githubUrl}</div>}
      </div>
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}