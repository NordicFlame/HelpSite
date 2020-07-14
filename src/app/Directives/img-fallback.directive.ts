import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]'
})
export class ImgFallbackDirective {

  @Input() appImgFallback: string;

  constructor(private eRef: ElementRef) { }

  @HostListener('error')
    loadFallbackOnError() {
      const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
      element.src = this.appImgFallback || 'http://resources2.news.com.au/images/2013/10/10/1226737/053882-utas.jpg';
    }
}

