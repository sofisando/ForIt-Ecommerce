export interface AuthService {
    login: (email : string) =>Promise<void>;
}



// export interface AuthService {
//     hashPassword(password: string): Promise<string>;
//     comparePassword(
//         plainPassword: string,
//         hashedPassword: string
//     ): Promise<boolean>;
// }