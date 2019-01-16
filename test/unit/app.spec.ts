import {App} from '../../src/app';
declare let expect: any;
describe('the app', () => {
  it('says hello', () => {
    expect(new App().message).toBe('Hello World!');
  });

});
