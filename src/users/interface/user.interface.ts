import { Document } from 'mongoose';

export interface UserInterface extends Document{
    readonly first_name: string;
    readonly last_name: string;
    readonly full_name: string;
    readonly email: string;
}