import MyNotification from "./myNotification";

export const servicesControl = (response, update) => {
  const { isSuccess, resultMessage } = response.data;
  if (isSuccess === true) {
    if (update === true) {
      if (Array.isArray(resultMessage) && resultMessage.length > 0) {
        MyNotification("success", resultMessage[0]);
      } else if (typeof resultMessage === "string") {
        MyNotification("success", resultMessage);
      }
    }
    return response;
  } else {
    errorHandler(resultMessage);
    return {
      data: {
        ...response.data,
        resultSet: [],
      },
    };
  }
};

export const getToken = () => {
  const token = sessionStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const errorHandler = (error, code = null) => {
  console.log("code", error);
  if (code === null) {
    if (error === "Request failed with status code 401") {
      MyNotification("error", "token süresi doldu çıkış yap");
    }

    // if (Array.isArray(error)) {
    //   error.forEach(MyNotification("error", err));
    // } else if (typeof error === "string") {
    //   MyNotification("error", error);
    // }
  }
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(price.toFixed(2));
};
