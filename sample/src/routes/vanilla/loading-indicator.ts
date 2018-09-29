
export class LoadingIndicatorDemo {

  private developers = [];
  private isLoading: boolean;

  private percentage = 10;

  private loadDevelopers() {
    this.developers = [];
    this.isLoading = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.developers.push({ id: 1, firstName: 'Saeed', lastName: 'Ganji' });
        this.developers.push({ id: 2, firstName: 'Hamed', lastName: 'Fathi' });
        this.isLoading = false;
        resolve(true);
      }, 2500);
    });

  }
}
