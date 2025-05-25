import { type FC } from 'react';
import { tubeSpinner } from '@assets';

const Loader: FC = () => {
  return (<main className="min-h-screen bg-background flex-center">
    <img src={tubeSpinner}
      height={50}
      width={50}
      loading="lazy"
      decoding="async"
      className="p-2 bg-secondary rounded-md" />
  </main>)
}

export default Loader;