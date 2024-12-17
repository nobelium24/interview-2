export interface Admin {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isSuperAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

