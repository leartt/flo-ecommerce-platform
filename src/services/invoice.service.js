const PdfPrinter = require("pdfmake");
const fs = require("fs");
const currency = require("currency.js");

const fonts = {
  Courier: {
    normal: "Courier",
    bold: "Courier-Bold",
    italics: "Courier-Oblique",
    bolditalics: "Courier-BoldOblique",
  },
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};

const printer = new PdfPrinter(fonts);

const generateInvDataColumnContent = (text) => {
  return {
    width: "auto",
    text,
  };
};

const getPdfDocBufferData = (doc, cb) => {
  const chunks = [];

  doc.on("data", (data) => {
    chunks.push(data);
  });

  doc.on("end", () => {
    const bufferData = Buffer.concat(chunks);
    const result = Buffer.from(bufferData).toString("base64");

    cb(null, result);
  });

  doc.end();
};

const generateInvoice = (order) => {
  const docDefinition = {
    defaultStyle: {
      font: "Helvetica",
    },
    header: {
      columns: [
        { text: "FLODEV Ecommerce", alignment: "left" },
        {
          stack: [
            { text: "Flodev Inc.", alignment: "right" },
            { text: "Rr. Mbreti Pirro, No. 9", alignment: "right" },
            { text: "Peje, Kosove 30000", alignment: "right" },
          ],
        },
      ],
      margin: [50, 5, 50, 5],
    },
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: "INVOICE",
                bold: true,
                margin: [10, 10],
                fontSize: 15,
              },
              {
                columns: [
                  generateInvDataColumnContent("Invoice Number:"),
                  generateInvDataColumnContent(order.orderNumber),
                ],
                margin: [10, 5],
                columnGap: 5,
              },
              {
                columns: [
                  generateInvDataColumnContent("Amount Due:"),
                  generateInvDataColumnContent(
                    currency(order.totalPrice, {
                      fromCents: true,
                    }).format()
                  ),
                ],
                margin: [10, 5],
                columnGap: 5,
              },
              {
                columns: [
                  generateInvDataColumnContent("Invoide Date:"),
                  generateInvDataColumnContent(order.createdAt.split("T")[0]),
                ],
                margin: [10, 5],
                columnGap: 5,
              },
            ],
          },
          {
            stack: [
              { text: "Delivery address", width: "*", margin: [0, 16, 0, 10] },
              generateInvDataColumnContent(order.shippingAddress.customerName),
              generateInvDataColumnContent(order.shippingAddress.line1),
              generateInvDataColumnContent(
                `${order.shippingAddress.city}, ${order.shippingAddress.country}`
              ),
              generateInvDataColumnContent(order.postalCode),
            ],
            margin: [10, 10],
          },
        ],
        margin: [0, 50],
      },
      {
        layout: "headerLineOnly", // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          heights: 15,
          widths: ["*", "auto", "auto", "auto"],

          // body: productTableBody,

          body: [
            [
              { text: "Product Name", style: "filledHeader" },
              { text: "Unit Price", style: "filledHeader" },
              { text: "Quantity", style: "filledHeader" },
              { text: "Amount", style: "filledHeader" },
            ],
            ...order.products.map((product) => [
              product.name,
              currency(product.price).format(),
              product.quantity,
              currency(product.price).multiply(product.quantity).format(),
            ]),
          ],
        },
        margin: [10, 50],
      },
      {
        columns: [
          {},
          {
            stack: [
              {
                columns: [
                  { text: "Subtotal", alignment: "right" },
                  {
                    text: currency(order.subtotal, {
                      fromCents: true,
                    }).format(),
                    alignment: "right",
                  },
                ],
              },
              {
                columns: [
                  { text: "Discount", alignment: "right" },
                  {
                    text: currency(order.discount?.value || 0, {
                      fromCents: true,
                    }).format(),
                    alignment: "right",
                  },
                ],
              },
              {
                columns: [
                  {
                    text: "Total",
                    bold: true,
                    alignment: "right",
                  },
                  {
                    text: currency(order.totalPrice, {
                      fromCents: true,
                    }).format(),
                    bold: true,
                    alignment: "right",
                  },
                ],
              },
            ],
            margin: [20, 10],
          },
        ],
        // margin: [50, 5, 50, 5],
      },
    ],
    footer: {
      text: "Invoice powered by Flodev.",
      alignment: "center",
    },
    styles: {
      filledHeader: {
        bold: true,
        fillColor: "#ebebeb",
      },
    },
  };

  const options = {
    // ...
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition, options);

  return new Promise((resolve, reject) => {
    getPdfDocBufferData(pdfDoc, (err, data) => {
      if (err) {
        reject(err);
      }
      console.log(data);
      resolve(data);
    });
  });
};

module.exports = { generateInvoice };
