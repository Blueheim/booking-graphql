const Event = require('../../models/event');
const { transformEvent } = require('./merge');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find(); //.populate('creator');

      return events.map(event => {
        return transformEvent(event);
      });
      //return events;
    } catch (err) {
      throw err;
    }
  },

  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5ca731aff6c0fc0d794a893c',
    });

    let createdEvent;

    try {
      const result = await event.save();

      createdEvent = transformEvent(result);

      const creator = await User.findById('5ca731aff6c0fc0d794a893c');

      if (!creator) {
        throw new Error(`User doesn't exist`);
      }
      creator.createdEvents.push(event);

      await creator.save();

      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
};
