import { RESTDataSource } from 'apollo-datasource-rest';

export class AsoiafDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://www.anapioficeandfire.com/api';
  }

  public async getFilms() {
    return this.get('/books');
  }

  public async getCharacters() {
    return this.get('/characters');
  }
}
