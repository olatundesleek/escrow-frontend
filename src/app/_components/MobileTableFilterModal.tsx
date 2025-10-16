// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface FilterConfig {
//   key: string;
//   label: string;
//   options: string[];
// }

// export default function MobileTableFilterModal({
//   isOpen,
//   onClose,
//   queryParams,
//   setQueryParams,
//   filterConfig,
//   showLimitSelector,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   queryParams: Record<string, string | number | null>;
//   setQueryParams: (params: Record<string, string | number>) => void;
//   filterConfig: FilterConfig[];
//   showLimitSelector?: boolean;
// }) {
//   const [localFilters, setLocalFilters] = useState<Record<string, string>>({});

//   // Sync with query params when modal opens
//   useEffect(() => {
//     const syncFilters: Record<string, string> = {};
//     filterConfig.forEach((f) => {
//       syncFilters[f.key] = String(queryParams[f.key] || '');
//     });

//     // ✅ include limit explicitly if showLimitSelector is true
//     if (showLimitSelector) {
//       syncFilters.limit = String(queryParams.limit || '10');
//     }

//     setLocalFilters(syncFilters);
//   }, [queryParams, filterConfig, showLimitSelector]);

//   const applyFilters = () => {
//     setQueryParams({ ...localFilters, page: 1 });
//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Overlay */}
//           <motion.div
//             className='fixed inset-0 bg-black/40 backdrop-blur-sm z-100'
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />

//           {/* Bottom Sheet */}
//           <motion.div
//             className='
//               fixed -bottom-5 left-0 right-0 z-100 
//               bg-db-dark text-db-primary rounded-t-2xl shadow-lg bg-db-surface 
//               pb-[calc(env(safe-area-inset-bottom)+0.5rem)]
//               lg:hidden
//             '
//             initial={{ y: '100%' }}
//             animate={{ y: 0 }}
//             exit={{ y: '100%' }}
//             transition={{ type: 'tween', duration: 0.3 }}
//           >
//             <div className='p-4 space-y-6 max-h-[70vh] overflow-y-auto'>
//               <div className='flex justify-between items-center'>
//                 <h2 className='text-base font-semibold'>Filters</h2>
//                 <button onClick={onClose}>✕</button>
//               </div>

//               {/* Dynamic Filters */}
//               {filterConfig.map(({ key, label, options }) => (
//                 <div key={key}>
//                   <label className='text-sm font-medium block mb-2'>
//                     {label}
//                   </label>
//                   <div className='flex flex-wrap gap-2'>
//                     {options.map((opt) => {
//                       const value = opt === 'All' ? '' : opt.toLowerCase();
//                       const isActive = localFilters[key] === value;
//                       return (
//                         <button
//                           key={opt}
//                           onClick={() =>
//                             setLocalFilters((prev) => ({
//                               ...prev,
//                               [key]: value,
//                             }))
//                           }
//                           className={`px-3 py-1 rounded-full text-sm border ${
//                             isActive
//                               ? 'bg-db-primary text-white border-db-primary'
//                               : 'border-gray-500 text-db-text-primary'
//                           }`}
//                         >
//                           {opt}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}

//               {showLimitSelector && (
//                 <div>
//                   <label className='text-sm font-medium block mb-2'>
//                     Items per page
//                   </label>
//                   <div className='flex gap-2 flex-wrap'>
//                     {[5, 10, 15, 20, 25, 30].map((n) => (
//                       <button
//                         key={n}
//                         onClick={() =>
//                           setLocalFilters((prev) => ({
//                             ...prev,
//                             limit: String(n),
//                           }))
//                         }
//                         className={`px-3 py-1 rounded-full text-sm border ${
//                           Number(localFilters.limit) === n
//                             ? 'bg-db-primary text-white border-db-primary'
//                             : 'border-gray-500 text-db-text-primary'
//                         }`}
//                       >
//                         {n}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Buttons */}
//               <div className='flex justify-end gap-2 mt-4'>
//                 <button
//                   onClick={onClose}
//                   className='border border-gray-500 text-db-text-primary px-3 py-2 rounded-md text-sm'
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={applyFilters}
//                   className='bg-db-primary text-white px-3 py-2 rounded-md text-sm'
//                 >
//                   Apply Filters
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterConfig {
  key: string;
  label: string;
  options: string[];
}

export default function MobileTableFilterModal({
  isOpen,
  onClose,
  queryParams,
  setQueryParams,
  filterConfig = [], // 👈 optional by default
}: {
  isOpen: boolean;
  onClose: () => void;
  queryParams: Record<string, string | number | null>;
  setQueryParams: (params: Record<string, string | number>) => void;
  filterConfig?: FilterConfig[];
}) {
  const [localFilters, setLocalFilters] = useState<Record<string, string>>({});
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Sync filters + limit
  useEffect(() => {
    const syncFilters: Record<string, string> = {};
    filterConfig.forEach((f) => {
      syncFilters[f.key] = String(queryParams[f.key] || '');
    });
    syncFilters.limit = String(queryParams.limit || '10');
    setLocalFilters(syncFilters);
  }, [queryParams, filterConfig]);

  const applyFilters = () => {
    setQueryParams({ ...localFilters, page: 1 });
    onClose();
  };

  // ✅ close only when clicking outside modal, not while scrolling
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className='fixed inset-0 bg-black/40 backdrop-blur-sm z-100'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          />

          {/* Bottom Sheet */}
          <motion.div
            ref={modalRef}
            className='
              fixed -bottom-5 left-0 right-0 z-100 
              bg-db-dark text-db-primary rounded-t-2xl shadow-lg bg-db-surface 
              pb-[calc(env(safe-area-inset-bottom)+0.5rem)]
              lg:hidden
            '
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className='p-4 space-y-6 max-h-[70vh] overflow-y-auto'>
              {/* Header */}
              <div className='flex justify-between items-center'>
                <h2 className='text-base font-semibold'>Filters</h2>
                <button onClick={onClose}>✕</button>
              </div>

              {/* Dynamic Filters (Optional) */}
              {filterConfig.length > 0 &&
                filterConfig.map(({ key, label, options }) => (
                  <div key={key}>
                    <label className='text-sm font-medium block mb-2'>
                      {label}
                    </label>
                    <div className='flex flex-wrap gap-2'>
                      {options.map((opt) => {
                        const value = opt === 'All' ? '' : opt.toLowerCase();
                        const isActive = localFilters[key] === value;
                        return (
                          <button
                            key={opt}
                            onClick={() =>
                              setLocalFilters((prev) => ({
                                ...prev,
                                [key]: value,
                              }))
                            }
                            className={`px-3 py-1 rounded-full text-sm border ${
                              isActive
                                ? 'bg-db-primary text-white border-db-primary'
                                : 'border-gray-500 text-db-text-primary'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

              {/* ✅ Always show limit selector */}
              <div>
                <label className='text-sm font-medium block mb-2'>
                  Items per page
                </label>
                <div className='flex gap-2 flex-wrap'>
                  {[5, 10, 15, 20, 25, 30].map((n) => (
                    <button
                      key={n}
                      onClick={() =>
                        setLocalFilters((prev) => ({
                          ...prev,
                          limit: String(n),
                        }))
                      }
                      className={`px-3 py-1 rounded-full text-sm border ${
                        Number(localFilters.limit) === n
                          ? 'bg-db-primary text-white border-db-primary'
                          : 'border-gray-500 text-db-text-primary'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className='flex justify-end gap-2 mt-4'>
                <button
                  onClick={onClose}
                  className='border border-gray-500 text-db-text-primary px-3 py-2 rounded-md text-sm'
                >
                  Cancel
                </button>
                <button
                  onClick={applyFilters}
                  className='bg-db-primary text-white px-3 py-2 rounded-md text-sm'
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
