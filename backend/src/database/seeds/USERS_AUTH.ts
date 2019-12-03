import * as Knex from "knex";
import UsersAuthData from './data/users_auth.json'

export async function seed(knex: Knex): Promise<any> {
  return knex("users").del()
    .then(() => {
      return knex("users").insert(UsersAuthData);
    });
};
