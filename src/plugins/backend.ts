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

export interface HardwareBackend {
  id: number;
  name: string;
  serialnumber: string;
  devicetype: string;
  offlinearchive: number,
  state: string;
}

export interface UserBackend {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export class Software {
  public id: number | null = null;
  public name: string | null = null;
  public producer: string | null = null;
  public licenseId: string | null = null;
  public licenseKey: string | null = null;
  public numberLicenses: number | null = null;
  public state: string | null = null;
  public expiryDate: Date | null = null;
  public offlineArchive: number | null = null;
  public createdAt: Date | null = null;
}