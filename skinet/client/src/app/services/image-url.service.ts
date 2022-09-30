export class ImageUrlService {
  setImagePath(pictureUrl: string): string {
    return (
      '../../../assets/products/' +
      this.separateFileNameFromPictureUrl(pictureUrl)
    );
  }

  private separateFileNameFromPictureUrl(pictureUrl: string): string {
    var separated = pictureUrl.split('/');
    return separated[separated.length - 1];
  }
}
