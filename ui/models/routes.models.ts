export const Routes = {
  HOME: {

    path: "/",
    name: "Home"
  },
  PROPERTIES: {
    path: "/properties",
    name: "Properties"
  },
  USERS: {
    path: "/users",
    name: "Users"
  }
}

export interface Route {
  path: string,
  name: string
}