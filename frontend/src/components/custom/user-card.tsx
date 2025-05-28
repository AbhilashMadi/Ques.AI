import useAuth from '@hooks/use-auth';
import { SitePaths } from '@configs/site-config';
import '@css/avatar-sprit.css';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

interface IUserCardProps {
  collapse: boolean
}

const UserCard: FC<IUserCardProps> = ({ collapse }) => {
  const { user } = useAuth();

  return (<Link to={SitePaths.USER_PROFILE} className="p-2 rounded">
    <section className="flex gap-2">
      <div className="avatar-sm avatar-1 rounded" />
      {!collapse && <div>
        <p>{user?.fullName}</p>
        <p className="text-muted">{user?.email}</p>
      </div>}
    </section>
  </Link>);
}

export default UserCard;