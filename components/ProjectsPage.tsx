import React from 'react';
import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../constants';
import type { WorkProject } from '../types';

const ProjectCard: React.FC<{ project: WorkProject }> = ({ project }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div className="relative rounded-xl overflow-hidden shadow-2xl group">
      <img src={project.imageUrl} alt={project.name} className={`w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 ${project.isConfidential ? 'blur-lg' : ''}`} />
      {project.isConfidential && (
        <div className="absolute inset-0 bg-blue-900 bg-opacity-40 flex flex-col items-center justify-center p-8 text-center">
          <h3 className="font-heading text-white text-2xl font-bold">Confidential project.</h3>
        </div>
      )}
    </div>
    <div className="lg:px-4">
      <h3 className="font-heading text-3xl font-bold text-gray-800">{project.name}</h3>
      <p className="mt-4 text-gray-600 leading-relaxed">{project.longDescription || project.description}</p>
      <div className="mt-6">
        <h4 className="font-heading font-semibold text-gray-700 tracking-wider">DEVELOPMENT TOOLS</h4>
        <ul className="mt-3 space-y-2">
          {project.tools.map(tool =>
            <li key={tool} className="flex items-center">
              <span className="text-brand-blue mr-3">&#10003;</span>
              <span>{tool}</span>
            </li>
          )}
        </ul>
      </div>
      {!project.isConfidential && (
        <Link to={project.projectLink} className="mt-8 inline-block text-brand-blue font-semibold hover:underline group">
          View project <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>
      )}
    </div>
  </div>
);

const ProjectsPage: React.FC = () => {
  return (
    <div className="pt-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900">Projects</h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Discover my Freelance React Developer Portfolio, showcasing projects for companies worldwide where I've built high-performance web applications, interactive marketing websites, and dynamic data visualizations. Specializing in React, Next.js, and Node.js, I focus on creating seamless user experiences and robust, scalable solutions.
          </p>
        </div>
        
        <div className="space-y-24 sm:space-y-32">
          {ALL_PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;