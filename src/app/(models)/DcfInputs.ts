import mongoose, { Schema, Document } from 'mongoose';

export interface IInput extends Document {
    data: any;
}

const dcfInputSchema: Schema = new Schema({
    data: {
        type: Schema.Types.Mixed,
        required: true,
    },
});


const DCFInput = mongoose.models.dcf_inputs || mongoose.model<IInput>('dcf_inputs', dcfInputSchema); // This is also a singleton so need to check if exists first
export default DCFInput;