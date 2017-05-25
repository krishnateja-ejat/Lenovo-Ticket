import { TicketManagementPage } from './app.po';

describe('ticket-management App', () => {
  let page: TicketManagementPage;

  beforeEach(() => {
    page = new TicketManagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
