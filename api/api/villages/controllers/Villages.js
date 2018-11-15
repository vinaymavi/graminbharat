'use strict';

/**
 * Villages.js controller
 *
 * @description: A set of functions called "actions" for managing `Villages`.
 */

module.exports = {

  /**
   * Retrieve villages records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.villages.search(ctx.query);
    } else {
      return strapi.services.villages.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a villages record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.villages.fetch(ctx.params);
  },

  /**
   * Count villages records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.villages.count(ctx.query);
  },

  /**
   * Create a/an villages record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.villages.add(ctx.request.body);
  },

  /**
   * Update a/an villages record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.villages.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an villages record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.villages.remove(ctx.params);
  }
};
