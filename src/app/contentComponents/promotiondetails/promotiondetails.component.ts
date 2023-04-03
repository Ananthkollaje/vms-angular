import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionsService } from 'src/app/services/promotions.service';

@Component({
  selector: 'app-promotiondetails',
  templateUrl: './promotiondetails.component.html',
  styleUrls: ['./promotiondetails.component.scss']
})
export class PromotiondetailsComponent implements OnInit {
  adlevelcountry: any;
  adlevelstate: boolean = false;
  adlevelstore: boolean = false;
  promodetailsedit: boolean = true;
  promotionDet: any;
  constructor(private route: ActivatedRoute,
    private router: Router, private promotionService: PromotionsService) { }

  selectedDrp: string = 'srg';
  countryDrp: string = "australia";
  articleDrp: string = 'article001';
  statusDrp: string = "active";
  channelDrp: string = "Instore";
  brandDrp: string = "Select brand";
  channelDrpValues: any[] = ["Instore", "Online", "Instore and Online"];
  adChannelDrp: string = "email";
  promoTypeDrp: string = "";
  promoTypeDrpValues: any[] = ["Personalized", "Generic", "Journey", "Non-Personalized Group", "Non-Personalized Individual"]
  enforceDrp: string = "anyone";
  redeemedBy: string = "";
  brandDrpValues: any[] = ["Spotlight-AU", "Spotlight-NZ", "Spotlight-MY", "Spotlight-SG", "Anaconda-AU", "Mountain Design-AU", "Harris Scarfe-AU"]
  adChannelDrpValues: any[] = ["SMS", "Email", "Direct Mail", "Instore", "Letter Box", "Instore Flyer", "Press Ad", "Magazine", "Social", "Website", "Affiliates", "3rd Party" ]
  redeemedByValues: any[] = ["Anyone", "Any Member", "Receiving Member"];
  promotionLevel: any[] = ["Store", "State", "Country"];
  adLevel: any[] = ["Store", "State", "Country"];
  promoLevelDrp: any;
  adLevelDrp: any;
  newPromo: boolean = false;
  startdate = new FormControl(new Date());
  enddate = new FormControl(new Date());
  statesDrp: string = "";
  storesDrp: string = "";
  statusDrpValues: any[] = ["Inactive", "Active"]
  changedStates: any[] = [];
  changedStores: any[] = [];
  ecompromoid: any;
  selectOnline: boolean = true;
  selectRegionEcom: boolean = true;
  selectRegionPOS: boolean = true;
  redeem: boolean = true;
  abc: any[] = [];
  storeShow: boolean = false;
  stateChecked: any;
  stateunChecked: any;
  promolevelstate: boolean = false;
  promolevelstore: boolean = false
  count: string = "Australia";
  auStates: any[] = ["New South Wales",
  "Queensland",
  "South Australia",
  "Tasmania",
  "Victoria",
  "Western Australia",
  "Australian Capital Territory",
  "Northern Territory",
  "Jervis Bay",
  "Ashmore and Cartier Islands",
  "Christmas Island",
  "Cocos Islands",
  "Coral Sea Islands",
  "Heard Island",
  "McDonald Islands",
  "Norfolk Island",
  "Australian Antarctic Territory" ];

  nzStates: any[] = [
    "Auckland",
    "Canterbury",
    "Wellington",
    "Waikato",
    "Bay of Plenty",
    "Manawatu-Wanganui",
    "Otago",
    "Hawke's Bay",
    "Northland",
    "Taranaki",
    "Southland",
    "Nelson",
    "Gisborne",
    "Marlborough",
    "Tasman",
    "West Coast"
  ];

  storeIds: any[] = [
    {
      "New South Wales": ["NSWOO1", "NSWOO2", "NSWOO3", "NSWOO4", "NSWOO5"]
    },
    {
      "Queensland": ["QLNDOO1", "QLNDOO2", "QLNDOO3", "QLNDOO4", "QLNDOO5"]
    },
    {
      "South Australia": ["SAOO1", "SAOO2", "SAOO3", "SAOO4", "SAOO5"]
    },
    {
      "Auckland": ["AUCOO1", "AUCOO2", "AUCOO3", "AUCOO4", "AUCOO5"]
    },
    {
      "Canterbury": ["CANTOO1", "CANTOO2", "CANTOO3", "CANTOO4", "CANTOO5"]
    }
  ];

  storeIdss: string[] = ["All States", "NSWOO1", "NSWOO2", "NSWOO3", "NSWOO4", "NSWOO5" ];
  selected: any = -1;
  countryAndStores: any[] = [
    {
      "country": "Australia",
      "state":  "New South Wales",
       "stores" : ["NSWOO1", "NSWOO2", "NSWOO3", "NSWOO4", "NSWOO5"]
    },
    {
      "country": "Australia",
      "state": "Queensland",
      "stores": ["QLNDOO1", "QLNDOO2", "QLNDOO3", "QLNDOO4", "QLNDOO5"]
    },
    {
      "country": "Australia",
      "state": "South Australia",
      "stores": ["SAOO1", "SAOO2", "SAOO3", "SAOO4", "SAOO5"]
    },
    {
      "country": "New Zealand",
      "state": "Auckland",
      "stores": ["AUCOO1", "AUCOO2", "AUCOO3", "AUCOO4", "AUCOO5"]
    },
    {
      "country": "New Zealand",
      "state": "Canterbury",
      "stores": ["CANTOO1", "CANTOO2", "CANTOO3", "CANTOO4", "CANTOO5"]
    }
  ];

  promolevelcountry: string = "";
  promolevelcountries: boolean = false;
  adlevelcountries: boolean = false;

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.getPromotion(this.route.snapshot.paramMap.get('id'));
    console.log(this.promotionDet);
    if(this.promotionDet != undefined) {
      const pd = JSON.parse(this.promotionDet);
      console.log(pd);
      this.promoTypeDrp = this.promotionDet.body.promotionType;
    }
   this.changedStates = this.auStates;
   
   this.brandDrp = this.brandDrpValues[0];
   this.adChannelDrp = this.adChannelDrpValues[0];
   this.redeemedBy = this.redeemedByValues[0];
   this.channelDrp = this.channelDrpValues[2];
   this.statesDrp = this.changedStates[0];
   this.changedStores = this.storeIds;
   this.storesDrp = this.changedStores[0][this.statesDrp][0];
   this.statusDrp = this.statusDrpValues[0];
   this.ecompromoid = "";
   this.promoLevelDrp = this.promotionLevel[2];
   this.adLevelDrp = this.adLevel[2];
   console.log(this.promoTypeDrp);
   if(this.ecompromoid == "") {
    this.statusDrp = this.statusDrpValues[0];
   } else {
    this.statusDrp = this.statusDrpValues[1];
   }

   if(this.promoTypeDrp == "Personalized") {
     this.redeem = false;
   }

   if(this.stateChecked == true) {
     this.storeShow = true;
   }

   this.stateChecked = -1;
   this.stateunChecked = -1;
   if(this.brandDrp == "Spotlight-AU") {
     this.promolevelcountry = "Australia";
     this.adlevelcountry = "Australia";
     this.promolevelcountries = true;
     this.adlevelcountries = true;
   }

  }

  onChange(event: any) {
    console.log(event)
    console.log(this.stateChecked);
    console.log(this.selected);
   // this.stateChecked = -1;
  }

  onChangeChannel(event: any) {
    console.log(this.channelDrp);
    if(this.channelDrp == "Instore") {
      this.selectOnline = false;
      this.selectRegionEcom = false;
      this.selectRegionPOS = true;
    } else if(this.channelDrp == "Online"){
      this.selectOnline = true;
      this.selectRegionEcom = true;
      this.selectRegionPOS = false;
    } else if(this.channelDrp == "Instore and Online"){
      this.selectOnline = true;
      this.selectRegionEcom = true;
      this.selectRegionPOS = true;
    }
  }
  onChangeBrand(event: any) {
   
    this.statesDrp = "";
    this.changedStores = [];
    this.changedStores = this.storeIds;
   
    if(this.brandDrp == 'Spotlight-NZ') {
      this.changedStates = this.nzStates;
      this.promolevelcountry = "New Zealand";
      this.adlevelcountry = "New Zealand";
      this.changedStores.forEach((sid) => {
        this.statesDrp = this.changedStates[0];
        var state = Object.keys(sid).toString();
        if(state == this.statesDrp) {
          this.changedStores = [];
          this.changedStores.push(sid);
        }
      });
    }
    if(this.brandDrp == 'Spotlight-AU') {
      this.changedStates = this.auStates;
      this.promolevelcountry = "Australia";
      this.adlevelcountry = "Australia";
      this.changedStores.forEach((sid) => {
        console.log(sid);
        this.statesDrp = this.changedStates[0];
        var state = Object.keys(sid).toString();
        if(state == this.statesDrp) {
          this.changedStores = [];
          this.changedStores.push(sid);
        }
      });
    }
    this.statesDrp = this.changedStates[0];
    this.storesDrp = this.changedStores[0][this.statesDrp][0];
  }
  onChangeAdChannel(event: any) {

  }
  onChangeRedeemedBy(event: any) {

  }
  onChangeStates(event: any) {
  //  var states = this.statesDrp;
  
    this.storeIds.forEach((sid) => {
      this.storesDrp = "";
     // this.statesDrp = "";
   // console.log(sid);
   // console.log(this.statesDrp);
    
      var state = Object.keys(sid).toString();
     // console.log(state);
     // console.log(states);
      if(state == this.statesDrp) {
        this.changedStores = [];
     // console.log(sid);
     // console.log(this.statesDrp);
       this.changedStores.push(sid);
     //  console.log(this.changedStores[0][this.statesDrp][0]);
     // this.statesDrp = this.changedStores[0];
     // this.abc = this.changedStores[0][this.statesDrp];
    
    this.statesDrp = this.changedStates[0];
    
    console.log(this.storesDrp);
    console.log(this.statesDrp);
      }
     // this.storesDrp = this.changedStores[0][this.statesDrp][0];
    });
    
  }
  // onChangeStates1(event: any) {
    
  //   this.storeIds.forEach((sid) => {
  //   this.changedStores = [];
  //   this.storesDrp = "";
  //     var state = Object.keys(sid).toString();
  //     if(state === this.statesDrp)
  //      this.changedStores.push(sid);
  //   });
  //   this.storesDrp = this.changedStores[0][this.statesDrp][0];
  // }
  onChangePromoType(event: any) {
    console.log(this.promoTypeDrp);
    console.log(this.redeemedBy);
    if(this.promoTypeDrp == "Generic") {
      this.redeemedBy = "Any Member";
      this.redeem = true;
    } else if(this.promoTypeDrp == "Non-Personalized Group" || this.promoTypeDrp == "Non-Personalized Individual") {
      this.redeemedBy = "Anyone";
      this.redeem = true;
    } else {
      this.redeemedBy = "Anyone";
      this.redeem = false;
    }
  }

  showOptions(event:MatCheckboxChange): void {
    console.log(event.checked);
    for(var i = 0; i < this.countryAndStores.length; i++) {
      if(event.checked == true) {
        this.storeShow = true;
      } else {
        this.storeShow = false;
      }
    }
    
  }
  onChangePromoLevel(event:any) {
    console.log(this.promoLevelDrp);
    if(this.promoLevelDrp == "Store") {
        this.promolevelstate = true;
        this.promolevelstore = true;
        this.promolevelcountries = true;

    } else if(this.promoLevelDrp == "State"){
        this.promolevelstate = true;
        this.promolevelstore = false;
        this.promolevelcountries = true;
    } else if(this.promoLevelDrp == "Country") {
      this.promolevelstate = false;
      this.promolevelstore = false;
      this.promolevelcountries = true;
    } else {
      this.promolevelstate = false;
      this.promolevelstore = false;
      this.promolevelcountries = false;
    }
  }

  onChangeadLevel(event:any) {
    console.log(this.adLevelDrp);
    if(this.adLevelDrp == "Store") {
        this.adlevelstate = true;
        this.adlevelstore = true;
        this.adlevelcountries = true;

    } else if(this.adLevelDrp == "State"){
        this.adlevelstate = true;
        this.adlevelstore = false;
        this.adlevelcountries = true;
    } else if(this.adLevelDrp == "Country") {
      this.adlevelstate = false;
      this.adlevelstore = false;
      this.adlevelcountries = true;
    } else {
      this.adlevelstate = false;
      this.adlevelstore = false;
      this.adlevelcountries = false;
    }
  }
  getPromotion(id: any): void {
    this.promotionService.promotionDetails(id)
      .subscribe(
        ( promotionD: any) => {
          let pd1 = promotionD;
         // var obj = JSON.parse(pd1.promotions);
        this.promotionDet = promotionD.body;
        console.log(typeof pd1);
       // const pd = JSON.parse(this.promotionDet);
        // console.log(pd);
       // const pd = [];
       // pd.push(this.promotionDet);
       console.log(pd1);
         console.log(this.promotionDet);
        },
        (error: any) => {
          console.log(error);
        });
  }
  editDetails() {
    this.promodetailsedit = false;
  }

}
