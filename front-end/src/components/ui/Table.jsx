const TableContainer = ({ className = "", children }) => (
  <div
    className={(
      "m-4 overflow-auto rounded-lg border border-slate-500 thin-scroll-bar shadow-2xl " +
      className
    ).trim()}
  >
    {children}
  </div>
);

const Table = ({ className = "", children }) => (
  <table className={("border-0 " + className).trim()}>{children}</table>
);

const TableHeader = ({ className = "", children }) => (
  <thead className={("border-0 bg-tc-blue text-white " + className).trim()}>
    {children}
  </thead>
);

const TableBody = ({ className = "", children }) => (
  <tbody className={("border-0 " + className).trim()}>{children}</tbody>
);

const TableRow = ({ className = "", children }) => (
  <tr
    className={(
      "border-0 [&_th:first-child]:border-l-0 [&_th]:border-t-0 [&_th:last-child]:border-e-0 [&_td:first-child]:border-l-0 [&_td:last-child]:border-e-0 " +
      className
    ).trim()}
  >
    {children}
  </tr>
);

const TableHead = ({ className = "", children }) => (
  <th
    className={("border-slate-500 text-nowrap p-2 border " + className).trim()}
  >
    {children}
  </th>
);

const TableCell = ({ className = "", children }) => (
  <td
    className={("border-slate-500 text-nowrap p-2 border " + className).trim()}
  >
    {children}
  </td>
);

export {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
};
