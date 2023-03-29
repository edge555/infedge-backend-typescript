interface iUserBody {
    id: number;
    username: string;
    name: string;
    email: string;
    role?: number;
    lastModifierId: number;
    lastModificationTime: Date;
    passwordLastModificationTime: Date;
    token?:string
}
export default iUserBody;