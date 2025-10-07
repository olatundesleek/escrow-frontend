import { Button } from "@/app/_components/DashboardBtn";
import { disputeReasons } from "@/app/_constants/disputeReasons";
import { useForm } from "react-hook-form";
// import toast from 'react-hot-toast';
import useCreateDispute from "./useCreateDispute";

interface CreateDisputeFormInputs {
  disputeReason: string;
  otherReason?: string;
}

export default function CreateDisputeForm({
  closeDisputeForm,
  escrowId,
}: {
  closeDisputeForm: () => void;
  escrowId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateDisputeFormInputs>();

  const { createDispute, isCreatingDispute } = useCreateDispute(escrowId);

  const disputeReason = watch("disputeReason");

  const onSubmit = (data: CreateDisputeFormInputs) => {
    // If 'others' is selected, you can use the `otherReason` value.
    const reason =
      data.disputeReason === "others"
        ? data.otherReason ?? ""
        : data.disputeReason;

    const disputeSubmissionData = {
      reason,
      escrowId,
    };

    console.log("Data to submit:", disputeSubmissionData);
    createDispute(disputeSubmissionData);
    // toast.success('Dispute request sent successfully');
    closeDisputeForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="disputeReason"
          className="block text-db-text-primary text-sm font-black mb-2"
        >
          Dispute Reason:
        </label>

        <select
          id="disputeReason"
          defaultValue={""}
          className={`w-full ring ring-db-border bg-db-background rounded-md p-2 cursor-pointer pr-8 outline-db-secondary ${
            watch("disputeReason") === ""
              ? "text-db-text-secondary"
              : "text-db-secondary"
          } ${errors.disputeReason && "ring ring-error"}`}
          {...register("disputeReason", {
            required: {
              value: true,
              message: "Please select the reason you are creating this dispute",
            },
            validate: (value) =>
              value !== "" ||
              "Please select the reason you are creating this dispute",
          })}
        >
          <option
            value=""
            className="text-db-text-secondary cursor-pointer"
            disabled
          >
            --Select your dispute reason--
          </option>
          {disputeReasons.map(({ value, label }) => (
            <option
              value={value.toLowerCase()}
              className="hover:bg-db-border/50"
              key={value}
            >
              {label}
            </option>
          ))}
        </select>

        {errors.disputeReason && (
          <span className="text-error text-sm">
            {errors.disputeReason.message}
          </span>
        )}
      </div>

      <div>
        {disputeReason === "others" && (
          <>
            <input
              type="text"
              id="otherReason"
              className="border border-db-border w-full p-2 rounded-lg"
              {...register("otherReason", {
                required:
                  "Please give a short description for the reason you are creating this dispute",
              })}
            />
          </>
        )}
        {errors.otherReason && (
          <span className="text-error text-sm">
            {errors.otherReason.message}
          </span>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          variant="secondary"
          className="w-full"
          size="lg"
          disabled={isCreatingDispute}
        >
          File Appeal
        </Button>
      </div>
    </form>
  );
}

//check out vercept
