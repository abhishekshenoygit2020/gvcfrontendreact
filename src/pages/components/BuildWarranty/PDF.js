import React, { useRef,useState, useEffect  } from "react";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import ReactDOMServer from "react-dom/server";
import PDFPrint from "./PDFPrint";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

// Attach the pdf fonts to pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PDFgen = () => {
  const contentRef = useRef();
  const { state } = useLocation();
  // const { data, type } = state;

  useEffect(() => {
    // generatePdf();
  },[]);




  const generatePdf = () => {
    const componentHtml = ReactDOMServer.renderToStaticMarkup(<PDFPrint />);
    const pdfContent = htmlToPdfmake(componentHtml);
  
    const docDefinition = {
      content: [
        {
          table: {
            widths: ["50%", "50%"], // Define column widths
            body: [
              [{ text: "First Column Spanning Rows", rowSpan: 6, border: [true, true, true, true] }, { text: "Application ID: 2409136013", border: [true, true, true, true] }],
              ["", { text: "Application ID: 2409136013", border: [true, true, true, true] }],
              ["", { text: "Application ID: 2409136013", border: [true, true, true, true] }],
              ["", { text: "Application ID: 2409136013", border: [true, true, true, true] }],
              ["", { text: "Application ID: 2409136013", border: [true, true, true, true] }],
              ["", { text: "Application ID: 2409136013", border: [true, true, true, true] }],
            ],
          },
          table: {
            widths: ["50%", "50%"], // Define column widths
            body: [
              [{ text: "First Column Spanning Rows", rowSpan: 6, border: [true, true, true, true] }, { text: "Application ID: 2409136013", border: [true, true, true, true] }],
              ["", { text: "Application ID: 2409136013", border: [true, true, true, true] }],
              ["", { text: "Application ID: 2409136013", border: [true, true, true, true] }],
              ["", { text: "Application ID: 2409136013", border: [true, true, true, true] }],
              ["", { text: "Application ID: 2409136013", border: [true, true, true, true] }],
              ["", { text: "Application ID: 2409136013", border: [true, true, true, true] }],
            ],
          },
        },
      ],
    };
  
    // Generate the PDF and open it in a new tab
    pdfMake.createPdf(docDefinition).open();
  };

  return (
    <div>
      <div ref={contentRef} style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
        <h1>Hello, this is a PDF document</h1>
        <p>This content will be rendered as a PDF.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
};

export default PDFgen;
