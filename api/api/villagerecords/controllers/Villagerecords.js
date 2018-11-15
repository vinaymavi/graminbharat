'use strict';

/**
 * Villagerecords.js controller
 *
 * @description: A set of functions called "actions" for managing `Villagerecords`.
 */

module.exports = {

  /**
   * Retrieve villagerecords records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.villagerecords.search(ctx.query);
    } else {
      return strapi.services.villagerecords.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a villagerecords record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.villagerecords.fetch(ctx.params);
  },

  /**
   * Count villagerecords records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.villagerecords.count(ctx.query);
  },

  /**
   * Create a/an villagerecords record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.villagerecords.add(ctx.request.body);
  },

  /**
   * Update a/an villagerecords record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.villagerecords.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an villagerecords record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.villagerecords.remove(ctx.params);
  }
};
