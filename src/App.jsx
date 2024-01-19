import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Create a client

const getHotels = async () => {
  const data = await axios.get(
    `https://raw.githubusercontent.com/TANGEJ0411/fakeDB/main/db.json`
  );
  return data.data.hotelaccount;
};

function App() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id"),
    columnHelper.accessor("company_name"),
    columnHelper.accessor("address"),
    columnHelper.accessor("stars"),
    columnHelper.accessor("region"),
    columnHelper.accessor("area"),
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h1>table feat query</h1>
      <table>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
