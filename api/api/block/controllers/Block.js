'use strict';

/**
 * Block.js controller
 *
 * @description: A set of functions called "actions" for managing `Block`.
 */

module.exports = {

  /**
   * Retrieve block records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.block.search(ctx.query);
    } else {
      return strapi.services.block.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a block record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.block.fetch(ctx.params);
  },

  /**
   * Count block records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.block.count(ctx.query);
  },

  /**
   * Create a/an block record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.block.add(ctx.request.body);
  },

  /**
   * Update a/an block record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.block.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an block record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.block.remove(ctx.params);
  }
};
