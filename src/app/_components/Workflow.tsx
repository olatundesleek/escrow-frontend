import { workflow } from '../constants/workFlow';
import SectionalTitle from './SectionalTitle';
import WorkflowCard from './WorkflowCard';

export default function Workflow() {
  return (
    <div className='bg-primary-section py-12 lg:py-24 lg:px-32'>
      <div className='lg:mb-8 [&>div>header]:text-base md:[&>div>header]:text-lg lg:[&>div>header]:text-2xl'>
        <SectionalTitle
          title='Workflow'
          description='Your Comprehensive Roadmap to Secure, Transparent, and Hassle-Free Transactions'
        />
      </div>

      <div className='grid grid-cols-1 lg:gap-6 justify-items-start lg:justify-items-center '>
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
