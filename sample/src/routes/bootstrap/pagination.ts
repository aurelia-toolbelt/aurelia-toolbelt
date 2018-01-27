export class BootstrapPagination {
  private clicked(event: Event, selectedPageNumber: number) {
    let element = document.getElementById('page');
    element.textContent = `Page ${selectedPageNumber}`;
  }
}
