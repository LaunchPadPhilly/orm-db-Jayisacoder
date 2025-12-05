"use client";

import { useEffect, useState } from "react";
import ProjectForm from "./components/ProjectForm";

export default function Projects() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to load projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setLoadError("Could not load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleSubmit = async (formData) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || "Failed to create project");
    }

    const created = await res.json();
    setProjects((prev) => [created, ...prev]);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <h1 className="text-5xl font-bold">My Projects</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Project
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Project 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <p className="text-white font-bold text-xl">Portfolio Website</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Portfolio Website</h3>
              <p className="text-gray-600 mb-4">
                A responsive personal portfolio built with Next.js and Tailwind CSS to showcase my projects and skills.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">Next.js</span>
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded">React</span>
                <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded">Tailwind</span>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
              <p className="text-white font-bold text-xl">Task Manager</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Task Manager App</h3>
              <p className="text-gray-600 mb-4">
                A productivity app that helps users organize and track their daily tasks with an intuitive interface.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded">JavaScript</span>
                <span className="text-sm bg-pink-100 text-pink-800 px-3 py-1 rounded">HTML</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">CSS</span>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
              <p className="text-white font-bold text-xl">Weather Dashboard</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Weather Dashboard</h3>
              <p className="text-gray-600 mb-4">
                A weather app that displays current conditions and forecasts using real-time API data.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded">React</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">API</span>
                <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded">CSS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">🚀 More Projects Coming Soon!</h3>
          <p className="text-blue-800">
            I&apos;m constantly working on new projects and learning new technologies. 
            Check back regularly to see what I&apos;m building next!
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-4">Latest Projects</h2>
          {loading && <p>Loading projects...</p>}
          {loadError && <p className="text-red-600 mb-4">{loadError}</p>}
          {!loading && !loadError && projects.length === 0 && (
            <p className="text-gray-600">No projects yet. Add one to get started.</p>
          )}
          {!loading && projects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4 shadow-sm bg-white">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-3">{project.description}</p>
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3 text-sm text-blue-700">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ProjectForm
        isOpen={isFormOpen}
        onSubmit={handleSubmit}
        onCancel={() => setIsFormOpen(false)}
      />
    </div>
  )
}
