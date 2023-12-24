// form send
const fetchRequest = async (method, url, data) => {
  const response = await fetch(url, {
    method: method,
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });

  return await response.text();
};

// menu cards get
const fetchMenuCards = async (url, method) => {
  const response = await fetch(url, {
    method: method,
    headers: { "Content-type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Error request: ${response.status}`);
  }
  return await response.json();
};
export { fetchRequest, fetchMenuCards };
