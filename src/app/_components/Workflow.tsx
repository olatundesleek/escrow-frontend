import { workflow } from "../_constants/workFlow";
import SectionalTitle from "./SectionalTitle";
import WorkflowCard from "./WorkflowCard";

export default function Workflow() {
  return (
    <section
      className="w-full bg-primary-section py-12 lg:py-24"
      aria-label="Workflow"
    >
      <div className="xl:px-32 px-4">
        <div className="mb-8">
          <SectionalTitle
            title="Workflow"
            description="Your Comprehensive Roadmap to Secure, Transparent, and Hassle-Free Transactions"
          />
        </div>
        <ul className="grid grid-cols-1 gap-8 lg:gap-10">
          {workflow.map((data, i) => (
            <WorkflowCard
              key={data.number}
              image={data.image}
              number={data.number}
              title={data.title}
              description={data.description}
              style={data.style}
              border={data.border}
              align={(i + 1) % 2 === 0 ? "end" : "start"}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
