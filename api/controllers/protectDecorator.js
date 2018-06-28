const protect = (subject) => {
  return {
    ...subject,
    resolve: (entity, args, context, next) => {
      if(!context.user || context.user.type != 'USER') throw new Error('Customer not authenticated');
      args.userId = context.user.id;
      subject.resolve(entity, args, context, next);
    }
  }
}

const protectRMSUser = (subject) => {
  return {
    ...subject,
    resolve: (entity, args, context, next) => {
      if(!context.user || context.user.type != 'RESTAURANT_OWNER') throw new Error('Restaurant Owner not authenticated');
      args.userId = context.user.userId;
      subject.resolve(entity, args, context, next);
    }
  }
}

const protectRMSRestaurant = (subject) => {
  return {
    ...subject,
    resolve: (entity, args, context, next) => {
      if(!context.user || context.user.type != 'RESTAURANT_OWNER') throw new Error('Restaurant Owner not authenticated');
      args.restaurantId = context.user.restaurantId;
      return subject.resolve(entity, args, context, next);
    }
  }
}

module.exports = {
  protect,
  protectRMSUser,
  protectRMSRestaurant
}
