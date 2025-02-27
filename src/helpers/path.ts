export function getPath(path?: string | Array<string>): Array<string> {
  if (Array.isArray(path)) {
    return path;
  }
  if (!path || !path.length) {
    return [];
  }

  return path.split(/[.\[\]]/).filter((item) => item.length > 0);
}
