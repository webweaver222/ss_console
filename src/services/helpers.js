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

export { validateJSON, destrUrlString, isUnique };
