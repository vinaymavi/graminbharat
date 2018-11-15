'use strict';

/**
 * Planunittype.js controller
 *
 * @description: A set of functions called "actions" for managing `Planunittype`.
 */

module.exports = {

  /**
   * Retrieve planunittype records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.planunittype.search(ctx.query);
    } else {
      return strapi.services.planunittype.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a planunittype record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.planunittype.fetch(ctx.params);
  },

  /**
   * Count planunittype records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.planunittype.count(ctx.query);
  },

  /**
   * Create a/an planunittype record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.planunittype.add(ctx.request.body);
  },

  /**
   * Update a/an planunittype record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.planunittype.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an planunittype record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.planunittype.remove(ctx.params);
  }
};
