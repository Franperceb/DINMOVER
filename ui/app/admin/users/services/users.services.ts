export const getUsers = async () => {
  const url = `${process.env.API_URL}/api/properties/properties/`;
  return (await fetch(url, { method: 'DELETE' })).json();
};

export const getUserInfo = async (id: string) => {
  const url = `${process.env.API_URL}/api/properties/properties/`;
  return (await fetch(url, { method: 'DELETE' })).json();
};
