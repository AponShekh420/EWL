export const getReviewsStatusColor = (status: string) => {
  if (status.toLowerCase() === "rejected") {
    return "text-red-500";
  } else if (status.toLowerCase() === "approved") {
    return "text-green-500";
  } else {
    return "";
  }
};
export const getOrderStatusColor = (status: string) => {
  if (status.toLowerCase() === "cancelled") {
    return "text-red-500";
  } else if (status.toLowerCase() === "completed") {
    return "text-green-500";
  } else if (status.toLowerCase() === "refunded") {
    return "text-yellow-500";
  } else {
    return "";
  }
};
export const getProductStatusColor = (status: string) => {
  if (status.toLowerCase() === "draft") {
    return "text-red-500";
  } else if (status.toLowerCase() === "publish") {
    return "text-green-500";
  } else {
    return "";
  }
};
export const getUserRoleColor = (status: string) => {
  if (status.toLowerCase() === "admin") {
    return "text-green-500";
  } else if (status.toLowerCase() === "customer") {
    return "text-blue-500";
  } else if (status.toLowerCase() === "speaker") {
    return "text-yellow-500";
  } else {
    return "text-red-500";
  }
};
