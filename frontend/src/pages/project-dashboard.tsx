import { useParams } from 'react-router-dom'

export default function ProjectDashboard() {
  const { projectId } = useParams();

  return (<>Project Dashboard - {projectId}</>)
}