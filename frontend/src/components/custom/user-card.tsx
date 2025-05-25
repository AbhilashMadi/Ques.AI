import '@css/avatar-sprit.css';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

interface IUserCardProps {
  collapse: boolean
}

const UserCard: FC<IUserCardProps> = ({ collapse }) => {
  return (<Link to={'#'} className="p-2 rounded">
    <section className="flex gap-2">
      <div className="avatar-sm avatar-1 rounded" />
      {!collapse && <div>
        <p>Username</p>
        <p className="text-muted">user@email.com</p>
      </div>}
    </section>
  </Link>);
}

export default UserCard;