'use client';

import { useState } from 'react';

import UserDashboardHeader from '@/app/_components/UserDashboardHeader';
import UserSidebar from '@/app/_components/UserSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  return (
    <div
      className={`lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr] lg:h-screen`}
    >
      <UserDashboardHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <UserSidebar isSidebarOpen={isSidebarOpen} />
      <main>
        <div className='lg:max-w-[120rem] lg:my-0 lg:mx-auto lg:flex lg:flex-col lg:gap-4'>
          {children}
        </div>
      </main>
    </div>
  );
}

//------------------------------------------------------
// 'use client';

// import { useState } from 'react';
// import DashboardHeader from '../_components/DashboardHeader';
// import Sidebar from '../_components/Sidebar';

// export default function Layout({ children }: { children: React.ReactNode }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
//   return (
//     <div
//       className={`lg:grid ${
//         isSidebarOpen
//           ? 'lg:grid-cols-[clamp(18rem,18vw,20rem)_1fr]'
//           : 'lg:grid-cols-[clamp(5rem,5vw,5rem)_1fr]'
//       } lg:grid-rows-[auto_1fr] lg:h-screen`}
//     >
//       <DashboardHeader
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />
//       <Sidebar isSidebarOpen={isSidebarOpen} />
//       <main>
//         <div className='lg:max-w-[120rem] lg:my-0 lg:mx-auto lg:flex lg:flex-col lg:gap-4'>
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }
// ---------------------------------
// ? 'grid-cols-[clamp(18rem,18vw,20rem)_1fr]'
// : 'grid-cols-[clamp(5rem,5vw,5rem)_1fr]'
//'grid-cols-[18rem_1fr]' : 'grid-cols-[5rem_1fr]'
