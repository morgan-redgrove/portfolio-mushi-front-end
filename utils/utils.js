exports.addMonthsToGraph = (months) => {
  const graphData = [
    { value: 0, label: "Jan" },
    { value: 0, label: "Feb" },
    { value: 0, label: "Mar" },
    { value: 0, label: "Apr" },
    { value: 0, label: "May" },
    { value: 0, label: "Jun" },
    { value: 0, label: "Jul" },
    { value: 0, label: "Aug" },
    { value: 0, label: "Sep" },
    { value: 0, label: "Oct" },
    { value: 0, label: "Nov" },
    { value: 0, label: "Dec" },
  ];

  return graphData.map((graphDatum) => {
    if (months.includes(graphDatum.label)) {
      return { value: 1, label: graphDatum.label };
    }
    return graphDatum;
  });
};
