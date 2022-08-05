import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Product } from '@src/shared/interfaces/product.interface';

import NumberFormat from 'react-number-format';

interface Props {
  product: Product;
}

// interface Rows {
//   [key: string]: string | number | boolean;
// }

const ProductDescriptiveTable = ({ product }: Props) => {
  const [rows, setRows] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    setRows(
      new Map([
        ['Name', product.name],
        [
          'Price',
          <NumberFormat
            value={product.price}
            prefix="$"
            fixedDecimalScale
            decimalScale={2}
            thousandSeparator
            displayType="text"
          />,
        ],
        ['Description', product.longDesc],
        ['Color', product.color.value],
        ['CPU', product.specifications.cpu],
        ['GPU', product.specifications.gpu],
        ['RAM', product.specifications.ram],
        ['Storage', product.specifications.storage],
        ['Size', product.specifications.size],
        ['Release Date', product.releaseDate],
      ])
    );
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {[...rows.keys()].map(rowKey => (
            <TableRow
              key={rowKey}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {rowKey}
              </TableCell>
              <TableCell>{rows.get(rowKey)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductDescriptiveTable;
