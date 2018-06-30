const protect = (subject) => {
  return {
    ...subject,
    resolve: (entity, args, context, next) => {
      if(!context.auth || context.auth.type != 'USER') throw new Error('Customer not authenticated');
      args.userId = context.auth.id;
      subject.resolve(entity, args, context, next);
    }
  }
}

const protectRMSUser = (subject) => {
  return {
    ...subject,
    resolve: (entity, args, context, next) => {
      if(!context.auth || context.auth.type != 'OWNER') throw new Error('Restaurant Owner not authenticated');
      args.userId = context.auth.authId;
      subject.resolve(entity, args, context, next);
    }
  }
}

const protectRMSRestaurant = (subject) => {
  return {
    ...subject,
    resolve: (entity, args, context, next) => {
      if((!args.restaurantId && context) && (!context.auth || context.auth.type != 'OWNER')) throw new Error('Restaurant Owner not authenticated');
      if(context) {
        args.restaurantId = context.auth.restaurantId ;
      }
      return subject.resolve(entity, args, context, next);
    }
  }
}

module.exports = {
  protect,
  protectRMSUser,
  protectRMSRestaurant
}
