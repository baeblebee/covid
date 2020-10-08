'use strict'

const Pesquisa = use("App/Models/Pesquisa");

class PesquisaController {
  async index () {
    const pesquisas = await Pesquisa.query()
      .with("user")
      .orderBy('created_at', "desc")
      .fetch();

    return pesquisas;
  }

  async store ({ request, auth }) {
    const data = request.only(["proteina", "score"]);
    const pesquisa = await Pesquisa.create({ user_id: auth.user.id, ...data });

    return pesquisa;
  }

  async show ({ params }) {
    const pesquisa = await Pesquisa.findOrFail(params.id);

    return pesquisa;
  }
  async destroy ({ params, auth, response }) {
    const pesquisa = await Pesquisa.findOrFail(params.id);

    if (pesquisa.user_id !== auth.user.id){
      return response.status(401);
    }
    await pesquisa.delete();
  }
}

module.exports = PesquisaController
