const validator = require('validator');
const _ = require('lodash');
const ValidationError = require('../common/validator/ValidationError');

const messageFields = [
    'text',
    'parentId',
    'ratings',
    'avgRating'
];

class MessageValidate {
    addText(payload) {

        if (!payload) {
            const error = ValidationError('payload', '"payload" is required!');
            throw error;
        }

        if (!payload.text) {
            throw ValidationError('text', '"payload.text" is required!');
        }

        if (payload.parentId && (
            !_.isString(payload.parentId)
            ||
            !validator.isUUID(payload.parentId))
        ) {
            throw ValidationError('parentId', '"payload.parentId" must be an UUID String!');
        }

        if(payload.ratings){
            throw ValidationError('ratings', 'Only other users can estimate posted message!');
        }
        return _.pick(payload, messageFields);
    }
    addRating(payload){
        if (!payload) {
            const error = ValidationError('payload', '"payload" is required!');
            throw error;
        }

        if (!payload.ratings) {
            throw ValidationError('ratings', '"payload.ratings" is required!');
        }

        if (payload.ratings && !_.isNumber(payload.ratings) || !_.isInteger(payload.ratings))
          {
            throw ValidationError('ratings', '"payload.ratings" must be an Integer Number!');
        }

        if(payload.ratings<=0 || payload.ratings>10){
            throw ValidationError('ratings', '"payload.ratings" must be between 1 and 10 score!');
        }

        return _.pick(payload, messageFields);

    }

    delete(_id) {

    }

    update(_id, payload) {
        if(payload.ratings || payload.avgRating){
            throw ValidationError('ratings', 'You cannot change the ratings of the posted message!');
        }
    }
}

module.exports = {
    messageValidate: new MessageValidate(),
    MessageValidate,
    messageFields,
}
