const express = require("express");
const app = express();

app.use("/api/posts", (req, res) => {
  const posts = [
    {
      id: "sadasdsadas222",
      title: "Fir server-side Post",
      content: "This is coming from the server side",
    },
  ];
  return res
    .status(200)
    .res.json({ message: "Post fetched successfully", posts: posts });
});
module.exports = app;
