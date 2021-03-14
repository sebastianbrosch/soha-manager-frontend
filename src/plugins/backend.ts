
export interface Software {
  id: number;
  name: string;
  units: number;
  offlinearchive: number;
  state: string;
}

export interface Hardware {
  id: number;
  name: string;
  serialnumber: string;
  devicetype: string;
  offlinearchive: number,
  state: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}