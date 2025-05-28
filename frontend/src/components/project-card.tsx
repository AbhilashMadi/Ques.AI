import { SitePaths } from '@/configs/site-config';
import ServerKeys from '@/resources/server-keys';
import { type Project } from '@/types/response.types';
import { formatLocalDate } from '@/utils/time-utils';
import { memo, useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';

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
  const initials = useMemo(() => getInitials(project[ServerKeys.TITLE]), [project]);
  const avatarBg = useMemo(() => avatarColors[Math.floor(Math.random() * avatarColors.length)],
    [project[ServerKeys.PROJECT_ID]]);

  return (<Link to={{
    pathname: SitePaths.PROJECT_DASHBOARD(project[ServerKeys.PROJECT_ID]),
    search: `title=${project[ServerKeys.TITLE]}`,
  }}>
    <li
      className="border border-card-foreground/30 p-2 rounded bg-card flex gap-4 items-center max-w-md hover:shadow-md hover:scale-105 transition-all h-full"
      role="button">
      <div className={`w-16 self-stretch rounded-[calc(0.75rem-0.5rem)] line-clamp-1 flex items-center justify-center text-2xl font-semibold text-white ${avatarBg}`}>
        {initials}
      </div>
      <div className="flex flex-col justify-between gap-y-3">
        <div>
          <h5 className="text-sm font-semibold text-purple-700 line-clamp-1">{project[ServerKeys.TITLE]}</h5>
          <p className="text-xs text-foreground">{project[ServerKeys.PODCASTS_COUNT]} Podcasts</p>
          <p className="mt-2 text-xs line-clamp-2">{project[ServerKeys.DESCRIPTION]}</p>
        </div>
        <div className="text-xs text-gray-400">
          <p>Created On:{' '}{formatLocalDate(project[ServerKeys?.CREATED_AT])}</p>
          <p>Last Updated On:{' '}{formatLocalDate(project[ServerKeys?.UPDATED_AT])}</p>
        </div>
      </div>
    </li>
  </Link>
  );
});

export default ProjectCard;
