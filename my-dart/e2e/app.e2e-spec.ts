import { MyDartPage } from './app.po';

describe('my-dart App', () => {
  let page: MyDartPage;

  beforeEach(() => {
    page = new MyDartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
