import * as Knex from "knex";
import CompaniesData from './data/companies.json'


export async function seed(knex: Knex): Promise<any> {
  return knex("companies").del()
    .then(() => {
      return knex("companies").insert(CompaniesData);
    });
};
