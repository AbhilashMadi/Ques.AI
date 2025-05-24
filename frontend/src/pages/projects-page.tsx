import { useCallback, useState } from 'react';
import { Modal } from '@custom';
import EmptyProjects from '@components/empty-projects';
import ProjectsPageHeader from '@components/projects-page-header';
import CreateProjectForm from '@components/create-project-form';
import { useForm } from '@hooks/use-form';
import { createProjectValidationSchema, type CreateProjectInput } from '@schemas/create-project-schema';
import ServerKeys from '@resources/server-keys';

export default function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const form = useForm<CreateProjectInput>({
    initialValues: {
      [ServerKeys.PROJECT_NAME]: ''
    },
    validationSchema: createProjectValidationSchema,
    onSubmit: (values) => { console.log(values) }
  })

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  return (<>
    <Modal
      title="Create Project"
      isOpen={modalOpen}
      onClose={toggleModal}
      children={<CreateProjectForm form={form} />} />
    <main className="min-h-screen flex flex-col">
      <ProjectsPageHeader />
      <EmptyProjects onPress={toggleModal} />
    </main>
  </>
  );
}
