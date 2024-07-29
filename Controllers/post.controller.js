
require("dotenv").config();



const { PostModel } = require("../models/post.model");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })



// ** Post adding
async function AddPost(req, res) {
   
    try {
        // Multer middleware to handle image upload
        upload.single('image')(req, res, async (err) => {
          if (err) {
            return res.status(400).send({ message: "Error uploading image: " + err.message });
          }
       
          // Access uploaded image data from req.file (if upload was successful)
          const payload = {
            selectedCategory:req.body.selectedCategory,  // Assuming category field is 'category'  // Assuming heading, description, and link fields are 'heading', 'description', and 'link' respectively
            heading:req.body.heading,
            description:req.body.description,
            image: req.file ? req.file.filename : null, // Assuming image field is 'image'
            link:req.body.link
          };
         
        
          const post = new PostModel(payload);
          await post.save();
    
          res.status(201).send({ message: "Post added successfully" }); // Success response
        });
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: "Internal server error" }); // Generic error response
      }
    
  }
  


async function GetPost(req,res){
   
    try{
         let Posts=await PostModel.find();
         res.status(201).send({ status: 200, message: "Fetched Success",Posts})
    }catch(error){
        res.status(400).send({message:error.message})
    }
}





module.exports = {
    AddPost,
    GetPost
}