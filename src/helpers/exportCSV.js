export const exportToCSV = (data, fileName) => {
  if (!data.length) return;
  const rows = data.map((row) =>
    Object.values(row)
      .map((value) => `"${value}"`)
      .join(","),
  );

  const headers = Object.keys(data[0]).join(",");
  const csvContent = [headers, ...rows].join("\n");

  generateBlob(csvContent, fileName);
};

const generateBlob = (csvContent, fileName) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
