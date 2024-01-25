const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = dateString.split("T")[0];

  return date;
};

export default formatDate;
