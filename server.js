const express = require("express");
const connectDB = require("./config/db")
const cors = require('cors')
const app = express();
const session = require('express-session')

//connect DB
connectDB()


var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/dashboard_session_unindexed',
    collection: 'mySessions'
  });
   
  // Catch errors
  store.on('error', function(error) {
    console.log(error);
  });
   
  app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
    cookie: { path: '/' },
  }));





//init middleware
//as body parser includedin expreess we dont need bodyParser.json()
app.use(express.json({extended:false}) )
app.use(cors())
const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("API Running");
})

// //Define Routes
app.use('/api/users',require('./routes/api/users'))





app.listen(port,()=>{
    console.log(`App started running at ${port}`)
})

