define(['ojs/ojcore',"knockout","jquery","appController", "ojs/ojarraydataprovider", "ojs/ojfilepickerutils",
    "ojs/ojinputtext", "ojs/ojformlayout", "ojs/ojvalidationgroup", "ojs/ojselectsingle","ojs/ojdatetimepicker",
     "ojs/ojfilepicker", "ojs/ojpopup", "ojs/ojprogress-circle", "ojs/ojdialog","ojs/ojtable"], 
    function (oj,ko,$, app, ArrayDataProvider, FilePickerUtils) {

        class AddHoliday {
            constructor(args) {
                var self = this;

                self.router = args.parentRouter;
                let BaseURL = sessionStorage.getItem("BaseURL")
                
                self.holidayName = ko.observable();
                self.holidayDate = ko.observable();
                self.comments = ko.observable();
                self.HolidayDet = ko.observableArray([]); 

                self.connected = function () {
                    if (sessionStorage.getItem("userName") == null) {
                        self.router.go({path : 'signin'});
                    }
                    else {
                        app.onAppSuccess();
                        getHoliday();
                    }
                }

                function getHoliday(){
                    self.HolidayDet([]);
                    document.getElementById('loaderView').style.display='block';
                    $.ajax({
                        url: BaseURL+"/HRModuleGetHoliday",
                        type: 'GET',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        error: function (xhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        },
                        success: function (data) {
                            console.log(data)
                            document.getElementById('loaderView').style.display='none';
                            document.getElementById('contentView').style.display='block';
                            document.getElementById('actionView').style.display='block';
                            if(data[0].length !=0){ 
                                for (var i = 0; i < data[0].length; i++) {
                                    self.HolidayDet.push({'id': data[0][i][0],'holiday_name': data[0][i][1],'holiday_date': data[0][i][2],'comments': data[0][i][3]  });
                                }
                            }
                        }
                    })
                }

                self.dataProvider = new ArrayDataProvider(this.HolidayDet, { keyAttributes: "id"});

                self.formSubmit = ()=>{
                    const formValid = self._checkValidationGroup("formValidation"); 
                    if (formValid) {
                            let popup = document.getElementById("loaderPopup");
                            popup.open();
                            
                            $.ajax({
                                url: BaseURL+"/HRModuleAddHoliday",
                                type: 'POST',
                                data: JSON.stringify({
                                    holiday_name : self.holidayName(),
                                    holiday_date : self.holidayDate(),
                                    comments : self.comments(),
                                }),
                                dataType: 'json',
                                timeout: sessionStorage.getItem("timeInetrval"),
                                context: self,
                                error: function (xhr, textStatus, errorThrown) {
                                    console.log(textStatus);
                                },
                                success: function (data) {
                                    let popup = document.getElementById("loaderPopup");
                                    popup.close();
                                    let popup1 = document.getElementById("successView");
                                    popup1.open();
                                }
                            })
                        }
                    }

                self.messageClose = ()=>{
                    location.reload();
                }
              
                self._checkValidationGroup = (value) => {
                    const tracker = document.getElementById(value);
                    if (tracker.valid === "valid") {
                        return true;
                    }
                    else {
                        tracker.showMessages();
                        tracker.focusOn("@firstInvalidShown");
                        return false;
                    }
                };

                self.deleteHoliday = (event,data)=>{
                    var rowId = data.item.data.id
                    $.ajax({
                        url: BaseURL+"/HRModuleDeleteHoliday",
                        type: 'POST',
                        data: JSON.stringify({
                            holidayId : rowId
                        }),
                        dataType: 'json',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        error: function (xhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        },
                        success: function (data) {
                            location.reload()
                        }
                    })
                }

            }
        }
        return  AddHoliday;
    }
);