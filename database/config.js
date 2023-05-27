const mongoose = require("mongoose");

const dbConection = async () => {
   try {
      mongoose.connect(process.env.DB_CONNECTION, {
         autoIndex: true,
      });
      console.log("DB Online");
   } catch (error) {
      console.log(error);
      throw new Error("Error al conenctar en DB");
   }
};
module.exports = { dbConection };
