interface iUserBody {
  id: string;
  username: string;
  name: string;
  email: string;
  role?: number;
  lastModifierId: string;
  lastModificationTime: Date;
  passwordLastModificationTime: Date;
  token?: string;
}
export default iUserBody;
