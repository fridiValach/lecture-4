const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: {
    type: String,
    validate: {
      validator: mail => mail.includes("@"),//פונקצית אימות
      message: props => props.value + "is not an email",//פונקציה שמגדירה הודעת שגיאה במקרה והאימות נכשל
    },
    //   validate:mail=>mail.includes("@")-אופציה נוספת לפונקצית אימות ללא הודעת שגיאה
    uppercase: true//הפיכת הערך המתקבל לאותיות גדולות
    
  },
  address: {
    type: AddressSchema,
    required: [true, "no address"],
    minlength: 10,
    default: "no afddress",
  },
  bestFriend: mongoose.SchemaTypes.ObjectId,
});

module.exports = mongoose.model("User", UserSchema);
