import React from 'react';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

export const getMuiTheme = () =>
createMuiTheme({
  overrides: {
    MUIDataTableHeadCell: {
      fixedHeaderOptions: {
        backgroundColor: `blue !important`,
      },
    },
    MUIDataTableHead: {
      root: {
        backgroundColor: `#1D252D !important`,
      },
    },
    MUIDataTableBodyRow: {
      root: {
        "&:nth-child(odd)": {
          backgroundColor: "#e3e9ed",
          data: {
            whiteSpace: "nowrap",
          },
        },
      },
    },
    MuiTableCell: {
      root: {
        padding: "3px 3px 0 0",
      },
      body: {
        fontSize: "12px",
        textAlign: "left",
      },
    },

    MUIDataTableSelectCell: {
      headerCell: {
        backgroundColor: "white",
      },
      checked: `lightcoral !important`,
    },
    MUIDataTablePagination: {
      root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      },
      caption: {
        fontSize: 12,
      },
    },
  },
});