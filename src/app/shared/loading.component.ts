export abstract class LoadingComponent {
  intervalId: any;
  loadingTextIndex: number = 0;
  loadingText: string = '';
  loadingTexts: string[] = ['loading...'];
  displayLoadingOverlay: boolean = true;

  startLoadingTextRotation(): void {
    if (!this.loadingTexts || this.loadingTexts.length === 0) {
      this.loadingTexts = ['loading...'];
    }

    this.loadingText = this.loadingTexts[this.loadingTextIndex];

    this.intervalId = setInterval(() => {
      this.loadingTextIndex++;
      if (this.loadingTextIndex >= this.loadingTexts.length) {
        this.loadingTextIndex = 0;
      }
      this.loadingText = this.loadingTexts[this.loadingTextIndex];
    }, 5000);
  }

  stopLoadingTextRotation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.loadingTextIndex = 0;
    }
  }
}