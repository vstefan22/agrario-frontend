import { FlurstuckType } from '../types/flurstuck-types';

export const filterData = (
  items: FlurstuckType[],
  searchValue: string
): FlurstuckType[] => {
  if (!searchValue) return items;

  return items.filter((item) =>
    item.state.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export const sortData = (
  items: FlurstuckType[],
  sortOption: string | null
): FlurstuckType[] => {
  if (!sortOption) return items;

  switch (sortOption) {
    case 'Sortieren nach Eignung':
      return [...items].sort((a, b) => a.registry.localeCompare(b.registry));
    case 'Sortieren nach Bundesland':
      return [...items].sort((a, b) => a.state.localeCompare(b.state));
    case 'Sortieren nach Größe':
      return [...items].sort((a, b) => a.size - b.size);
    case 'Sortieren nach PLZ':
      return [...items].sort((a, b) => a.plz - b.plz);
    default:
      return items;
  }
};
