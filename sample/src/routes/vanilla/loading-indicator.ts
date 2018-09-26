
export class LoaingIndicatordemo {


  private developers = [];
  private isLoading = false;

  private loadDevelopers() {
    this.developers = [];
    this.isLoading = true;
    return new Promise((r) => {
      setTimeout(() => {
        this.developers.push({ id: 1, firstName: 'Saeed', lastName: 'Ganji' });
        this.developers.push({ id: 1, firstName: 'Hamed', lastName: 'Fathi' });
        this.isLoading = false;
        r(true);
      }, 2500);
    });

  }



}
