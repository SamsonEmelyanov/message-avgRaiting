const HttpStatus = require('http-status-codes');
const { messageValidate } = require('../validators/message');

module.exports = ({ router, actions, models }) => {

    const routes = router();
    const message = actions.message(models);

    routes.get('/', async (req, res) => {
        const messages = await message.getAll();
        res.send(messages);
    });

    routes.get('/:id', async (req, res) => {
        const target = await message.get(req.params.id)

        res.send(target);
    });

    routes.get('/:id/ratings', async (req, res) => {
        const target = await message.get(req.params.id)

        res.send(target.ratings);

    });

    routes.post('/', async (req, res) => {
        try {
            const reqData = messageValidate.addText(req.body.payload);
            const target = await message.addText(reqData);

            res.send(target);
        } catch (e) {
            res
                .status(HttpStatus.BAD_REQUEST)
                .send(e);
        }
    });

    routes.delete('/:id', async (req, res) => {
        const target = await message.delete(req.params.id)

        res.send(target);
    });

    routes.put('/:id', async (req, res) => {
        try {
        const target = await message.update(req.params.id, req.body.payload);
            res.send(target);
        }
        catch (e) {
            res
                .status(HttpStatus.BAD_REQUEST)
                .send(e);

        }
    });

    routes.put('/:id/ratings', async (req, res) => {
        try {
            const target = await message.addRating(req.params.id, req.body.payload);
            res.send(`Average rating of the posted message "${target.text}": ${(target.avgRating).toFixed(2)}`);
        }
    catch (e) {
            res
                .status(HttpStatus.BAD_REQUEST)
                .send(e);
        }
    });

    return routes;
};
