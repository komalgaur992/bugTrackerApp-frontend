const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function fetchBugs() {
  const response = await fetch(`${backendUrl}/api/bugs`);
  const data = await response.json();
  return data;
}
