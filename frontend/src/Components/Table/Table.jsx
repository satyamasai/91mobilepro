import React from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import "./Table.css";
const Table = ({ data, getPdf, Delete }) => {
  // console.log(data)

  const handleDownload = (item) => {
    return getPdf(item);
  };

  const handleDelete = (filename) => {
    Delete(filename);
  };
  return (
    <table id="table" className=".table">
      <tr>
        <th>ID</th>
        <th>Image</th>
        <th  className="name_table">
          Name
        </th>
        <th>Download</th>
        <th>Delete</th>
      </tr>

      {data.map((row, index) => (
        <tr key={row.id}>
          <td>{index + 1}</td>
          <td>
            <img
              className="pdf_logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/640px-PDF_file_icon.svg.png"
              alt={row.name}
            />
          </td>
          <td className="name_table">{row}</td>
          <td>
            <Button colorScheme="green" onClick={() => handleDownload(row)}>
              Preview
            </Button>
          </td>
          <td>
            <Button colorScheme="red" onClick={() => handleDelete(row)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default Table;
