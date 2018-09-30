```ts
export class LoadingIndicatorDemo {

private developers = [];
  private isLoading: boolean;

  private loadDevelopers() {

    this.developers = [];

    // triggers the loading indicator
    this.isLoading = true;

    // must return a promise that resolves a boolean, refer to abt-button documentation
    return new Promise((resolve) => {
      setTimeout(() => {
        this.developers.push({ id: 1, firstName: 'Saeed', lastName: 'Ganji' });
        this.developers.push({ id: 2, firstName: 'Hamed', lastName: 'Fathi' });
        
        //  tells the loading indicator to turn off
        this.isLoading = false;

        resolve(true);
      }, 2500);
    });

  }
}
```
