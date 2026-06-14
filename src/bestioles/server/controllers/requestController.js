import * as fs from 'fs/promises';

import { getContentTypeFrom }  from '../contentTypeUtil.js';
import path from 'path';

const BASE = 'http://localhost/';

/**
*  define a controller to retrieve static resources
*/
export default class RequestController {

  #request;
  #response;
  #url;

  constructor(request, response) {
    this.#request = request;
    this.#response = response; 
    this.#url = new URL(this.request.url, BASE).pathname;
    if (this.#url === '/') this.#url = '/index.html';   
  }

  get response() {
    return this.#response;
  }
  get request() {
    return this.#request;
  }
  get url() {
    return this.#url;
  }

  async handleRequest() {
    this.response.setHeader("Content-Type" , getContentTypeFrom(this.url) );
    await this.buildResponse();
    this.response.end();
  }

  async buildResponse()  {
    try {
      const filePath= path.join(process.cwd(), 'server', 'public', this.url);
      console.log(this.#url);
      await fs.access(filePath);
      const data = await fs.readFile(filePath);
      this.response.statusCode = 200;
      this.response.write(data);
    }
    catch(err) { 
      this.response.statusCode = 404;
      this.response.write('erreur');
    }
  }

}
