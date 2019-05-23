
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('acts').delete()
    .then(function () {
      // Inserts seed entries
      return knex('acts').insert([
        {id: 1, description: "Pass along a wonderful book you've finished reading.", related: 'friend', user_id: 1},
        {id: 2, description: 'Pet-sit for them.', related: 'friend', user_id: 1},
        {id: 3, description: 'Cook them dinner.', related: 'friend', user_id: 1},
        {id: 4, description: 'Buy them lunch.', related: 'friend', user_id: 1},
        {id: 5, description: 'Send them a card.', related: 'friend', user_id: 2},
        {id: 6, description: 'Mow their lawn.', related: 'friend', user_id: 2},
        {id: 7, description: 'Share a smile with them.', related: 'friend', user_id: 2},
        {id: 8, description: 'Compliment them.', related: 'friend', user_id: 2},
        {id: 9, description: 'Do their chores.', related: 'friend', user_id: 2},
        {id: 10, description: 'Text/call to see how they are doing.', related: 'friend', user_id: 1},
        {id: 11, description: 'Help them with their yard work.', related: 'friend', user_id: 1},
        {id: 12, description: 'Bring them a meal.', related: 'friend', user_id: 1},
        {id: 13, description: 'Pay for their coffee.', related: 'friend', user_id: 1},
        {id: 14, description: 'Give them a hug.', related: 'friend', user_id: 1},
        {id: 15, description: 'Make them a homemade gift.', related: 'friend', user_id: 2},
        {id: 16, description: 'Offer to wash their car.', related: 'friend', user_id: 2},
        {id: 17, description: 'Tell them a joke.', related: 'friend', user_id: 2},
        {id: 18, description: 'Call just to say hello.', related: 'friend', user_id: 2},
        {id: 19, description: 'Send flowers.', related: 'friend', user_id: 2},
        {id: 20, description: 'Tell them how much you appreciate them.', related: 'friend', user_id: 1},
        {id: 21, description: 'Spend quality time with them.', related: 'friend', user_id: 1},
        {id: 22, description: 'Bake cookies for them.', related: 'friend', user_id: 1},
      ]);
    });
};