import { Project } from '../types/project';

const PROJECTS_KEY = 'projects';

const defaultProject: Project = {
  id: 'default-project',
  name: 'Sample Construction Project',
  description: 'A sample construction project for testing purposes.',
  status: 'Ongoing',
  assignedFundis: [],
  images: [],
  files: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const storage = {
  getProjects: (): Project[] => {
    const projects = localStorage.getItem(PROJECTS_KEY);
    if (!projects) {
      // Initialize with default project if no projects exist
      localStorage.setItem(PROJECTS_KEY, JSON.stringify([defaultProject]));
      return [defaultProject];
    }
    return JSON.parse(projects);
  },

  saveProject: (project: Project) => {
    const projects = storage.getProjects();
    const updatedProjects = [...projects, project];
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
  },

  updateProject: (updatedProject: Project) => {
    const projects = storage.getProjects();
    const updatedProjects = projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
  },

  deleteProject: (projectId: string) => {
    const projects = storage.getProjects();
    const updatedProjects = projects.filter(project => project.id !== projectId);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
  }
};