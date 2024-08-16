export const testPostController =(req,res)=>{
    const {name} = req.body
    res.status(200).send(`Yourrr nameee is ${name}`)
}

