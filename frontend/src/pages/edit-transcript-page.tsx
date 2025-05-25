import { MoveLeftIcon } from '@icons';
import { Button } from '@custom';
import { useNavigate } from 'react-router-dom';

export default function EditTranscriptPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2" onClick={() => navigate(-1)}>
        <button className="flex items-center gap-2 text-sm sm:text-base cursor-pointer">
          <MoveLeftIcon height={18} />
          <span>Edit Transcript</span>
        </button>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button className="bg-foreground" size="sm">Edit</Button>
          <Button className="bg-green-400" size="sm">Save</Button>
          <Button variant="destructive" size="sm">Discard</Button>
        </div>
      </div>

      {/* Content Area */}
      <article className="bg-card p-4 sm:p-6 md:p-8 rounded h-[74dvh] overflow-y-auto space-y-4 text-sm sm:text-base leading-relaxed text-muted">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum consequuntur quam illum dolorum? Mollitia error incidunt sint, commodi enim fugit! Dolores accusantium iste voluptatum repellat...</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem fuga praesentium voluptatem ipsa ab illum quos officiis alias, iste nulla aut voluptas. Obcaecati ab ad reprehenderit...</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores officia expedita sit consectetur magnam cum dolorem necessitatibus...</p>
      </article>
    </>
  );
}
