'use client';

import { ToastBar, Toaster, toast } from 'react-hot-toast';

export default function AppToaster() {
  return (
    <Toaster
      position='top-center'
      gutter={12}
      containerStyle={{ margin: '8px' }}
      toastOptions={{
        success: {
          duration: 5000,
        },
        error: {
          duration: 8000,
        },
        style: {
          fontSize: '16px',
          fontWeight: 500,
          maxWidth: '500px',
          padding: '16px 24px',
          borderRadius: '8px',
          backgroundColor: '#fff',
          color: '#000000',
        },
      }}
    >
      {(t) => (
        <div className='cursor-pointer' onClick={() => toast.dismiss(t.id)}>
          <ToastBar toast={t} />
        </div>
      )}
    </Toaster>
  );
}
