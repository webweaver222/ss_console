const updateHistory = (list, newItem, idx) => {
  if (list.length === 0)
    return [
      {
        id: 0,
        ...newItem,
      },
    ];

  if (newItem === "remove") {
    return [...list.slice(0, idx), ...list.slice(idx + 1)];
  }

  /*if (typeof idx === "number") {
      return [...list.slice(0, idx), newAdress, ...list.slice(idx + 1)];
    }*/

  return [
    {
      id: Math.max(...list.map((p) => p.id), 0) + 1,
      ...newItem,
    },
    ...list,
  ];
};

export { updateHistory };
