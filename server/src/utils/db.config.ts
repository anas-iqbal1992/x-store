import { Console } from "console";
import mongoose from "mongoose";
const url:any = process.env.MONGODB
mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
});

export = mongoose.connection