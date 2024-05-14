export interface SessionShape {
  accessToken: string;
  user: UserShape;
}

export interface UserShape {
  email: string;
  id: number;
}

export interface FormDataShape {
  email: string;
  password: string;
}

export interface AppointmentsShape {
  name: string;
  date: string;
  id: number;
  status: string;
}
