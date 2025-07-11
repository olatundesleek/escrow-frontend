import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import ButtonIcon from './ButtonIcon';

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
  width = 'w-full lg:max-w-3xl max-w-lg',
}: ModalProps) {
  return (
    <Transition appear as={Fragment} show={isOpen}>
      <Dialog
        as='div'
        className='z-50 relative'
        open={isOpen}
        onClose={onClose}
      >
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='bg-slate-200/20 fixed inset-0 backdrop-blur-sm' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto lg:top-header-height top-[calc(var(--header-height)+4rem)]'>
          <div className='flex items-center justify-center p-4 min-h-full'>
            <DialogPanel
              className={`${width} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
            >
              <DialogTitle className='text-lg font-semibold text-dashboard-secondary mb-4 flex justify-between items-center'>
                <span>{title}</span>
                <ButtonIcon
                  ariaLabel='Close Form'
                  style='border-0'
                  onClick={onClose}
                >
                  <IoCloseSharp fontSize={'1.5rem'} />
                </ButtonIcon>
              </DialogTitle>
              <div>{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
