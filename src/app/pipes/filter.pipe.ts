import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(articles:any[] , searchWord:any): any {
    if (searchWord == undefined) {
      console.log(articles);
      return articles;
    }
      return articles.filter(function (articles) {
        console.log(articles.category_id);

        return articles.category_id.toLowerCase().includes(searchWord.toLowerCase());
      });
  }

}
