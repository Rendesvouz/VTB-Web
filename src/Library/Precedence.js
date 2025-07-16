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

export const getEmploymentStyles = (status) => {
  switch (status) {
    case "employed":
      return {
        bgClass: "bg-green-100",
        textClass: "text-green-800",
        label: "Employed",
      };
    case "unemployed":
    default:
      return {
        bgClass: "bg-warning-100",
        textClass: "text-warning-800",
        label: "Unemployed",
      };
  }
};

export const getStatusButtonProps = (
  status,
  Ban,
  CheckCircle,
  Clock,
  RefreshCcw,
  Loader2
) => {
  switch (status) {
    case "verified":
      return {
        label: "Suspend",
        nextStatus: "rejected",
        bgColor: "bg-red-600",
        hoverColor: "hover:bg-red-700",
        Icon: Ban,
      };
    case "pending":
      return {
        label: "Verify",
        nextStatus: "verified",
        bgColor: "bg-green-600",
        hoverColor: "hover:bg-green-700",
        Icon: CheckCircle,
      };
    case "processing":
      return {
        label: "Processing",
        nextStatus: "processing",
        bgColor: "bg-yellow-500",
        hoverColor: "hover:bg-yellow-600",
        Icon: Clock,
      };
    case "rejected":
      return {
        label: "Reverify",
        nextStatus: "verified",
        bgColor: "bg-blue-500",
        hoverColor: "hover:bg-blue-600",
        Icon: RefreshCcw,
      };
    default:
      return {
        label: "Update",
        nextStatus: "verified",
        bgColor: "bg-gray-500",
        hoverColor: "hover:bg-gray-600",
        Icon: Loader2,
      };
  }
};
