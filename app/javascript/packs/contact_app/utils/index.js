export const normalizeString = (str) => {
  if(!str) return '';
  return str.toLowerCase().replace(/\s|\(|\)|-|\./g,'');
}
