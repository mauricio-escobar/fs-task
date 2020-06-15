import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  table {
    color: ${({ theme }) => theme.table_color} !important;
  }
  .list-preview {
    border: ${({ theme }) => theme.list_preview_border} !important;
  }
  .list-preview-header {
    border-bottom: ${({theme}) => theme.list_preview_header_bottom} !important;
  }
  .list-active {
    background-color: ${({theme}) => theme.list_active_back};
    border-color: ${({theme}) => theme.list_active_border};
  }
  `
