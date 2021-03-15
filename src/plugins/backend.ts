
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

export interface Document {
  id: number;
  filename: string;
  mime: string;
  static_file: string;
  tags: string;
}

export interface Barcode {
  id: number;
  code: string;
  format: string;
  label: string;
}

export interface File {
  id: number;
  description: string;
  filename: string;
  mime: string;
  static_filename: string;
}