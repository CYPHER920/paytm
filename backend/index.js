const User = require('./db')
const express = require('express')
const app = express()
const zod = require('zod')

app.use(express.json())

const schema = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
});

app.post('/signup', async (req, res) => {

    const signupdata = schema.safeParse(req.body)
    if (!signupdata.success) {
        return res.status(411).json({
            msg: "incorrect input"
        })
    }
    const existingUser = await User.findOne({
        firstName: req.body.firstname,
        lastName: req.body.lastname
    });
    console.log(existingUser)
    if (existingUser) {
        return res.send(
            {
                msg: "user exists"
            }
        )
    }

    const newUser = new User.create({
        firstName: req.body.firstname,
        lastName: req.body.lastName,
        password: req.body.password
    })

    res.status(200).json({
        msg: "signup successful"
    })
})

app.get('/signin', async (req, res) => {

    const firstname = await User.findOne({ firstName: req.body.firstname, lastName: req.body.lastname });
    if (firstname) {
        res.status(200).json({
            msg: "sign in successfull"
        })
    }
    else {
        res.status(411).json({
            msg: "user id is wrong"
        })
    }
})

app.post('/update', async (req, res) => {

    const flag = User.find({ firstName: req.body.firstname, lastName: req.body.lastname })
    if (flag) {
        await User.updateOne({ firstName: req.body.firstname, lastName: req.body.lastname }, { $set: { firstName: "drake", lastName: "nigga" } })
        res.send({
            msg: "user updated successfully"
        })
    }
    else {
        res.send({
            msg: "User doesn't exist or Invalid"
        })
    }
})

app.listen(3000)
