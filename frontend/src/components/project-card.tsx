import { SitePaths } from '@/configs/site-config';
import ServerKeys from '@/resources/server-keys';
import { memo, type FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

export type Project = {
  [ServerKeys.PROJECT_ID]: string;
  [ServerKeys.PROJECT_NAME]: string;
};

interface IProjectCard {
  project: Project;
}

// Choose from 5 background colors
const avatarColors = ['bg-yellow-400', 'bg-blue-400', 'bg-green-400', 'bg-pink-400', 'bg-purple-400'];

const getInitials = (name: string) =>
  name
    .split(' ')
    .map(word => word[0]?.toUpperCase())
    .join('')
    .slice(0, 2);

const ProjectCard: FC<IProjectCard> = memo(({ project }) => {
  const initials = useMemo(() => getInitials(project[ServerKeys.PROJECT_NAME]), [project]);
  const avatarBg = useMemo(() => avatarColors[Math.floor(Math.random() * avatarColors.length)],
    [project[ServerKeys.PROJECT_ID]]);

  return (<Link to={SitePaths.PROJECT_DASHBOARD(project.projectId)}>
    <li
      className="border border-card-foreground/30 p-2 rounded bg-card flex gap-4 items-center max-w-md hover:shadow-md hover:scale-105 transition-all"
      role="button">
      <div className={`size-16 rounded-[calc(0.75rem-0.5rem)] line-clamp-1 flex items-center justify-center text-2xl font-semibold text-white ${avatarBg}`}>
        {initials}
      </div>
      <div className="flex flex-col justify-between gap-y-3">
        <div>
          <h5 className="text-sm font-semibold text-purple-700">{project[ServerKeys.PROJECT_NAME]}</h5>
          <p className="text-xs text-foreground">4 Files</p>
        </div>
        <p className="text-xs text-gray-400">Last edited a week ago</p>
      </div>
    </li>
  </Link>
  );
});

export default ProjectCard;
