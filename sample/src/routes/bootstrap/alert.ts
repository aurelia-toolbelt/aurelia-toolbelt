
export class Alert {

  private showOrHideAlert = true;



  private showAlert(target: any) {
    console.log('show');
    // return undefined;
  }

  private toggleAlert() {
    this.showOrHideAlert = !this.showOrHideAlert;
  }

}
