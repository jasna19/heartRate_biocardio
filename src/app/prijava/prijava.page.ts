import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.page.html',
  styleUrls: ['./prijava.page.scss'],
})
export class PrijavaPage implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    console.log("Ali to deluje?");
  }

  ngOnDestroy(){
    
  }

  
  
}
