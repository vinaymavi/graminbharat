'use strict';

/**
 * Financialyear.js controller
 *
 * @description: A set of functions called "actions" for managing `Financialyear`.
 */

module.exports = {

  /**
   * Retrieve financialyear records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.financialyear.search(ctx.query);
    } else {
      return strapi.services.financialyear.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a financialyear record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.financialyear.fetch(ctx.params);
  },

  /**
   * Count financialyear records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.financialyear.count(ctx.query);
  },

  /**
   * Create a/an financialyear record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.financialyear.add(ctx.request.body);
  },

  /**
   * Update a/an financialyear record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.financialyear.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an financialyear record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.financialyear.remove(ctx.params);
  }
};
