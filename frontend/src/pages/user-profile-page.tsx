import { Button, Input } from '@components/custom';
import useAuth from '@hooks/use-auth';
import { MoveLeftIcon } from '@icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);
  const { user } = useAuth();

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-2 text-sm sm:text-base cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <MoveLeftIcon height={18} />
          <span>Account Settings</span>
        </button>
      </div>

      <section className="p-4 bg-card rounded h-[calc(100dvh-12rem)] overflow-y-auto">
        {/* Selected Avatar Preview */}
        <div
          className={`avatar avatar-${selectedAvatar} rounded mx-auto my-4 w-24 h-24`}
          aria-label={`Selected avatar ${selectedAvatar}`}
        />

        {/* Avatar Grid */}
        <div className="flex gap-4 flex-wrap justify-center my-6">
          {Array.from({ length: 35 }).map((_, i) => {
            const avatarNumber = i + 1; // Start from 1 instead of 0
            return (
              <div
                key={avatarNumber}
                className={`avatar-sm rounded cursor-pointer avatar-${avatarNumber} ${selectedAvatar === avatarNumber
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'border border-border'
                  }`}
                aria-label={`Select avatar ${avatarNumber}`}
                onClick={() => setSelectedAvatar(avatarNumber)}
              />
            );
          })}
        </div>

        {/* Profile Form */}
        <form className="space-y-4 max-w-sm mx-auto">
          <Input label="User Name" name="username" type="text" value={user?.fullName} disabled />
          <Input label="Email Address" name="email" type="email" value={user?.email} disabled />
          <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="secondary" disabled>Update</Button>
            <Button type="submit" disabled>Save</Button>
          </div>
        </form>
      </section>
    </>
  );
}