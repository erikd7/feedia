type UrlBuilder = (
  host: string,
  routes?: Array<string>,
  queryParams?: object
) => string;

const urlBuilder: UrlBuilder = (host, routes = [], queryParams = {}) => {
  let url = host;

  //Add routes (replace multiple slashes with one slash)
  const route = routes.join("/").replace(/\/+/g, "/");

  url += route;

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
