interface ISearchParamsSSO {
  searchParams: {
    sso: string;
    sig: string;
  };
}

const page = ({ searchParams }: ISearchParamsSSO) => {
  const decodedPayload = atob(searchParams.sso);
  const params: {
    [key: string]: string;
  } = {};
  decodedPayload.split("&").forEach(function (param) {
    var keyValue = param.split("=");
    var key = decodeURIComponent(keyValue[0]);
    var value = decodeURIComponent(keyValue[1] || "");
    params[key] = value;
  });
  console.log(params);

  return <div>Login success page</div>;
};

export default page;
