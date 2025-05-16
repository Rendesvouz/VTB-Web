export const getStatusStyles = (status) => {
  switch (status) {
    case "request":
      return {
        bgClass: "bg-yellow-100",
        textClass: "text-yellow-800",
        label: "Pending",
      };
    case "scheduled":
      return {
        bgClass: "bg-green-100",
        textClass: "text-green-800",
        label: "Accepted",
      };
    case "declined":
    default:
      return {
        bgClass: "bg-red-100",
        textClass: "text-red-800",
        label: "Declined",
      };
  }
};

export const getAvailabilityStyles = (status) => {
  switch (status) {
    case "available":
      return {
        bgClass: "bg-green-100",
        textClass: "text-green-800",
        label: "Available",
      };
    case "unavailable":
    default:
      return {
        bgClass: "bg-red-100",
        textClass: "text-red-800",
        label: "Unavailable",
      };
  }
};
