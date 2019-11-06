import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  divvalue: any;
  power = false;
  swing = false;
  pump = false;
  humidityValue: any;
  constructor(private bluetoothSerial: BluetoothSerial) {}
  getDiv(item){
    this.divvalue=item;
  }

  /**To change power */
  powerChange(item){
    console.log(item);
    var data1;
    if(item == false){
      this.power = item;
      data1 = new Uint8Array(3);
      data1[0] = 0xAA;
      data1[1] = 0x44;
      data1[2] = 0x1B;
    }else if(item == true){
      this.power = item;
      data1 = new Uint8Array(3);
      data1[0] = 0xAA;
      data1[1] = 0x44;
      data1[2] = 0x1B;
    }
    console.log(data1);
    this.data(data1);
  }

  /**Pump power change */
  pumpChange(item){
    console.log(item);
    var data1;
    if(item == false){
      this.pump = item;
      data1 = new Uint8Array(3);
      data1[0] = 0xAA;
      data1[1] = 0x51;
      data1[2] = 0x1B;
    }else if(item == true){
      this.pump = item;
      data1 = new Uint8Array(3);
      data1[0] = 0xAA;
      data1[1] = 0x51;
      data1[2] = 0x1B;
    }
    console.log(data1);
    this.data(data1);
  }

  /**To change swing */
  swingChange(item) {
    console.log(item);
    var data1;
    if(item == false){
      this.swing = item;
      data1 = new Uint8Array(3);
      data1[0] = 0xAA;
      data1[1] = 0x62;
      data1[2] = 0x1B;
    }else if(item == true){
      this.swing = item;
      data1 = new Uint8Array(3);
      data1[0] = 0xAA;
      data1[1] = 0x62;
      data1[2] = 0x1B;
    }
    console.log(data1);
    this.data(data1);
  }

  /**To change humidity */
  humidityChange(event) {
    console.log(event.detail.value);
    var data1;
    var humidity = event.detail.value;
    if(humidity < this.humidityValue){
      data1 = new Uint8Array(3);
      data1[0] = 0xAA;
      data1[1] = 0x4F;
      data1[2] = 0x1B;
    }else if(humidity > this.humidityValue){
      data1 = new Uint8Array(3);
      data1[0] = 0xAA;
      data1[1] = 0x5E;
      data1[2] = 0x1B;
    }else{
      data1 = new Uint8Array(3);
      data1[0] = 0xAA;
      data1[1] = 0x5E;
      data1[2] = 0x1B;
    }
    console.log(data1);
    this.data(data1);
    this.humidityValue = event.detail.value;
  }

  /**To change fanspeed */
  fanSpeed(event){
    console.log(event.detail.value);
    var fanspeed = event.detail.value;
    var data1;
    if(fanspeed == 1){
      console.log("low");
      data1 = new Uint8Array(3);
      data1[0] = 0xAA;
      data1[1] = 0x43;
      data1[2] = 0x1B;
    }else if(fanspeed == 2){
      console.log("medium");
      data1 = new Uint8Array(3);
      data1[0] = 0xAA;
      data1[1] = 0x6C;
      data1[2] = 0x1B;
    }else if(fanspeed == 3){
      console.log("high");
      data1 = new Uint8Array(3);
      data1[0] = 0xAA;
      data1[1] = 0x46;
      data1[2] = 0x1B;
    }else{
      console.log("off");
      data1 = new Uint8Array(3);
      data1[0] = 0xAA;
      data1[1] = 0x6B;
      data1[2] = 0x1B;
    }
    console.log(data1);
    this.data(data1);
  }

  data(data) {
    this.bluetoothSerial.write(data).then(
      success => {
        console.log(success);
      },
      error => {
        // this.showToast(error);
      }
    );
  }
}
