const db  = require('../models/');
let data = require('./data'); 

data.forEach((tipData, i)=>{

    let user = new db.User({
        email: tipData.user.email, 
        password: tipData.user.password
    });
   
    user.save();
    
    db.User.find({email: tipData.user.email}, (err, user)=>{
        
       let newTip =  {
                    author: tipData.tip.author,
                   img: tipData.tip.img,
                   city: tipData.tip.city,
                   text: tipData.tip.text,
                   title: tipData.tip.title
       }
       let tip = new db.Tip(newTip);
       tip.save();
    })
});   


db.Tip.find({}, (err, tips)=>{
  console.log(tips);
})

db.User.find({}, (err, users)=>{
    console.log(users);
    process.exit();

})