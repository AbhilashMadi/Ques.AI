import { type FC } from 'react';
import { emptyProjectImg } from '@assets';
import { SiteConfig } from '@configs/site-config';
import { Button } from '@custom';
import { PlusIcon } from '@icons';

const EmptyProjects: FC = () => {
  return (<section className="flex-center h-[calc(100dvh-8rem)]">
    <div className="max-w-3xl text-center space-y-10">
      <h1 className="text-h1 text-primary">Create a New Project</h1>
      <img
        src={emptyProjectImg}
        alt={SiteConfig.appName}
        loading="lazy"
        decoding="async"
        height={400}
        width={400}
        className="h-56 w-full" />
      <p className="text-muted">
        Ques.AI is an intuitive web application that streamlines podcast project management, upload workflows, and AI-powered transcription editing. Designed with usability in mind, it empowers podcasters to efficiently manage their content pipeline from creation to transcription.
      </p>
      <Button className="bg-foreground"><PlusIcon height={18} />{' '}Create New Project</Button>
    </div>
  </section>)
}

export default EmptyProjects;