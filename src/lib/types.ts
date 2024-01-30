export type User = {
  id: string;
  email: string;
  name: string;
  photo?: string;
  bio?: string;
};

export function validateUser(data: any): data is User {
  const idIsString = typeof data.id === "string";
  const emailIsString = typeof data.email === "string";
  const nameIsString = typeof data.name === "string";

  return idIsString && emailIsString && nameIsString;
}
