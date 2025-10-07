import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { IoCloseSharp } from "react-icons/io5";
import ButtonIcon from "./ButtonIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  width = "w-full lg:max-w-3xl max-w-lg",
}: ModalProps) {
  return (
    <Transition appear as={Fragment} show={isOpen}>
      <Dialog as="div" className="relative z-[9999]" open={isOpen} onClose={onClose}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </TransitionChild>

        {/* Fullscreen container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={`${width} transform overflow-hidden rounded-2xl bg-db-surface p-6 text-left align-middle shadow-xl transition-all`}
              >
                {/* Header */}
                <DialogTitle className="text-lg font-semibold text-db-primary mb-4 flex justify-between items-center">
                  <span>{title}</span>
                  <ButtonIcon ariaLabel="Close Form" style="border-0" onClick={onClose}>
                    <IoCloseSharp fontSize="1.5rem" />
                  </ButtonIcon>
                </DialogTitle>

                {/* Body */}
                <div>{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
