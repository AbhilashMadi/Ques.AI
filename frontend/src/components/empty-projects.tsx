import { type FC } from 'react';
import { emptyProjectImg } from '@assets';
import { SiteConfig } from '@configs/site-config';
import { Button } from '@custom';
import { PlusCircleIcon } from '@icons';

interface IEmptyProjectsProps {
  onCreateProjectPress: () => void;
}

const EmptyProjects: FC<IEmptyProjectsProps> = ({ onCreateProjectPress }) => {
  return (
    <section className="flex items-center justify-center px-4 sm:px-8 py-8 h-[calc(100dvh-8rem)]">
      <div className="w-full max-w-3xl text-center space-y-8 sm:space-y-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary text-balance">
          Create a New Project
        </h1>

        <div className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md">
          <img
            src={emptyProjectImg}
            alt={SiteConfig.appName}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain aspect-[4/3]"
          />
        </div>

        <p className="text-muted text-sm sm:text-base text-balance">
          Ques.AI is an intuitive web application that streamlines podcast project management, upload workflows, and AI-powered transcription editing. Designed with usability in mind, it empowers podcasters to efficiently manage their content pipeline from creation to transcription.
        </p>

        <Button onClick={onCreateProjectPress} className="bg-foreground flex gap-2 mx-auto">
          <PlusCircleIcon height={18} />
          Create New Project
        </Button>
      </div>
    </section>
  );
};

export default EmptyProjects;
