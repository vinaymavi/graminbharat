'use strict';

/**
 * Districts.js controller
 *
 * @description: A set of functions called "actions" for managing `Districts`.
 */

module.exports = {

  /**
   * Retrieve districts records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.districts.search(ctx.query);
    } else {
      return strapi.services.districts.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a districts record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.districts.fetch(ctx.params);
  },

  /**
   * Count districts records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.districts.count(ctx.query);
  },

  /**
   * Create a/an districts record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.districts.add(ctx.request.body);
  },

  /**
   * Update a/an districts record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.districts.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an districts record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.districts.remove(ctx.params);
  }
};
