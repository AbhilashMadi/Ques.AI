import { Button, Input, Textarea } from '@custom';
import { memo, type FC } from 'react';
import ServerKeys from '@resources/server-keys';
import { useForm } from '@hooks/use-form'
import { type AddTranscriptInput, addTranscriptValidationSchema } from '@schemas/add-transcript-schema';
import { useCreatePodcastMutation } from '@/redux/podcasts/podcasts-api';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

interface IAddYoutubeTranscrptForm {
  setClose: () => void;
}

const AddYoutubeTranscriptForm: FC<IAddYoutubeTranscrptForm> = memo(({ setClose }) => {
  const [createPodcast, { isLoading }] = useCreatePodcastMutation();
  const { projectId } = useParams();

  const { errors, values, handleBlur, handleChange, handleSubmit, resetForm, touched } = useForm<AddTranscriptInput>({
    initialValues: {
      [ServerKeys.TRANSCRIPT_NAME]: '',
      [ServerKeys.TRANSCRIPT]: '',
      [ServerKeys.TRNASCRIPT_CATEGORY]: 'youtube'
    },
    validationSchema: addTranscriptValidationSchema,
    onSubmit: async (values) => {
      try {
        const { message } = await createPodcast({
          projectId: projectId ?? '',
          name: values.transcriptName,
          sourceType: values.transcriptCategory,
          transcript: values.transcript,
        }).unwrap();
        toast.success(message);
        setClose();
      } catch (error: any) {
        console.error(error);
        toast.error(error?.data?.message || error.message || 'Something went wrong');
      }
    },
  })

  return (<form className="flex flex-col gap-4" onSubmit={handleSubmit} onReset={resetForm}>
    <Input
      required
      label="Name"
      name={ServerKeys.TRANSCRIPT_NAME}
      onChange={handleChange}
      onBlur={handleBlur}
      errorMessage={errors[ServerKeys.TRANSCRIPT_NAME]}
      touched={touched[ServerKeys.TRANSCRIPT_NAME]}
      value={values[ServerKeys.TRANSCRIPT_NAME]}
    />
    <Textarea
      required
      label="Transcript"
      name={ServerKeys.TRANSCRIPT}
      onChange={handleChange}
      onBlur={handleBlur}
      errorMessage={errors[ServerKeys.TRANSCRIPT]}
      touched={touched[ServerKeys.TRANSCRIPT]}
      value={values[ServerKeys.TRANSCRIPT]}
    />
    <div className="flex justify-end mt-4 gap-4">
      <Button
        type="reset"
        variant="ghost"
        className="text-destructive"
        disabled={isLoading}>Cancel</Button>
      <Button
        className="bg-foreground"
        loading={isLoading}
        disabled={isLoading}>Upload</Button>
    </div>
  </form>)
})

export default AddYoutubeTranscriptForm;