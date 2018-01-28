```ts
export class Pagination {
  private pageChanged(event: Event, selectedPageNumber: number) {
    let element = document.getElementById('page');
    element.textContent = `Page ${selectedPageNumber}`;
  }
}
```