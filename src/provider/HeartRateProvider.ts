import { Component, NgZone, ViewChild, Injectable} from '@angular/core';
import { ToastController, AlertController} from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';

@Injectable()

export class HeartRateProvider {

  peripheral: any = {};

  devices: any[] = [];
  statusMessage: string;
  rrMessage: string;
  heartrate: any;
  rr: any;
  spremenjenPodatek: Boolean;
  test: string;


  constructor(private ble: BLE, private ngZone: NgZone, public toast: ToastController, public alert: AlertController) { 
  }

  ionViewDidEnter() {
    console.log('ionViewDidEntersdfg');
  }

  scanDevices() {
    console.log("Jasna")
    this.setStatus('Skeniranje Bluetooth LE naprav');
    this.devices = [];  // clear list

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Skeniranje končano');
  }

  onDeviceDiscovered(device) {
    this.test= JSON.stringify(device, null, 2);
    this.ngZone.run(() => {
      if (device.name != null) {
        this.devices.push(device);
      }
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    console.log(error);
    this.presentToast('Napaka pri skeniranju Bluetooth LE naprav');
  }

  connect(nt : string ) {
    this.ble.connect(nt).subscribe(
          peripheral => this.onConnected(nt),
          peripheral => this.onDeviceDisconnected(peripheral)
        );
    setTimeout(this.setStatus.bind(this), 5000, 'Povezan');
    
    this.presentToast('Povezan na napravo.');
  }
  
  onConnected(nt) {
      this.setStatus('Povezan na ' + (nt));
      this.ble.startNotification(nt, '180d' ,'2a37').subscribe(
          data => this.ondataChange(data),
          () => this.presentAlert('Napaka pri povezavi.')
        );
  }
  
  ondataChange(buffer:ArrayBuffer) {
    this.spremenjenPodatek = true;
    var data = new Uint8Array(buffer);    
    this.ngZone.run(() => { 
        this.heartrate = data[1];
        this.setStatus( 'Srčni utrip:  ' + this.heartrate + 'bpm');
    });

    var rrInterval = new Uint16Array(buffer);
    this.ngZone.run(() => {
      this.rr = rrInterval[1];
      this.setRRInterval(this.rr);
    });
    this.spremenjenPodatek = true;
  }
         
  onDeviceDisconnected(peripheral) {
    this.presentToast('Naprava' + peripheral + 'se je nepričakovano odklopila');
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  setRRInterval(interval) {
    this.ngZone.run(() => {
      this.rrMessage = interval;
    });
  }

  async presentToast(sporocilo) {
    const toast = await this.toast.create({
      message: sporocilo,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(sporocilo) {
    const alert = await this.alert.create({
      header: 'Pozor!',
      subHeader: '',
      message: sporocilo,
      buttons: ['OK']
    });

    await alert.present();
  }
  
}
