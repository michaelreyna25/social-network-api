const { ObjectId } = require('mongoose').Types;
const { Thoughts } = require('../models');



module.exports = {
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.ThoughtsId })
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thoughts with that ID' })
                    : res.json({
                        thought,
                        user: await user(req.params.userId)
                    })
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
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'cannot find id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));

    },


    removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reaction: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID :(' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
}