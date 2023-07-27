const router = require('express').Router()
const Workout = require("../models/workoutModel")
const requireAuth = require('../middleware/requireAuth')

// Requuuuire auth for all route
router.use(requireAuth)


// GET all Workout
router.get('/', async(req, res)=>{
    try {
        const wk = await Workout.find({user_id: req.user}).sort({createdAt: -1})
        if(!wk){
            res.status(400).json({error: "No such workout"})
        }
        res.status(200).send(wk)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})


// POST workout
router.post('/', async(req, res)=>{
    try {
        const {title, load, reps} = req.body
        const emptyFields = []

        if(!title) emptyFields.push('title')
        if(!load) emptyFields.push('load')
        if(!reps) emptyFields.push('reps')

        if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all the fields', emptyFields})

        const wk = await Workout.create({...req.body, user_id: req.user})
        res.status(201).send(wk)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

// DELETE Single workout
router.delete('/:id', async(req, res)=>{
    try {
        const wk = await Workout.findOneAndDelete({_id: req.params.id, user_id: req.user})
        if(!wk){
            res.status(400).json({error: "No such workout"})
        }
        res.status(200).send(wk)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})


module.exports = router