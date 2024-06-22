import mongoose from "mongoose";

const connectToDB = async () => {
    const url = process.env.DATABASE_URL;

    mongoose.connect(url)
        .then(() => console.log('Database connected successfully'))
        .catch(error => console.log(error))
}

export default connectToDB;

