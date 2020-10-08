'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PesquisaSchema extends Schema {
  up () {
    this.create('pesquisas', (table) => {
      table.increments()
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
      table.string("proteina", 240).notNullable()
      table.string("score", 240).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pesquisas')
  }
}

module.exports = PesquisaSchema
