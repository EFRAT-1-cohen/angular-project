export class AuthModel {
    name: string;
    email: string;
    password: string;
}
export class UserModel {
    id: number;
    name: string;
    email: string;
    role: string;
}
export class AuthLoginModel {
    email: string;
    password: string;
}
export class AuthResponseModel {
    token: string;
    user: UserModel;
}