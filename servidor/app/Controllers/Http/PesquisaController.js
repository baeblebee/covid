'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Pesquisa = use("App/Models/Pesquisa");
const Module = use("build/Release");

/**
 */
class PesquisaController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const pesquisas = await Pesquisa.query()
      .with("user")
      .orderBy('created_at', "desc")
      .fetch();

    return pesquisas;
  }

  /**
   
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only(["proteina"]);
    const pesquisa = await Pesquisa.create({ user_id: auth.user.id, ...data });

    return pesquisa;
  }

  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const pesquisa = await Pesquisa.findOrFail(params.id);

    return pesquisa;
  }

  /**

   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const pesquisa = await Pesquisa.findOrFail(params.id);

    if (pesquisa.user_id !== auth.user.id){
      return response.status(401);
    }
    await pesquisa.delete();
  }
}

module.exports = PesquisaController
