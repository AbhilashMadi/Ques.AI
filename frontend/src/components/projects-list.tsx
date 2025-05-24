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
]

const ProjectsList: FC = () => {
  return (<ul className="max-w-7xl mx-auto w-full">
    <div className="flex justify-end">
      <Button className="bg-foreground">
        <PlusIcon height={18} />{' '}Create New Project
      </Button>
    </div>
    <h3 className="text-h3 text-primary my-6">Projects</h3>
    <ul className="grid grid-cols-5 gap-6">{projects.map((o) => <ProjectCard key={o.projectId} project={o} />)}</ul>
  </ul>)
}

export default ProjectsList;