const { messageValidate } = require('../validators/message');

module.exports = ({ message }) => ({
    addText: (payload) => {
        messageValidate.addText(payload);

        const {text, parentId} = payload;
        const c = new message.Instance({
            text,
            parentId: parentId
                ? message.Schema.Types.ObjectId(parentId)
                : null
        });

        return c.save();
    },

    addRating: async (_id, payload) => {
        messageValidate.addRating(payload);
        const {ratings} = payload;

        let avg;

            await message.Instance.findOneAndUpdate({_id}, {$push: {ratings}},{new: true})
            .then(async data=>{
                avg = await data.ratings.reduce((a, b) => (a + b)) / data.ratings.length;
                console.log(avg);
            }).then(()=> message.Instance.findOneAndUpdate({_id},{avgRating: avg}));
            return message.Instance.findOne({_id});
    },

    delete: (_id) => {
        return message.Instance.findOneAndDelete({_id});
    },

    update: (_id, payload) => {
        messageValidate.update({_id}, payload);
        return message.Instance.findOneAndUpdate({_id}, payload);
    },

    get: (_id) => {
        return message.Instance.findById(_id);
    },

    getAll: () => {
        return message.Instance.find();
    }
});
