export abstract class LoadingComponent {
  private _intervalId: any;
  private _loadingTextIndex: number = 0;
  private _loadingText: string = 'loading...';
  private _loadingTexts: string[] = ['loading...'];
  private _isLoadingOverlayDisplayed: boolean = true;
  private _videosLoadedCounter = 0;
  
  startLoadingTextRotation(): void {
    if (!this._loadingTexts || this._loadingTexts.length === 0) {
      this._loadingTexts = ['loading...'];
    }

    this.setLoadingText(this._loadingTexts[this._loadingTextIndex])

    this._intervalId = setInterval(() => {
      this._loadingTextIndex++;
      if (this._loadingTextIndex >= this._loadingTexts.length) {
        this._loadingTextIndex = 0;
      }
      this.setLoadingText(this._loadingTexts[this._loadingTextIndex]);
    }, 5000);
  }

  stopLoadingTextRotation(): void {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
      this._loadingTextIndex = 0;
    }
  }

  onImageLoad(){
    this.hideLoadingOverlay();
  }

  onVideosLoaded(numberOfVideosToLoad: number){
    this._videosLoadedCounter++;

    if (this._videosLoadedCounter >= numberOfVideosToLoad) {
      this.hideLoadingOverlay();
      this.stopLoadingTextRotation();
    }
  }

  isLoadingOverlayDisplayed(){
    return this._isLoadingOverlayDisplayed;
  }

  showLoadingOverlay(){
    this._isLoadingOverlayDisplayed = true;
    this.startLoadingTextRotation();
  }

  hideLoadingOverlay(){
    this._isLoadingOverlayDisplayed = false;
    this.stopLoadingTextRotation();
  }

  getLoadingText(){
    return this._loadingText;
  }

  setLoadingText(loadingText){
    this._loadingText = loadingText;
  }

  setLoadingTexts(loadingTexts){
    this._loadingTexts = loadingTexts;
  }
}