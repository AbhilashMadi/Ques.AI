import EmptyProjects from '@components/empty-projects';
import ProjectsPageHeader from '@/components/projects-page-header';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <ProjectsPageHeader />
      <EmptyProjects />
    </main>
  );
}
