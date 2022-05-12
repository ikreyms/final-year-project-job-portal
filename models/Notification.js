const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    receivers: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
      required: [true, "Please provide the receivers of this notification."],
    },
    subject: {
      type: String,
      required: [true, "Please provide the subject of the notification."],
    },
    body: {
      type: String,
      required: [true, "Please provide some details of the notification."],
    },
    postedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Employer",
    },
    status: {
      type: String,
      enum: {
        values: ["Read", "Unread"],
      },
      default: "Unread",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = new mongoose.model("Notification", notificationSchema);
