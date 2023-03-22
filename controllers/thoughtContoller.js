const { ObjectId } = require('mongoose').Types;
const { Thoughts, reactionSchema } = require('../models');


module.exports = {
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.ThoughtsId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thoughts with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    updateThought(req, res) {
        Thoughts.findOneAndUpdate({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(500).json({ message: 'Thought cannont be updated' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No such thought exists' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateReaction(req, res){
        reactionSchema.findOneAndUpdate()
    },
    deleteReaction(req, res){

    },
}