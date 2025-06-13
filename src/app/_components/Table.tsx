import { createContext, useContext } from 'react';

const TableContext = createContext<{ columns: string }>({
  columns: '',
});

export default function Table({
  columns,
  children,
}: {
  columns: string;
  children: React.ReactNode;
  headerColumns?: string;
}) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className='w-full overflow-x-auto rounded-lg border border-dashboard-border my-8'>
        <table className='w-full text-sm bg-grey-0'>{children}</table>
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  const context = useContext(TableContext);
  if (!context) throw new Error('Table.Header must be used under table');

  const { columns } = context;
  return (
    <thead className='w-full uppercase tracking-wide text-left border-b border-gray-100  bg-gray-200'>
      <tr className={`grid ${columns} px-4 py-3`}>{children}</tr>
    </thead>
  );
}

function Head({
  children,
  position = 'justify-start',
}: {
  children: React.ReactNode;
  position?: string;
}) {
  return (
    <th
      className={`w-full flex ${position} font-medium text-base text-gray-700`}
    >
      {children}
    </th>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  const context = useContext(TableContext);
  if (!context) throw new Error('Table.Row must be used under table');
  const { columns } = context;

  return (
    <tr
      className={`grid ${columns} border-b border-dashboard-border px-4 py-3`}
    >
      {children}
    </tr>
  );
}

function Body<T>({
  data,
  render,
}: {
  data: T[];
  render: (item: T) => React.ReactNode;
}) {
  if (data.length === 0)
    return (
      <tbody className='w-full flex justify-center items-center p4 text-dashboard-secondary'>
        No data was found!
      </tbody>
    );

  return <tbody className=''>{data.map(render)}</tbody>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return children ? (
    <tfoot className='bg-grey-50'>
      <tr>
        <td colSpan={100}>
          <div className='px-4 py-3 flex justify-end'>{children}</div>
        </td>
      </tr>
    </tfoot>
  ) : null;
}

Table.Header = Header;
Table.Head = Head;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

/*
const StyledHeader = styled(CommonRow)`
padding: 1.6rem 2.4rem;

background-color: var(--color-grey-50);
border-bottom: 1px solid var(--color-grey-100);
text-transform: uppercase;
letter-spacing: 0.4px;
font-weight: 600;
color: var(--color-grey-600);
`;
const StyledTable = styled.div`
border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;


const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`; */

// import { createContext, useContext, ReactNode } from 'react';

// type TableContextType = {
//   data: any[];
// };

// const TableContext = createContext<TableContextType | null>(null);

// export function Table({
//   children,
//   data,
// }: {
//   children: ReactNode;
//   data: any[];
// }) {
//   return (
//     <TableContext.Provider value={{ data }}>
//       <div className='w-full overflow-x-auto border rounded-xl'>
//         <table className='min-w-full divide-y divide-gray-200'>
//           {children}
//         </table>
//       </div>
//     </TableContext.Provider>
//   );
// }

// function Head({ children }: { children: ReactNode }) {
//   return (
//     <thead className='bg-gray-100'>
//       <tr>{children}</tr>
//     </thead>
//   );
// }

// function Column({ title }: { title: string }) {
//   return (
//     <th className='px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider'>
//       {title}
//     </th>
//   );
// }

// function Body({ children }: { children: (row: any) => ReactNode }) {
//   const context = useContext(TableContext);
//   if (!context) throw new Error('Table.Body must be used within a Table');

//   return (
//     <tbody className='bg-white divide-y divide-gray-200'>
//       {context.data.map((row, i) => (
//         <tr key={i}>{children(row)}</tr>
//       ))}
//     </tbody>
//   );
// }

// function Row({ children }: { children: ReactNode }) {
//   return <>{children}</>;
// }

// function Cell({ children }: { children: ReactNode }) {
//   return <td className='px-4 py-3 text-sm text-gray-700'>{children}</td>;
// }

// Table.Head = Head;
// Table.Column = Column;
// Table.Body = Body;
// Table.Row = Row;
// Table.Cell = Cell;
