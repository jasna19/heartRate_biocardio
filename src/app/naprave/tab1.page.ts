import { Component, NgZone} from '@angular/core';
import { HeartRateProvider } from '../../provider/HeartRateProvider';
import {Tab2Page} from '../srcniUtrip/tab2.page';

@Component({
  selector: 'app-naprave',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public heartRate : HeartRateProvider) {
  }

  scanDevices() {
    this.heartRate.scanDevices();
  }

  preusmeriNaSrcniUtrip(device) {
   // this.navCtr.push(Tab2Page);
  }
}
