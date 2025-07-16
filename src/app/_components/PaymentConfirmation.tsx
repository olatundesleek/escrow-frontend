"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function PaymentConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get('reference');

  const [status, setStatus] = useState<
    'loading' | 'success' | 'pending' | 'failed'
  >('loading');
  const retriesRef = useRef(0);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const maxRetries = 5;

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm-payment/${reference}`,
        {
          credentials: 'include',
        },
      );

      const { confirmation: data } = await res.json();

      if (data.status === "success") {
        const type = data.transaction?.type;

        if (type === 'escrow_payment' || type === 'escrow') {
          const escrowId = data.escrow;
          router.push(`/dashboard/escrows/${escrowId}`);
        } else if (type === 'addfunds') {
          router.push(`/dashboard/wallet`);
        } else {
          setStatus('failed');
        }
      } else if (data.status === 'pending') {
        setStatus('pending');
        if (retriesRef.current < maxRetries) {
          retriesRef.current++;
          timeOutRef.current = setTimeout(fetchStatus, 2000);
        } else {
          setStatus('failed');
        }
      } else {
        setStatus('failed');
      }
    } catch (error) {
      console.error('Error fetching payment status:', error);
      setStatus('failed');
    }
  }, [reference, router]);

  useEffect(() => {
    if (reference) {
      fetchStatus();
    }

    return () => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
    };
  }, [reference, fetchStatus]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-center px-4'>
      {status === 'loading' || status === 'pending' ? (
        <div>
          <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-accent mx-auto mb-4'></div>
          <p className='text-lg font-semibold'>Verifying your payment...</p>
        </div>
      ) : status === "failed" ? (
        <div className="text-yellow-600">
          <h2 className="text-2xl font-bold mb-2">Still Processing</h2>
          <p>
            Please check your dashboard for the latest update on your payment.
          </p>
        </div>
      )}
    </div>
  );
}
