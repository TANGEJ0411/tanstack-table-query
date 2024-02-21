import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import {
  createColumnHelper, // 幫忙製作表格列的工具
  flexRender, // 其實就是 flex box
  getCoreRowModel, // 取得行的資料來渲染新表格
  useReactTable, // 使用此 Hook 來掌握表格
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
    columnHelper.accessor("id", {
      header: "Hotel ID",
    }),
    columnHelper.accessor("company_name", {
      header: "Hotel Name",
    }),
    columnHelper.accessor("address", {
      header: "Address",
    }),
    columnHelper.accessor("stars", {
      header: "Stars",
    }),
    columnHelper.accessor("region", {
      header: "Region",
    }),
    columnHelper.accessor("area", {
      header: "Area",
    }),
    // columnHelper.accessor("id"),
    // columnHelper.accessor("company_name"),
    // columnHelper.accessor("address"),
    // columnHelper.accessor("stars"),
    // columnHelper.accessor("region"),
    // columnHelper.accessor("area"),
  ];

  const table = useReactTable({
    data, // 輸入表格的資料
    columns, // 輸入定義好的表頭
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
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
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
