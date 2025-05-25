
import { memo, type FC } from 'react';

interface IChooseTranscriptTypeCardProps {
  imgSrc: string;
  title: string;
  description: string;
  onPress: () => void;
}

const ChooseTranscriptTypeCard: FC<IChooseTranscriptTypeCardProps> = memo(({ imgSrc, title, description, onPress }) => {
  return (<li className="bg-card p-4 rounded border-muted flex justify-between gap-4 cursor-pointer" onClick={onPress}>
    <div>
      <h4 className="text-h4">{title}</h4>
      <p className="text-muted mt-4">{description}</p>
    </div>
    <img
      src={imgSrc}
      height={100}
      width={100}
      loading="lazy"
      decoding="async"
      className="h-20 w-20"
    />
  </li>)
})

export default ChooseTranscriptTypeCard;