const express=require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const {v4:uuid}=require('uuid'); 

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

let comments=[
    {   
        id:uuid(),
        username: "Tod",
        comment:'Nime dedign sholoq'
    },
    {   
        id:uuid(),
        username: "Mod",
        comment:'Nime dedign sholoq'
    },
    {   
        id:uuid(),
        username: "Kod",
        comment:'Nime dedign sholoq'
    },
    {   
        id:uuid(),
        username: "Not",
        comment:'Nime dedign sholoq'
    },
    {   
        id:uuid(),
        username: "Gosos",
        comment:'Nime dedign sholoq'
    }
]

app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments});
})

app.get('/comments/new',(req,res)=>{
    res.render('comments/new');
})

app.post('/comments',(req,res)=>{
    const {username,comment}=req.body;
    comments.push({username,comment,id:uuid()});
    res.redirect('/comments');
})

app.get('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const comment = comments.find(c => c.id===id);
    res.render('comments/show',{comment});
})

app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params;
    const comment = comments.find(c => c.id===id);
    res.render('comments/edit',{comment});
})

app.patch('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const newCommentText=req.body.comment;
    const foundComment = comments.find(c => c.id===id);
    foundComment.comment=newCommentText;
    res.redirect('/comments');
})

app.delete('/comments/:id',(req,res)=>{
    const {id}=req.params;
    comments = comments.filter(c=> c.id!==id);
    res.redirect('/comments');
})

app.get('/tacos',(req,res)=>{
    res.send('tacos');
})

app.post('/tacos',(req,res)=>{
    console.log(req.body);
    res.send('post route');
})

app.listen(3000,()=>{
    console.log('Listening on port 3000');
})