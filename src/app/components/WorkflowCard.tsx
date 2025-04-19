import Image from "next/image";

const WorkflowCard = () => {
  return (
    <div className="flex gap-30">
      <Image src="/greet.png" width="100" height="100" alt="Workflow Image" />
      <div>
        <h1 className="bg-secondary w-10 h-10 rounded-sm font-bold shadow-[5px_5px_0px_0px_hsl(35,85%,60%)] flex justify-center items-center text-2xl text-white">
          1
        </h1>
      </div>
    </div>
  );
};

export default WorkflowCard;
