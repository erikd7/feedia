//Type for the JSON config structure
type AppConfig = {
  ui: {
    host: string;
    routes: {
      login: string;
    };
    queryParams: {
      authError: string;
    };
  };
  auth: {
    google: {
      callbackRoute: string;
    };
  };
};

export default AppConfig;
