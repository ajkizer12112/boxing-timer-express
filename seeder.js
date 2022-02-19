const fs = require("fs");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });



const CompletedWorkout = require("./models/CompletedWorkout");




//connect to db
const conn = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});







//read and parse json files and package them as variables.

//EX: 
// const aquariums = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/aquariums.json`, "utf-8")
// );
const completedWorkouts = require("./_data/CompletedWorkouts")




//import into DB  EX: 
// const importData = async () => {
//   try {
//     await Aquarium.create(aquariums);
//     await User.create(users);
//     await Livestock.create(livestock);
//     await Waterchange.create(waterchanges);
//     await Plant.create(plants);
//     console.log("Data imported...");
//     process.exit();
//   } catch (error) {
//     console.error(error);
//   }
// };

const importData = async () => {
    console.log({ completedWorkouts })
    try {
        console.log("Importing data")
        await CompletedWorkout.create(completedWorkouts);
        console.log("imported data.  Exiting")
        setTimeout(() => process.exit(), 1500)
    } catch (error) {
        console.error(error);
    }
}

//delete data

//EX: 
// const deleteData = async () => {
//   try {
//     await Aquarium.deleteMany();
//     await User.deleteMany();
//     await Livestock.deleteMany();
//     await Waterchange.deleteMany();
//     await Plant.deleteMany();
//     await ParameterCheck.deleteMany();
//     console.log("DATA DESTROYED!!!");
//     process.exit();
//   } catch (error) {
//     console.error(error);
//   }
// };


const deleteData = async () => {
    try {
        console.log("deleting data")
        await CompletedWorkout.deleteMany();
        console.log("deleted data.  Exiting")
        setTimeout(() => process.exit(), 1500)
    } catch (error) {
        console.error(error);
    }
}



//enter node seeder -i in the command line to import data, and node seeder -d to delete data.

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}
