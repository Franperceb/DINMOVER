const url = `${process.env.API_URL}/api/properties/`;

export const getProperties = async () => {
  return (await fetch(url, { method: 'GET' })).json();
};

export const getProperty = async (id: string) => {
  return (await fetch(`${url}/${id}`, { method: 'POST' })).json();
};
export const updateProperty = async (id: string) => {
  return (await fetch(`${url}/${id}`, { method: 'PUT' })).json();
};
export const deleteProperty = async (id: string) => {
  return (await fetch(`${url}/${id}`, { method: 'DELETE' })).json();
};


