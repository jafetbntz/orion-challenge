export interface ICustomer {
    id: number;
    name: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    email?: string | null;
}