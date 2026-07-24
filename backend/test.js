import mongoose from "mongoose";

const uri =
  "mongodb+srv://vedikamamidwar5:vedikamamidwar5@social-media-platform.h5imtcc.mongodb.net/?retryWrites=true&w=majority&appName=social-media-platform";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });