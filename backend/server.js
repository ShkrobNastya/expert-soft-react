const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const cors = require('cors');
const BlogsModel = require('./models/blogs');

const db = "mongodb+srv://nastya:root@cluster0.pmzuq.mongodb.net/dojo-blog?retryWrites=true&w=majority";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));


const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(router);

router.get('/', async function(req, res) {
  const blogs = await BlogsModel.find();
  if (blogs) {
    res.send(blogs);
} else {
    res.status(404).send({ message: 'Blog is not found' });
}
});

router.get('/blogs/:id', async function(req, res) {
  const blogs = await BlogsModel.findById(req.params.id);
  if (blogs) {
    res.send(blogs);
} else {
    res.status(404).send({ message: 'Blog is not found' });
}
});

router.delete('/blogs/:id', async function(req, res) {
  const blogs = await BlogsModel.findById(req.params.id);
  if (blogs) {
      await blogs.remove();
      res.send({ message: 'Blog is deleted' })
  } else {
      res.send({ message: 'Error' })
  }

});

router.post('/create', async function(req, res){
  if (!req.body) {
      return res.sendStatus(404);
  } else {
      const blogs = new BlogsModel({
          title: req.body.title,
          body: req.body.body,
          author: req.body.author,
      })
      blogs.save();
      res.status(201).send({ message: "Blog is created"});
  }
});

router.put('/update/:id', async function (req, res) {
  const blogs = await BlogsModel.findById(req.params.id);
  if (blogs) {
    blogs.title = req.body.title;
    blogs.body = req.body.body;
    blogs.author = req.body.author
  };

  const newBlogs = await blogs.save();
  if (newBlogs) {
      return res.status(200).send({ message: 'Blog is updated'});
  }
  return res.status(500).send({ message: 'Error' });
});

app.listen(8000, () => {
  console.log("Server is running");
});

module.exports = app;