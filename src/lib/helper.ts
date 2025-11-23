export function getImageUrl(path?: string): string | undefined {
  if (!path) return undefined;
  const cleaned = path.replace(/\\/g, "/");
  const fileName = cleaned.split("/").pop();

  if (!fileName) return undefined;
  return `${import.meta.env.VITE_File_Url}/${fileName}`;
}
