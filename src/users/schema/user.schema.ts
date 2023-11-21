import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class User{
    
    @Prop({type: String, required: true})
    first_name: string;

    @Prop({type: String, required: true})
    last_name: string;

    @Prop({type: String, required: true})
    full_name: string;

    @Prop({type: String, required: true})
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
