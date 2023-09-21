type UrlBuilder = (
  host: string,
  routes?: Array<string>,
  queryParams?: object
) => string;

const urlBuilder: UrlBuilder = (host, routes = [], queryParams = {}) => {
  let url = host;

  //Add routes
  url += routes.join("/").replace("//", "/");

  //Add query params
  if (Object.keys(queryParams).length > 0) {
    url += "?";
    url += Object.entries(queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }

  return url;
};

export default urlBuilder;
