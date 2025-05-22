import { type FC } from 'react';
import spinnerSrc from '@assets/tube-spinner.svg';

const Loader: FC = () => {
  return (<main className="min-h-screen flex-center">
    <img src={spinnerSrc}
      height={50}
      width={50}
      loading="lazy"
      decoding="async"
      className="p-2 bg-secondary rounded-md" />
  </main>)
}

export default Loader;