const validateJSON = (string) => {
  if (!string) return {};
  try {
    return JSON.parse(string);
  } catch (e) {
    return;
  }
};

const isUnique = (history, url, headers, body, method) => {
  url = url.replaceAll(/https?:\/\//g, "");

  for (let i = 0; i < history.length; i++) {
    const item = history[i];
    if (
      item.domain + item.path === url &&
      item.headers === headers &&
      item.request === body &&
      item.method === method
    )
      return false;
  }
  return true;
};

const destrUrlString = (url) => {
  url = url.replaceAll(/https?:\/\//g, "");
  const domain = url.match(/^(.*?)\//)[1]; //before first/
  const path = url.match(/\/(.*?)$/)[0]; //after first/

  return [domain, path];
};

const mockHistory = () => {
  const history = [
    {
      domain: "reqres.in",
      headers: '{"Accept": "*/*", "Content-Type": "application/json"}',
      id: 0,
      method: "GET",
      path: "/api/users",
      request: '{"name" : "alex", "job" : "janitor"}',
      success: true,
      title: "https://reqres.in/api/users",
    },

    {
      domain: "frontend-test-assignment-api.abz.agency",
      headers: '{\n  "Accept": "*/*",\n  "Content-Type": "application/json"\n}',
      id: 1,
      method: "POST",
      path: "/api/v1/users",
      request: "{}",
      success: false,
      title: "https://frontend-test-assignment-api.abz.agency/api/v1/users",
    },
  ];

  localStorage.setItem("history", JSON.stringify(history));
};

export { validateJSON, destrUrlString, isUnique, mockHistory };
