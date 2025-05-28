import { useCallback, useState } from 'react';
import { Modal } from '@custom';
import { useForm } from '@hooks/use-form';
import { createProjectValidationSchema, type CreateProjectInput } from '@schemas/project-schemas';
import { useCreateProjectMutation, useGetAllProjectsQuery } from '@/redux/projects/projects-api';

import EmptyProjects from '@components/empty-projects';
import ProjectsPageHeader from '@components/projects-page-header';
import CreateProjectForm from '@components/create-project-form';
import ServerKeys from '@resources/server-keys';
import ProjectsList from '@components/projects-list';
import Loader from '@components/common/loader';
import { toast } from 'react-hot-toast';

export default function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { isFetching, data } = useGetAllProjectsQuery();
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const createProjectForm = useForm<CreateProjectInput>({
    initialValues: {
      [ServerKeys.TITLE]: '',
      [ServerKeys.DESCRIPTION]: '',
    },
    validationSchema: createProjectValidationSchema,
    onSubmit: async (values) => {
      try {
        const { message } = await createProject(values).unwrap();
        toast.success(message);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.data?.message || error.message || 'Something went wrong');
      } finally {
        setModalOpen(false);
      }
    }
  })

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  if (isFetching) {
    return <Loader />
  }

  return (<>
    <Modal
      title="Create Project"
      isOpen={modalOpen}
      onClose={toggleModal}
      children={<CreateProjectForm isCreating={isLoading} form={createProjectForm} />}
      className="max-w-lg" />
    <main className="min-h-screen flex flex-col">
      <ProjectsPageHeader />
      {
        data?.data.list.length === 0
          ? <EmptyProjects onCreateProjectPress={toggleModal} />
          : <ProjectsList onCreateProjectPress={toggleModal} projects={data?.data?.list ?? []} />
      }
    </main>
  </>
  );
}
