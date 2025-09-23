import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  escrowCategories,
  escrowCreatorRole,
} from "@/app/_constants/escrowCategories";
import { Button } from "@/app/_components/DashboardBtn";
import ButtonIcon from "@/app/_components/ButtonIcon";
import { CreateEscrowFormInputs } from "@/app/_types/userDashboardServicesTypes";
import useCreateEscrow from "./useCreateEscrow";
import {
  formatCurrencyInput,
  parseCurrencyFormatted,
} from "@/app/_utils/helpers";

export default function AddEscrowForm({
  handleCloseForm,
  initialValues = {},
}: {
  handleCloseForm: () => void;
  initialValues?: Partial<CreateEscrowFormInputs>;
}) {
  const [newTerm, setNewTerm] = useState<string>("");
  const [newTermError, setNewTermError] = useState<string | null>("");
  const [isAddingNewTerm, setIsAddingNewTerm] = useState<boolean>(false);
  const [amountDisplay, setAmountDisplay] = useState<string>("");

  const termInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    register: formRegister,
    setValue,
  } = useForm<CreateEscrowFormInputs>({
    defaultValues: {
      terms: [],
      creatorRole: initialValues.creatorRole || "",
      amount: initialValues.amount || undefined,
      category: initialValues.category || "",
      counterpartyEmail: "",
      description: "",
      escrowFeePayment: "",
    },
  });

  const { createEscrow } = useCreateEscrow();

  useEffect(() => {
    formRegister("terms", {
      validate: (value) =>
        value && value.length > 0 ? true : "Add at least one term",
    });
    formRegister("amount", {
      required: "Enter the escrow amount",
    });
  }, [formRegister]);

  const terms = watch("terms") || [];

  useEffect(() => {
    if (isAddingNewTerm && termInputRef.current) {
      termInputRef.current.focus();
    }
  }, [isAddingNewTerm]);

  useEffect(() => {
    if (initialValues.amount) {
      const numeric = Number(initialValues.amount);
      setAmountDisplay(numeric.toString());
      setValue("amount", numeric, { shouldValidate: true });
    }
    return () => {};
  }, [initialValues.amount, setValue]);

  const handleAddTerm = () => {
    if (!newTerm.trim()) {
      setNewTermError("Term cannot be empty");
      return;
    }
    setNewTermError(null);
    setValue("terms", [...terms, newTerm.trim()], { shouldValidate: true });
    setNewTerm("");
    setIsAddingNewTerm(false);
  };

  const handleRemoveTerm = (index: number) => {
    setValue(
      "terms",
      terms.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  const handleAddTermInputKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTerm();
    }
  };

  const onSubmit = (data: CreateEscrowFormInputs) => {
    createEscrow(data);
    handleCloseForm();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* User role + Category */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <label
            htmlFor="creatorRole"
            className="block text-db-text-primary text-sm font-semibold mb-2"
          >
            Your Role
          </label>
          <select
            id="creatorRole"
            defaultValue=""
            className={`w-full border border-db-border rounded-lg p-2 cursor-pointer pr-8 outline-db-primary bg-db-background ${
              watch("creatorRole") === ""
                ? "text-db-text-secondary"
                : "text-db-secondary"
            } ${errors.creatorRole && "border-error"}`}
            {...register("creatorRole", {
              required: { value: true, message: "Select your role" },
            })}
          >
            <option value="" disabled>
              -- Select role --
            </option>
            {escrowCreatorRole.map(({ role }) => (
              <option key={role} value={role.toLowerCase()}>
                {role}
              </option>
            ))}
          </select>
          {errors.creatorRole && (
            <span className="text-error text-sm">
              {errors.creatorRole.message}
            </span>
          )}
        </div>

        <div className="w-full">
          <label
            htmlFor="category"
            className="block text-sm text-db-text-primary font-semibold mb-2"
          >
            Escrow Category
          </label>
          <select
            id="category"
            defaultValue=""
            className={`w-full border border-db-border rounded-lg p-2 cursor-pointer pr-8 outline-db-primary bg-db-background ${
              watch("category") === ""
                ? "text-db-text-secondary"
                : "text-db-secondary"
            } ${errors.category && "border-error"}`}
            {...register("category", {
              required: { value: true, message: "Select escrow category" },
            })}
          >
            <option value="" className="bg-db-border" disabled>
              -- Select category --
            </option>
            {escrowCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-error text-sm">
              {errors.category.message}
            </span>
          )}
        </div>
      </div>

      {/* Counterparty */}
      <div>
        <label
          htmlFor="counterpartyEmail"
          className="block text-sm text-db-text-primary font-semibold mb-2"
        >
          Counterparty Email
        </label>
        <input
          type="text"
          id="counterpartyEmail"
          className={`border border-db-border text-db-text-secondary w-full p-2 rounded-lg outline-db-primary bg-db-background ${
            errors.counterpartyEmail ? "border-error" : ""
          }`}
          placeholder="e.g. counterparty@email.com"
          {...register("counterpartyEmail", {
            required: { value: true, message: "Enter the other party’s email" },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.counterpartyEmail && (
          <span className="text-error text-sm">
            {errors.counterpartyEmail.message}
          </span>
        )}
      </div>

      {/* Amount */}
      <div>
        <label
          htmlFor="amount"
          className="block text-sm text-db-text-primary font-semibold mb-2"
        >
          Amount (₦)
        </label>
        <input
          type="text"
          inputMode="decimal"
          id="amount"
          className={`border border-db-borde text-db-text-secondary w-full p-2 rounded-lg outline-db-primary bg-db-background ${
            errors.amount ? "border-error" : ""
          }`}
          value={amountDisplay}
          placeholder="₦0.00"
          onChange={(e) => {
            const rawValue = parseCurrencyFormatted(e.target.value);
            setAmountDisplay(rawValue.toString());
            setValue("amount", parseFloat(rawValue.toString()), {
              shouldValidate: true,
            });
          }}
          onBlur={() => {
            if (!amountDisplay) return;
            setAmountDisplay(formatCurrencyInput(amountDisplay));
          }}
          onFocus={(e) => {
            const numeric = parseCurrencyFormatted(e.target.value);
            setAmountDisplay(numeric.toString());
          }}
        />
        {errors.amount && (
          <span className="text-error text-sm">{errors.amount.message}</span>
        )}
      </div>

      {/* Terms */}
      <div>
        <label
          htmlFor="terms"
          className="block text-sm text-db-text-primary font-semibold mb-2"
        >
          Terms
        </label>
        <ul
          className={`${
            terms.length > 0 ? "border border-db-border" : ""
          } p-2 rounded-t-lg space-y-2 overflow-y-auto max-h-40 custom-scrollbar`}
        >
          {terms.length > 0 ? (
            terms.map((term, i) => (
              <li
                key={i}
                className="flex justify-between items-center border border-db-border px-3 py-2 rounded-md"
              >
                <span>{term}</span>
                <Button
                  variant="outline"
                  className="text-white"
                  textSize="sm"
                  onClick={() => handleRemoveTerm(i)}
                >
                  <IoCloseSharp />
                </Button>
              </li>
            ))
          ) : (
            <li className="text-db-text-secondary">No terms added yet.</li>
          )}
        </ul>
        {errors.terms && (
          <span className="text-error text-sm">{errors.terms.message}</span>
        )}

        {isAddingNewTerm ? (
          <div className="flex gap-2 mt-3">
            <input
              id="terms"
              ref={termInputRef}
              type="text"
              value={newTerm}
              onChange={(e) => {
                setNewTerm(e.target.value);
                if (newTermError) setNewTermError(null);
              }}
              onKeyDown={handleAddTermInputKeydown}
              placeholder="Add a term..."
              className={`flex-1 border border-db-border text-db-text-secondary p-2 rounded-lg outline-db-primary ${
                newTermError ? "border-error" : ""
              }`}
            />
            <ButtonIcon onClick={() => handleAddTerm()}>
              <IoMdAdd />
            </ButtonIcon>
          </div>
        ) : (
          <div
            className={` text-white p-2 ${
              terms.length > 0 ? "rounded-b-lg w-full" : "rounded-lg w-fit"
            }`}
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddingNewTerm(true)}
            >
              <IoMdAdd />
              <span>Add term</span>
            </Button>
          </div>
        )}
        {newTermError && (
          <span className="text-error text-sm">{newTermError}</span>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm text-db-text-primary font-semibold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className={`border border-db-border w-full p-2 text-db-text-secondary rounded-lg outline-db-primary bg-db-background ${
            errors.description ? "border-error" : ""
          }`}
          placeholder="Briefly describe the item..."
          {...register("description", {
            required: { value: true, message: "Enter a description" },
          })}
        />
        {errors.description && (
          <span className="text-error text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      {/* Fee Payment */}
      <div>
        <label
          htmlFor="escrowFeePayment"
          className="block text-sm text-db-text-primary font-semibold mb-2"
        >
          Who Pays Escrow Fee?
        </label>
        <Controller
          name="escrowFeePayment"
          control={control}
          defaultValue=""
          rules={{ required: "Select who pays the escrow fee" }}
          render={({ field }) => (
            <div className="flex gap-2 border border-db-border rounded-lg p-2">
              {[...escrowCreatorRole.map(({ role }) => role), "Split"].map(
                (payer) => {
                  const value = payer.toLowerCase();
                  return (
                    <Button
                      key={payer}
                      variant={field.value === value ? "secondary" : "primary"}
                      onClick={() => field.onChange(value)}
                    >
                      {payer}
                    </Button>
                  );
                }
              )}
            </div>
          )}
        />
        {errors.escrowFeePayment && (
          <span className="text-error text-sm">
            {errors.escrowFeePayment.message}
          </span>
        )}
      </div>

      {/* Submit */}
      <Button variant="secondary" size="lg" className="w-full" type="submit">
        Create Escrow
      </Button>
    </form>
  );
}
