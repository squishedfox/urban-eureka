/**
 * Should be used to map out the classes that will be applied to various
 * HTML elements
 */
export const classes = Object.freeze({
  input: "border border-gray-800 px-2 py-1 w-full",
  inputGroup: "flex flex-col space-x-1 space-y-1",
  checkbox: "text-lg",
  textarea: "border border-gray-800 w-full min-h-32 px-2 py-1",
  label: "text-sm",
  form: "border border-gray-800 bg-white p-4 space-y-4",
  forms: {
    fieldsets: {
      legend: "font-bold border-b border-b-gray-800",
      default: "p-4 border border-gray-800 space-y-1",
    },
  },
  actions: "w-full flex flex-row-reverse pr-2",
  table: {
    classes: "table-auto",
    thead: "table-header-group border border-gray-800",
    headerRow: "table-row mb-1",
    cellHeader: "table-cell border-r border-r-gray-800 px-2 py-1",
    cell: "table-cell px-2 py-1",
    row: "table-row",
  },
  container: {
    root: "p-4",
    nested: "py-1 px-2 border border-gray-800",
    inline: "inline-flex items-center w-full space-x-1",
  },
  headings: {
    h1: "text-lg border-b border-b-gray-800",
  },
  buttons: {
    link: "px-2 py-1 space-x-1 inline-flex items-center",
  },
});
