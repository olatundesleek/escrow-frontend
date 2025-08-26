import { depositApi } from "@/app/_lib/userDashboardServices";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function useDeposit() {
  const toastId = useRef<string>("");

  const { mutate: deposit, isPending: isDepositPending } = useMutation({
    mutationFn: depositApi,

    onMutate: () => {
      toastId.current = toast.loading(
        "Initiating deposit. Please exercise patience..."
      );
    },

    onSuccess: (data) => {
      toast.success(data.message, { id: toastId.current });
      const url = data.addFundsResponse.payment.data.authorization_url;

      if (url) {
        setTimeout(() => {
          toast.loading("Redirecting to payment gateway...", {
            id: toastId.current,
          });
          window.open(url, "_blank");
          toast.dismiss(toastId.current);
        }, 2000);
      }
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deposit, isDepositPending };
}
