import { workflow } from '../constants/workFlow';
import SectionalTitle from './SectionalTitle';
import WorkflowCard from './WorkflowCard';

export default function Workflow() {
  return (
    <div className='bg-section py-32'>
      <div className='mb-8'>
        <SectionalTitle
          title='Workflow'
          description='Your Comprehensive Roadmap to Secure, Transparent, and Hassle-Free Transactions'
        />
      </div>

      <div className='grid grid-cols-1 px-32 py-20 gap-6'>
        {workflow.map((data, i) => (
          <WorkflowCard
            key={data.number}
            image={data.image}
            number={data.number}
            title={data.title}
            description={data.description}
            style={data.style}
            border={data.border}
            align={(i + 1) % 2 === 0 ? 'end' : 'start'}
          />
        ))}
      </div>
    </div>
  );
}
