export async function fetchData(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    if (data.message) {
      throw new Error(`Error: ${response.status} - ${data.message}`);
    }
    throw new Error(`Error: ${response.status}`);
  }

  return data;
}
