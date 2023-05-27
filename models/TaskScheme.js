const { Schema, model } = require("mongoose");

const TaskScheme = Schema(
   {
      title: {
         type: String,
         required: true,
      },
      user: {
         type: Schema.Types.ObjectId,
         ref: "Usuario",
      },
   },
   {
      toJSON: {
         virtuals: true,
      },
      toObject: {
         virtuals: true,
      },
   }
);


TaskScheme.method("toJSON", function(){
	const{_v,_id, ...object}=this.toObject();
   Object.id = _id;
   return object;
});

module.exports = model("task", TaskScheme);
