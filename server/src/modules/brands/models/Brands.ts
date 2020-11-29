import {
    Document,
    Model,
    model,
    Schema,
  } from "mongoose";
  import {BrandInterface} from "../interfaces/brands";
  export interface BrandI extends BrandInterface,Document{

  }
  const brandSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:Number
    }
  });
  export const Brand: Model<BrandI> = model<BrandI>("Brand", brandSchema);
