require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const multer = require("multer");
const cors = require("cors");
 const app = express();
app.use(cors()); 
app.use(express.json()); 
const storage = multer.memoryStorage();
const upload = multer({ storage });
console.log("ENV VALUE:", process.env.MONGODB_URI);
let client;
let db;
  
async function startServer() {
  try {
     client = new MongoClient(process.env.MONGODB_URI, { maxPoolSize: 5,});
    await client.connect();
    db = client.db("complaint");
    console.log("✅ MongoDB connected");
    const User = db.collection("user");
    const Us = db.collection("Us"); 
    const Ad = db.collection("admin");
    const msg  = db.collection("msg"); 
     app.post("/upload", upload.single("image"), async (req, res) => {
      try {
        const file = req.file;
        const { _id,  userEmail,  userName,name, branch, complaint,  des,  location,  img, mobile,} = req.body;

         if (_id && ObjectId.isValid(_id)) {
          const existing = await User.findOne({ _id: new ObjectId(_id),  userEmail,  userName, });

          if (existing) {
            const updateData = {  name,  branch,  complaint,  des,  location,  mobile,};

            if (file) {
              updateData.image = file.buffer.toString("base64");
            }
 
            await User.updateOne({ _id: new ObjectId(_id) }, { $set: updateData });
            return res.json({ success: true, updated: true });
          }
        }

         if (!file) {
          return res.status(400).json({ error: "Image required" });
        }

        await User.insertOne({ userEmail, userName, name, branch,  complaint,  des,  location,   img,  mobile, status: "Pending",  image: file.buffer.toString("base64"),  noti: [],  uploadedAt: new Date(),});

        res.json({ok: true, inserted: true });
      } catch (err) {
        console.error("UPLOAD ERROR:", err);
        res.json({ok:false});
      }
    }); 

     app.get("/users", async (req, res) => {
      const { email } = req.query;
      if (!email) return res.status(400).json({ error: "Email required" });

      const users = await User.find({ userEmail: email }).toArray();
      res.json(users);
    });

     app.post("/create", upload.none(), async (req, res) => {
      const { email, userName, name, img, issue, branch, id } = req.body;

      const found = await Us.findOne({ email, userName, branch, id });

      if (found) { await Us.updateOne( { _id: found._id }, { $push: { issue } });
        return res.json({ updated: true });
      }

      await Us.insertOne({email,userName,  name,  img,  branch,  id,  issue: [issue],  createdAt: new Date(), });

      res.json({ inserted: true });
    });

     app.get("/use", async (req, res) => {
      const data = await Us.find({}).toArray();
      res.json(data);
    });

     app.post("/load", upload.none(), async (req, res) => {
      const { userEmail, userName, _id, noti } = req.body;

      if (!_id || !ObjectId.isValid(_id)) {
        return res.json({ success: false });
      }

      await User.updateOne( { _id: new ObjectId(_id), userEmail, userName },  { $push: { noti } });

      res.json({ success: true });
    });

     app.post("/admin", upload.none(), async (req, res) => {
      const { userEmail, userName, resp, branch, id } = req.body;

      const found = await Ad.findOne({ userEmail, userName, branch, id });

      if (found) {
        await Ad.updateOne({ _id: found._id },{ $push: { resp } });
        return res.json({ updated: true });
      }

      await Ad.insertOne({ userEmail, userName, branch, id, resp: [resp], createdAt: new Date(),});

      res.json({ inserted: true });
    });

     app.get("/adm", async (req, res) => {
      const data = await User.find({}).toArray();
      res.json(data);
    });

    app.get("/am", async (req, res) => {
      const data = await Ad.find({}).toArray();
      res.json(data);
    });
app.post("/chstatus",async(req,res)=>{
  console.log("fuck...",req.body)
  let data = await User.findOne({userEmail:req.body.email,des:req.body.des,mobile:req.body.mob})
  if(data){ 
    await User.updateOne({_id:data._id},{$set:{status:req.body.status}});
    await msg.insertOne({name:req.body.name,email:req.body.email,mobile:req.body.mob,complaint:req.body.complaint,des:req.body.des,status:req.body.status === "In Progress"? `👋 Your complaint is now In Progress. Our admin is reviewing it.`: `🥳 Your complaint has been ${req.body.status}.`,complaintId:data._id,uploaded:req.body.date})
    return res.send({ok:true})
  }
      return res.send({ok:false});
})
app.post("/msg",async(req,res)=>{
  try{
let data = await msg.find({email:req.body.email}).toArray();
 return res.send(data)
  }catch(err){ 
res.status(500).json({ok: false,data: []});}})
     app.listen(5000, () =>
      console.log(`Server running on ${process.env.NEXT_PUBLIC_BACKEND}`)
    );
   } catch (err) {
    console.error("SERVER START ERROR:", err);
  }
}

startServer();  