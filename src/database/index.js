import mongoose from "mongoose";

const connectToDB = async () => {
    const url = 'mongodb+srv://ignatov23:ivhClUBCJlpGG3iU@cluster0.ly7fzwi.mongodb.net/';

    mongoose.connect(url)
        .then(() => console.log('Database connected successfully'))
        .catch(error => console.log(error))
}

export default connectToDB;

