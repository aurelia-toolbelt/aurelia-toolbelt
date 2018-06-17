// @ts-ignore
const FOLDER_NAME = require('../../package.json').folder_name;

const { HelloWorld } = require(`../../src/${FOLDER_NAME}/hello-world`);

describe('Aurelia plugin', () => {
  it('Says hello Aurelia', () => {
    expect(new HelloWorld().msg).toBe('Hello Aurelia!');
  });
});
