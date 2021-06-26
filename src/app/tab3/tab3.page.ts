import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  seznamIntervalov: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.seznamIntervalov = this.activatedRoute.snapshot.paramMap.get('seznamIntervalov');
  }

  /* async writeToFile() {
    await this.platform.ready();
    return this.file.writeFile(this.file.dataDirectory, 'hello.json', JSON.stringify({test:'value'}), {replace:true});
  
  }*/
}
