const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');

const app = express();

const PORT = 5003;

mongoose.connect("mongodb+srv://simranjeet96mail:ntLdwoBtbFBlGmsF@cluster0.ka7bf.mongodb.net/BMS?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB connected"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(express.urlencoded());
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});