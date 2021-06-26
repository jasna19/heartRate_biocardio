import { Component, OnInit } from "@angular/core";
import { HeartRateProvider } from "../../provider/HeartRateProvider";
import { ActivatedRoute } from "@angular/router";
import {
  AlertController,
  ToastController,
  NavController,
} from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  timeLeft: number = 60;
  interval;
  deviceId: any;
  skrij: Boolean = false;
  remainingTime: number;
  seznamIntervalov: any[];
  constructor(
    public heartRate: HeartRateProvider,
    private activatedRoute: ActivatedRoute,
    public alert: AlertController,
    public toast: ToastController,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.deviceId = this.activatedRoute.snapshot.paramMap.get("deviceId");
    this.heartRate.connect(this.deviceId);
  }

  pricniMerjenje() {
    this.skrij = true;
    this.seznamIntervalov = new Array();
    this.startTimer();
  }

  prekiniMerjenje() {
    this.skrij = false;
    this.pauseTimer();
  }

  ponastaviMerjenje() {
    this.pricniMerjenje();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.alertMerjenjeUtripa();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.timeLeft = 60;
  }

  async alertMerjenjeUtripa() {
    const alert = await this.alert.create({
      header: "Potrdi!",
      message:
        "Shranite rezultate v datoteko ali pa ponovno pričnite z merjenjem. " +
        this.seznamIntervalov.length,
      buttons: [
        {
          text: "Shrani rezultate",
          role: "save",
          cssClass: "secondary",
          handler: () => {
            this.prikaziToast("Rezultati so bili shranjeni v datoteko.");
            this.nav.navigateForward(
              "/tretja/" + JSON.stringify(this.seznamIntervalov)
            );
            // this.router.navigate(['/tretja/:seznamIntervalov', {seznamIntervalov: this.seznamIntervalov.length}]);
            this.skrij = false;
          },
        },
        {
          text: "Ponovno izmeri",
          handler: () => {
            this.pricniMerjenje();
          },
        },
      ],
    });

    await alert.present();
  }

  async prikaziToast(sporocilo) {
    const toast = await this.toast.create({
      message: sporocilo,
      duration: 2000,
    });
    toast.present();
  }
}
