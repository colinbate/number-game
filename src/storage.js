export function save(key, value) {
  if (value === undefined) {
    value = null;
  }
  localStorage.setItem(key, JSON.stringify(value));
}

export function load(key) {
  const stored = localStorage.getItem(key) || 'null';
  return JSON.parse(stored);
}
