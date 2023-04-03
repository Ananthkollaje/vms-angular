import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigurationsService } from 'src/app/services/configurations.service';
import { GetconfigService } from 'src/app/services/getconfig.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
  advertisingChannelArr: any;
  countryArr: any[] = [];
  brandArr: any[] = [];

  constructor(private userConfiguraion: ConfigurationsService, private spinner: NgxSpinnerService,
    private router: Router, private getConfig: GetconfigService) { }

  financialYear: string = "";
  getFinanceYearValue:any[] = ["2022", "2023", "2024","2025", "2026", "2027", "2028", "2029", "2030", "2031","2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040"];
  brandDrp: string = "";
  getBrandValue: any[] = ["SP-Spotlight", "AN-Anaconda", "MD-Mountain Designs", "HS-Harris Scarfe"];
  countryDrp: string = "";
  getCountryValues: any[] = [];
  advertisingChannel: string = "";
  getAdvertisingChannelValues: any[] = ["DM-Direct Mail", "eDM-Email", "SMS-Text Message", "CT-Catalogue", "FL-Instore Flyer", "PA-Press Ad", "MG-Magazine", "SO-Social", "WB-Website", "AF-Affliate", "3P-3rd Party" ];
  toleranceDrp: string = "";
  getToleranceDaysValues: any[] = ["1", "2", "3", "4", "5", "6", "7"];
  extendableDrp: string = "";
  getExtendableValues: any[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
  getBrandValues:any[] = ["Spotlight", "Anaconda", "Mountain Designs", "Harris Scarfe"];
  statesDrp: string = "";
  getStatesValues: any[] = [];
  storesDrp: string = "";
  getStoresValues: any[] = [];
  countryValue: string = "";
  brandValue: string = "";
  stateValue: string = "";
  storeNameValue: string = "";
  storeCodeValue: string = "";
  countryCodeValue: string = "";
  brandCodeValue: string = "";
  defaultCountry: string = "";
  storeChecked: string = "";
  fieldSelect: string = "";
  getFieldValues:any[] = ["Advertising Channel", "Config", "Country", "Brand"];
  filteredFieldValues:any[] = [];
  displayedColumns: string[] = [];
  countryField: boolean = false;
  fieldValue: any;
  fieldCode: any;
  fieldOrder: any;
  fieldCustomCode:any;
  default:any;
  getDefaultValues: any[] = ["False", "True"];
  tableHeading = "Advertising Channel";
  userConfiguration: FormGroup = new FormGroup({});
  requestType: string = "ADVERTISING_CHANNEL";
  addBrand: boolean = false;
  brandSection: boolean = false;
  tableshow: boolean = false;
  codeDefault: boolean = false;
  addedSuccess: boolean = false;
  updateSuccess: boolean = false;
  deleteSuccess: boolean = false;
  brandField: boolean = false;
  brandCountry: boolean = false;
  countryCode:string = "";
  countryCodeValues:any = [];
  disableAdd: boolean = false;
  disableResetBtn: boolean = true;
  errorM: string = "";
  errorFound: boolean = false;
  ptPresent:boolean = false;
  ptcodePresent: boolean = false;
  ptorderPresent: boolean = false;
  configData:any;
  addDisabled: boolean = false;
  updateDisabled: boolean = true;
  deleteDisabled: boolean = true;
  req: boolean = true;
  forSearch: boolean = true;
  disableButton: boolean = true;
  newArr: any[] = [];

  ngDoCheck() {
    this.filteredFieldValues;
  }

  ngOnInit(): void {
    this.displayedColumns  = [ 
      'fieldType',
      'value',
      'code',
      'order',
      'default'
    ];
    this.financialYear = this.getFinanceYearValue[0];
    this.brandDrp = this.getBrandValue[0];
    this.countryDrp = this.getCountryValues[0];
    this.advertisingChannel = this.getAdvertisingChannelValues[0];
    this.toleranceDrp = this.getToleranceDaysValues[0];
    this.extendableDrp = this.getExtendableValues[0];
    this.brandDrp = this.getBrandValues[0];
    this.fieldSelect = this.getFieldValues[0];
    this.default = this.getDefaultValues[0];
   this.userConfiguration = new FormGroup({
    requestType: new FormControl(this.requestType),
    config: new FormGroup({
      fieldType: new FormControl(this.fieldSelect),
      value: new FormControl(this.fieldValue),
      code: new FormControl(this.fieldCode),
      order: new FormControl(this.fieldOrder),
      default: new FormControl(this.default),
      configType: new FormControl("")
    })
  });
    this.tableshow = false;
    var search = {
      requestType: "SEARCH",
      config: {
      fieldType: this.requestType,
      value: this.fieldValue,
      code: this.fieldCode,
      order: this.fieldOrder,
      default: this.default,
      configType: "USER"
      }
    }
    this.userConfiguraion.searchConfig(search).subscribe(data => {
      this.configData = data;
      if(this.configData) {
        this.getConfigValues(this.configData);
      }
  });
  }


  /* function to set all configuration values */ 
  getConfigValues(value: any) {
    value.configs.forEach((item:any) => {
      if(this.requestType == 'ADVERTISING_CHANNEL') {
        this.advertisingChannelArr.push(item);
      }
    })
    this.disableTrueValue();
  }

  /* function to disable true values if already one true value is present in list */
  disableTrueValue() {
    if(this.fieldSelect == 'Advertising Channel') {
      this.advertisingChannelArr = this.advertisingChannelArr.filter((item:any) => item.default == true);
      if(this.advertisingChannelArr.length == 1) {
        this.disableButton = true;
      }
      else {
        this.disableButton = false;
      }
    }
  }

  onFieldSelect(evt:any) {
    this.fieldSelect = evt.value;
    this.addDisabled = false;
    this.deleteDisabled = true;
    this.updateDisabled = true
    this.forSearch = true;
    this.fieldOrder = '';
    this.fieldValue = '';
    this.default = "False";
    this.codeDefault = false;
    this.fieldCode = '';
    this.ptPresent = false;
    this.ptcodePresent = false;
    this.ptorderPresent = false;
    this.configData = [];

    if(this.fieldSelect == "Advertising Channel") {
      this.tableHeading = "Advertising Channel";
      this.requestType = "ADVERTISING_CHANNEL";
      this.brandField = false;
      this.displayedColumns = [];
      this.displayedColumns  = [ 
        'fieldType',
        'value',
        'code',
        'order',
        'default'
      ];
      this.tableshow = false;
      this.advertisingChannelArr = this.advertisingChannelArr.filter((item:any) => item.default == true);
      if(this.advertisingChannelArr.length == 1) {
        this.disableButton = true;
      }
      else {
        this.disableButton = false;
      }
      var search1 = {
        requestType: "SEARCH",
        config: {
        fieldType: this.requestType,
        value: this.fieldValue,
        code: this.fieldCode,
        order: this.fieldOrder,
        default: this.default,
        configType: "USER"
        }
      }
      this.userConfiguraion.searchConfig(search1).subscribe(data => {
        this.configData = data;
    });
    }
    if(this.fieldSelect == "Config") {
      this.tableHeading = "Config";
      this.requestType = "CONFIG";
      this.brandField = false;
      this.displayedColumns = [];
      this.displayedColumns  = [ 
        'fieldType',
        'value',
        'code',
        'order',
        'default'
      ];
      this.tableshow = false;
      var search1 = {
        requestType: "SEARCH",
        config: {
        fieldType: this.requestType,
        value: this.fieldValue,
        code: this.fieldCode,
        order: this.fieldOrder,
        default: this.default,
        configType: "USER"
        }
      }
      this.userConfiguraion.searchConfig(search1).subscribe(data => {
        this.configData = data;
    });
    }
    if(this.fieldSelect == "Country") {
      this.tableHeading = "Country";
      this.requestType = "COUNTRY";
      this.brandField = false;
      this.displayedColumns = [];
      this.displayedColumns  = [ 
        'value',
        'code',
        'default'
      ];
      this.tableshow = false;
      this.userConfiguration = new FormGroup({
        requestType: new FormControl(),
        configType: new FormControl(""),
        sourceMarket: new FormGroup({
          name: new FormControl(this.fieldValue, Validators.required),
          code: new FormControl(this.fieldCode),
          default: new FormControl(this.default)
        })
      });
    }
    if(this.fieldSelect == "Brand") {
      this.tableHeading = "Brand";
      this.requestType = "BRAND";
      this.displayedColumns = [];
      this.displayedColumns  = [ 
        'value',
        'code',
        'default'
      ];
      this.tableshow = false;
      this.userConfiguration = new FormGroup({
        requestType: new FormControl(),
        configType: new FormControl(""),
        sourceMarket: new FormGroup({
          name: new FormControl(this.fieldValue),
          code: new FormControl(this.fieldCode),
          default: new FormControl(this.default),
          brand: new FormControl([])
        })
      });
      this.brandField = true;
      var search = {
        requestType: "SEARCH",
      }
      this.spinner.show();
      this.userConfiguraion.searchSourceSysConfig(search).subscribe((data:any) => 
      { 
        
        if(data) {
        data.sourceMarkets.forEach((country:any) => {
            if(country != null) {
            this.getCountryValues.push(country.name);
            this.countryCodeValues.push(country.code)
            this.countryDrp = this.getCountryValues[0];
            this.countryCode = this.countryCodeValues[0];
            }
        });
        this.spinner.hide();
        }
    },
      (Error:any) => {
        if(Error.error) {
          this.spinner.hide();
        } else {
        this.spinner.hide();
        };
      });
    }
  }

  addBrands() {
    this.brandSection = true;
  }

  onChangeFinancialYear(evt: any) {
   this.financialYear = evt.value;
  }

  onChangeBrand(evt:any) {
   this.brandDrp = evt.value;
  }

  onChangeCountry(evt: any) {
    this.countryDrp = evt.value;
    this.countryCode = "";
    var search = {
      requestType: "SEARCH",
    }
    this.userConfiguraion.searchSourceSysConfig(search).subscribe((data:any) => 
    { 
      
      if(data) {
      data.sourceMarkets.forEach((country:any) => {
          if(country != null && country.name == this.countryDrp) {
            this.countryCode = country.code;
          }
      });
      this.spinner.hide();
      }
  },
    (Error:any) => {
      if(Error.error) {
        this.spinner.hide();
      } else {
      this.spinner.hide();
      };
    });
  }

  onChangeAdervtisingChannel(evt:any) {
    this.advertisingChannel = evt.value;
  }

  onChangeTolerance(evt:any) {
    this.toleranceDrp = evt.value;
  }

  onChangeExtendable(evt:any) {
    this.extendableDrp = evt.value;
  }

  home() {
    window.location.href = environment.azureurl;
  }

  onChangeStates(evt:any) {
    this.statesDrp = evt.value;
  }

  onChangeStores(evt:any) {
    this.storesDrp = evt.value;
  }

  onChangeDefault(evt:any) {
    this.default = evt.value;
  }

  onChangeDefaultCountry(evt:any) {
    this.defaultCountry = evt.value;
  }

  arrayRefresh() {
    this.filteredFieldValues;
  }

  addUserConfig() {
    var search1 = {
      requestType: "SEARCH",
      config: {
      fieldType: null,
      value: null,
      code: null,
      order: null,
      default: null,
      configType: "USER"
      }
    }
    this.userConfiguraion.searchConfig(search1).subscribe(data => {
      this.configData = [];
      this.configData = data;
  });
    this.tableshow = false;
    this.updateSuccess = false;
    this.deleteSuccess = false;
    this.addedSuccess = false;
    this.errorFound = false;
    this.forSearch = true;
    var con:any = [];
    var code: any = [];
    var order: any = [];
    if(this.fieldSelect == "Advertising Channel") {
      this.configData.configs.forEach((pt:any) => {
        con.push(pt.value);
        code.push(pt.code);
        order.push(pt.order);
      });
    }
    if(this.fieldSelect == "Config") {
      this.configData.configs.forEach((pt:any) => {
        con.push(pt.value);
        code.push(pt.code);
        order.push(pt.order);
      });
    }

    for(var i=0; i < con.length; i++) {
      if(this.fieldValue == con[i]) {
        this.ptPresent = true;
        return
      } else {
        this.ptPresent = false;
      }
    } 

    if(this.ptPresent == false && this.fieldValue != undefined) {
    for(var i=0; i < code.length; i++) {
      if(this.fieldCode == code[i]) {
        this.ptcodePresent = true;
        return
      } 
      if(this.fieldCode != code[i]) {
        this.ptcodePresent = false;
      }
    } 
   } 
   if(this.ptcodePresent == false && this.fieldCode != undefined) {
    for(var i=0; i < order.length; i++) {
      if(this.fieldOrder == order[i]) {
        this.ptorderPresent = true;
        return
      }
      if(this.fieldOrder != order[i]) {
        this.ptorderPresent = false;
      }
    } 
   }


   if(this.fieldValue == undefined || this.fieldValue == "" || this.fieldValue == null) {
    this.ptPresent = true;
   } else if(this.fieldCode == undefined || this.fieldCode == "" || this.fieldCode == null) {
    this.ptcodePresent = true;
   } else if(this.fieldOrder == undefined || this.fieldOrder == "" || this.fieldOrder == null) {
    this.ptorderPresent = true;
   }

   if((this.fieldValue != null && this.fieldCode != null && this.fieldOrder != null) && (this.ptPresent == false && this.ptcodePresent == false && this.ptorderPresent == false)) {
    this.spinner.show();
    if(this.fieldSelect == "Advertising Channel" || this.fieldSelect == "Config") {
        this.ptPresent = false;
        this.ptcodePresent = false;
        this.ptorderPresent = false;
        this.userConfiguration.patchValue({
          requestType: "ADD",
          config: {
          fieldType: this.requestType,
          value: this.fieldValue,
          code: this.fieldCode,
          order: this.fieldOrder,
          default: this.default,
          configType: "USER"
        },
      });
      
      this.userConfiguraion.addSysConfig(this.userConfiguration.value).subscribe((data:any) => 
      { 
        if(data) {
          this.addedSuccess = true;
          this.spinner.hide();
          this.fieldValue = undefined;
          this.fieldCode = undefined;
          this.fieldOrder = undefined;
          this.getDefaultValues.forEach((df:any) => {
            if(df == false) {
              this.default = df;
            }
          });
        this.codeDefault = false;
        }
    },
      (Error:any) => {
        if(Error.error) {
          this.errorM = Error.error[0].message;
          this.errorFound = true;
          this.spinner.hide();
        } else {
        this.spinner.hide();
        };
      
      });
  } else {
        if(this.fieldSelect == "Country") {
        this.userConfiguration.patchValue({
            requestType: "CREATE",
            configType: this.requestType,
            sourceMarket: {
            name: this.fieldValue,
            code: this.fieldCode,
            default: this.default
            },
          });
          this.ptPresent = false;
          this.ptcodePresent = false;
          this.ptorderPresent = false;
        }
        if(this.fieldSelect == "Brand") {
          this.ptPresent = false;
          this.ptcodePresent = false;
          this.ptorderPresent = false;
          this.userConfiguration.patchValue({
              requestType: "CREATE",
              configType: this.requestType,
              sourceMarket: {
              name: this.countryDrp,
              code: this.countryCode,
              default: this.default,
              brand: [
                        {
                          name: this.fieldValue,
                          code: this.fieldCode,
                          default: this.default,
                          subscriberType: null,
                          qrcodeColour: null
                        }                                                 
                      ]
              },
            });
          }
      this.userConfiguraion.createSourceSysConfig(this.userConfiguration.value).subscribe((data:any) => 
      { 
        if(data) {
          this.addedSuccess = true;
          this.spinner.hide();
          this.fieldValue = "";
          this.fieldCode = "";
          this.fieldOrder = "";
          this.getDefaultValues.forEach((df:any) => {
            if(df == false) {
              this.default = df;
            }
          });
        this.codeDefault = false;
        }
    },
      (Error:any) => {
        if(Error.error) {
          this.errorM = Error.error[0].message;
          this.errorFound = true;
          this.spinner.hide();
        } else {
        this.spinner.hide();
        };
      
      });
  }
 }
}

  searchConfig() {
    this.spinner.show();
    this.updateSuccess = false;
    this.deleteSuccess = false;
    this.addedSuccess = false;
    this.errorFound = false;
    this.ptPresent = false;
    this.ptcodePresent = false;
    this.ptorderPresent = false;
    this.codeDefault = false;
    this.forSearch = false;
    var search:any;
        if(this.fieldSelect == "Brand") {
          this.brandCountry = true;
          if(this.fieldCode == "") {
              search = {
                requestType: "SEARCH",
              }
           } else {
                search = {
                  requestType: "SEARCH",
                  sourceMarket: {
                  code: this.fieldCode,
                  default: this.default
                  }
                }
           }
        this.userConfiguraion.searchSourceSysConfig(search).subscribe((data:any) => 
        { 
          this.filteredFieldValues = [];
          if(data) {
          data.sourceMarkets.forEach((sm:any) => {
              if(sm.code == this.countryCode) {
                this.filteredFieldValues.push(sm.brand);
              }
          });
          this.tableshow = true;
          this.spinner.hide();

          }
      },
        (Error:any) => {
          if(Error.error) {
            this.errorM = Error.error[0].message;
            this.errorFound = true;
            this.spinner.hide();
          } else {
          this.spinner.hide();
          };
        });
      }
      if(this.fieldSelect == "Country") {
        this.brandCountry = true;
        if(this.fieldCode == "") {
            search = {
              requestType: "SEARCH",
            }
         } else {
              search = {
                requestType: "SEARCH",
                sourceMarket: {
                code: this.fieldCode,
                default: this.default
                }
              }
         }
      this.userConfiguraion.searchSourceSysConfig(search).subscribe((data:any) => 
      { 
        this.filteredFieldValues = [];
        if(data) {
        this.filteredFieldValues.push(data.sourceMarkets);
        this.tableshow = true;
        this.spinner.hide();

        }
    },
      (Error:any) => {
        if(Error.error) {
          this.spinner.hide();
        } else {
        this.spinner.hide();
        };
      });
    }
      if(this.fieldSelect == "Advertising Channel" || this.fieldSelect == "Config") {
         this.brandCountry = false;
         search = {
          requestType: "SEARCH",
          config: {
          fieldType: this.requestType,
          value: this.fieldValue,
          code: this.fieldCode,
          order: this.fieldOrder,
          default: this.default,
          configType: "USER"
          }
        }
        this.userConfiguraion.searchConfig(search).subscribe((data:any) => 
        { 
          this.filteredFieldValues = [];
          if(data) {
          this.filteredFieldValues.push(data.configs);
          this.tableshow = true;
          this.spinner.hide();
          }
      },
        (Error:any) => {
          if(Error.error) {
            this.spinner.hide();
          } else {
          this.spinner.hide();
          };
        });
      }
  }

  deleteSysConfig() {
     this.tableshow = false;
    this.updateSuccess = false;
    this.deleteSuccess = false;
    this.addedSuccess = false;
    this.errorFound = false;
    this.forSearch = true;
    if(this.fieldSelect == "Advertising Channel" || this.fieldSelect == "Config") {
      this.spinner.show();
      this.userConfiguration.patchValue({
        requestType: "DELETE",
        config: {
        fieldType: this.requestType,
        value: this.fieldValue,
        code: this.fieldCode,
        order: this.fieldOrder,
        default: this.default,
        configType: "USER"
    },
      });
      this.userConfiguraion.deleteConfig(this.userConfiguration.value).subscribe((data:any) => 
      { 
        if(data) {
          this.deleteSuccess = true;
          this.spinner.hide();
          this.fieldValue = "";
          this.fieldCode = "";
          this.fieldOrder = "";
          this.getDefaultValues.forEach((df:any) => {
            if(df == false) {
              this.default = df;
            }
          });
          this.codeDefault = false;
        }
     },
      (Error:any) => {
        if(Error.error) {
          this.spinner.hide();
        } else {
         this.spinner.hide();
        };
       
      });
     
    } else {
      if(this.fieldSelect == "Country") {
        this.spinner.show();
        this.userConfiguration.patchValue({
            requestType: "DELETE",
            configType: this.requestType,
            sourceMarket: {
              name: this.fieldValue,
              code: this.fieldCode,
              default: this.default,
              },
          });
        } 
        if(this.fieldSelect == "Brand") {
          this.spinner.show();
          this.userConfiguration.patchValue({
              requestType: "DELETE",
              configType: this.requestType,
              sourceMarket: {
              name: this.countryDrp,
              code: this.countryCode,
              default: this.default,
              brand: [
                        {
                          name: this.fieldValue,
                          code: this.fieldCode,
                          default: this.default,
                          subscriberType: null,
                          qrcodeColour: null
                        }                                                 
                      ]
              },
            });
          }

         this.userConfiguraion.deleteSourceSysConfig(this.userConfiguration.value).subscribe((data:any) => 
         { 
           if(data) {
             this.deleteSuccess = true;
             this.spinner.hide();
             this.fieldValue = "";
             this.fieldCode = "";
             this.fieldOrder = "";
             this.getDefaultValues.forEach((df:any) => {
               if(df == false) {
                 this.default = df;
               }
             });
             this.codeDefault = false;
           }
        },
         (Error:any) => {
           if(Error.error) {
             this.spinner.hide();
           } else {
            this.spinner.hide();
           };
          
         });
    }
   
  }
  
  updateSysConfig() {
     this.tableshow = false;
    this.updateSuccess = false;
    this.deleteSuccess = false;
    this.addedSuccess = false;
    this.errorFound = false;
    this.forSearch = true;
    var con:any = [];
    var code: any = [];
    var order: any = [];
    if(this.fieldSelect == "Advertising Channel") {
      this.configData.configs.forEach((pt:any) => {
        con.push(pt.value);
        code.push(pt.code);
        order.push(pt.order);
      });
    }
    if(this.fieldSelect == "Config") {
      this.configData.configs.CONFIG.forEach((pt:any) => {
        con.push(pt.value);
        code.push(pt.code);
        order.push(pt.order);
      });
    }

   if((this.fieldValue != null && this.fieldCode != null && this.fieldOrder != null) && (this.ptPresent == false && this.ptcodePresent == false && this.ptorderPresent == false)) {
    if(this.fieldSelect == "Advertising Channel" || this.fieldSelect == "Config") {
        this.userConfiguration.patchValue({
              requestType: "UPDATE",
              config: {
              fieldType: this.requestType,
              value: this.fieldValue,
              code: this.fieldCode,
              order: this.fieldOrder,
              default: this.default,
              configType: "USER"
          },
        });

        this.userConfiguraion.updateSysConfig(this.userConfiguration.value).subscribe((data:any) => 
        { 
          this.spinner.show();
          if(data) {
            this.updateSuccess = true;
            this.spinner.hide();
            this.getDefaultValues.forEach((df:any) => {
              if(df == false) {
                this.default = df;
              }
            });
            this.codeDefault = false;
          }
      },
        (Error:any) => {
          if(Error.error) {
            this.spinner.hide();
          } else {
          this.spinner.hide();
          };
        
        });
    } else {
          if(this.fieldSelect == "Country") {
          this.userConfiguration.patchValue({
              requestType: "UPDATE",
              configType: this.requestType,
              sourceMarket: {
                name: this.fieldValue,
                code: this.fieldCode,
                default: this.default,
                },
            });
          } 
          if(this.fieldSelect == "Brand") {
            this.userConfiguration.patchValue({
                requestType: "UPDATE",
                configType: this.requestType,
                sourceMarket: {
                name: this.countryDrp,
                code: this.countryCode,
                default: this.default,
                brand: [
                          {
                            name: this.fieldValue,
                            code: this.fieldCode,
                            default: this.default,
                            subscriberType: null,
                            qrcodeColour: null
                          }                                                 
                        ]
                },
              });
            }
      this.userConfiguraion.updateSourceSysConfig(this.userConfiguration.value).subscribe((data:any) => 
      { 
        this.spinner.show();
        if(data) {
          this.updateSuccess = true;
          this.spinner.hide();
          this.getDefaultValues.forEach((df:any) => {
            if(df == false) {
              this.default = df;
            }
          });
          this.codeDefault = false;
        }
    },
      (Error:any) => {
        if(Error.error) {
          this.spinner.hide();
        } else {
        this.spinner.hide();
        };
      
      });
    }
  }    
      
  }
  
  searchField(row:any) {
    this.addDisabled = true;
    this.updateDisabled = false;
    this.deleteDisabled = false;
    this.forSearch = true;
    if(this.fieldSelect == "Advertising Channel" || this.fieldSelect == "Config") {
    this.fieldValue = row.value;
    this.newArr = this.filteredFieldValues[0].filter((item:any) => item.default == true );
    if(this.newArr.length == 1) {
      this.disableButton = true;
    }
    else {
      this.disableButton = false;
    }
    } else {
      this.fieldValue = row.name;
    }
    this.fieldCode = row.code;
    this.fieldOrder = row.order;
    if(row.default == true) {
      this.default = "True";
    }
    else {
      this.default = "False";
    }
    this.codeDefault = true;
    this.disableAdd = true;
    this.disableResetBtn = false;
  }

  resetSystemConfig() {
    this.disableTrueValue();
    this.addDisabled = false;
    this.updateDisabled = true;
    this.deleteDisabled = true;
    this.fieldOrder = '';
    this.fieldValue = '';
    this.default = "False";
    this.codeDefault = false;
    this.fieldCode = '';
    this.filteredFieldValues[0] = [];
    this.tableshow = false;
    this.disableAdd = false;
    this.disableResetBtn = true;
    this.addedSuccess = false;
    this.updateSuccess = false;
    this.deleteSuccess = false;
    this.errorFound = false;
    this.ptPresent = false;
    this.ptcodePresent = false;
    this.ptorderPresent = false;
    this.userConfiguration = new FormGroup({});
    this.req = false;
    this.forSearch = true;
  }

}

