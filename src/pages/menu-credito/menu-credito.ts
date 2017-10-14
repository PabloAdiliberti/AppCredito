import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-menu-credito',
  templateUrl: 'menu-credito.html',
})
export class MenuCreditoPage {

  scanData : {};
  options :BarcodeScannerOptions;
  list: FirebaseListObservable<any>;
  usuarioIngresado:string;
  credito100:string
  credito50:string;
  credito10:string;
  codigo : string;
  ExiteUsuario:boolean;
  MiUsuario:any;
  Micredito:number;
  CreditoMensaje:string;
  CreditoACargar:string;


  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               db:AngularFireDatabase,
               public alertCtrl: AlertController,
              private barcodeScanner: BarcodeScanner) 
  {

    this.ExiteUsuario = false;
    this.usuarioIngresado = navParams.get("usuario");
    this.list=db.list('/Credito');

    db.list('/Credito', { preserveSnapshot: true})
    .subscribe(snapshots=>{
        snapshots.forEach(snapshot => {

              if(snapshot.val().usuario == this.usuarioIngresado)
                 {
                    this.MiUsuario = snapshot.ref;
                    this.ExiteUsuario = true;                                    
                    this.credito10 = snapshot.val().credito10;
                    this.credito50 = snapshot.val().credito50;
                    this.credito100 = snapshot.val().credito100;
                 }
          
        });

        if(this.ExiteUsuario == false)
        {
          this.list.push({
          usuario:this.usuarioIngresado,
          credito10:"",
          credito50:"",
          credito100:""});
          this.credito10 = "";
          this.credito50 = "";
          this.credito100 = "";
        }
        this.GetCredito();
        this.getCreditoACargar();
        
    })
  } 

  scan()
  {
    this.options = {
        prompt : "Scanee el codigo"
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        console.log(barcodeData);
        this.scanData = barcodeData;
        this.codigo = barcodeData.text;
        this.getCreditoACargar();
    }, (err) => {
        console.log("Error occured : " + err);
    });  
    
    this.getCreditoACargar();
  }
  
  Cargar()
  {   
        if ("8c95def646b6127282ed50454b73240300dccabc" == this.codigo) {
 
          if(this.credito10 == "")
          {
              this.MiUsuario.update({
                credito10:"8c95def646b6127282ed50454b73240300dccabc",
                credito50:this.credito50,
                credito100:this.credito100
            });

            this.credito10 = "8c95def646b6127282ed50454b73240300dccabc";

            let alert = this.alertCtrl.create({
              title: "Mensaje:",
              subTitle: "Se cargo 10 credito.",
              buttons: ['OK']
            });
             alert.present();

             this.CreditoACargar="Credito a cargar 0";
             this.codigo="";
          }
          else
          {
            let alert = this.alertCtrl.create({
              title: "Mensaje:",
              subTitle: "Ya se uso el codigo.",
              buttons: ['OK']
            });
             alert.present();
          }


      } else if ("ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 " == this.codigo) {

        if(this.credito50 == "")
        {
            this.MiUsuario.update({
              credito10:this.credito10,
              credito50:"ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ",
              credito100:this.credito100
          });

          this.credito50 = "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ";

          let alert = this.alertCtrl.create({
            title: "Mensaje:",
            subTitle: "Se cargo 50 credito.",
            buttons: ['OK']
          });
           alert.present();
           this.CreditoACargar="Credito a cargar 0";
           this.codigo="";
        }
        else
        {
          let alert = this.alertCtrl.create({
            title: "Mensaje:",
            subTitle: "Ya se uso el codigo.",
            buttons: ['OK']
          });
           alert.present();
        }

        
      } else if("2786f4877b9091dcad7f35751bfcf5d5ea712b2f" == this.codigo){
        
        if(this.credito100 == "")
        {
            this.MiUsuario.update({
              credito10:this.credito10,
              credito50:this.credito50,
              credito100:"2786f4877b9091dcad7f35751bfcf5d5ea712b2f"
          });

          this.credito100 = "2786f4877b9091dcad7f35751bfcf5d5ea712b2f";

          let alert = this.alertCtrl.create({
            title: "Mensaje:",
            subTitle: "Se cargo 100 credito.",
            buttons: ['OK']
          });
           alert.present();
           this.CreditoACargar="Credito a cargar 0";
           this.codigo="";
        }
        else
        {
          let alert = this.alertCtrl.create({
            title: "Mensaje:",
            subTitle: "Ya se uso el codigo.",
            buttons: ['OK']
          });
           alert.present();
        }

      }
      else{
        let alert = this.alertCtrl.create({
          title: "Mensaje:",
          subTitle: "El codigo no es valido.",
          buttons: ['OK']
        });
         alert.present();
      }
  }


  GetCredito()
  {
   
      this.Micredito = 0;

      if(this.credito10 != "")
      {
        this.Micredito += 10;
      }

      if(this.credito50 != "")
      {
        this.Micredito += 50;
      }

      if(this.credito100 != "")
      {
        this.Micredito += 100;
      }
      this.CreditoMensaje = "Tu credito es : "+this.Micredito;
  }

  getCreditoACargar()
  {

    if ("8c95def646b6127282ed50454b73240300dccabc" == this.codigo) {
      
        this.CreditoACargar="Credito a cargar 10";
      
           } else if ("ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 " == this.codigo) {
     
            this.CreditoACargar="Credito a cargar 50";
           } else if("2786f4877b9091dcad7f35751bfcf5d5ea712b2f" == this.codigo){
            this.CreditoACargar="Credito a cargar 100";
           }
           else{
            this.CreditoACargar="Credito a cargar 0";
           }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuCreditoPage');
  }



}
