import { type FC } from 'react';
import { type Project } from '@components/project-card';
import ProjectCard from '@components/project-card';
import { Button } from '@custom';
import { PlusIcon } from '@icons';

const projects: Project[] = [
  {
    projectId: '1',
    projectName: 'Sample Project'
  },
  {
    projectId: '2',
    projectName: 'United Project'
  }
];

interface IProjectsListProps {
  onCreateProjectPress: () => void;
}

const ProjectsList: FC<IProjectsListProps> = ({ onCreateProjectPress }) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-0 py-8">
      {/* Header: Button & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-2xl sm:text-3xl font-semibold text-primary">Projects</h3>
        <Button className="bg-foreground self-start sm:self-auto" onClick={onCreateProjectPress}>
          <PlusIcon height={18} />
          Create New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.projectId} project={project} />
        ))}
      </ul>
    </section>
  );
};

export default ProjectsList;
