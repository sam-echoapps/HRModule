define(['ojs/ojcore',"knockout","jquery","appController", "ojs/ojarraydataprovider", "ojs/ojfilepickerutils",
    "ojs/ojinputtext", "ojs/ojformlayout", "ojs/ojvalidationgroup", "ojs/ojselectsingle","ojs/ojdatetimepicker",
     "ojs/ojfilepicker", "ojs/ojpopup", "ojs/ojprogress-circle", "ojs/ojdialog","ojs/ojtable"], 
    function (oj,ko,$, app, ArrayDataProvider, FilePickerUtils) {

        class StaffLeave {
            constructor(args) {
                var self = this;

                self.router = args.parentRouter;
                let BaseURL = sessionStorage.getItem("BaseURL")
                
                self.startDate = ko.observable('');
                self.endDate = ko.observable('');
                self.description = ko.observable('');
                self.CancelBehaviorOpt = ko.observable('icon'); 
                self.yearFilter = ko.observable('');
                self.LeaveYearDet = ko.observableArray([]);
                self.leaveType = ko.observable('');
                self.LeaveTypeDet = ko.observableArray([]); 
                self.LeaveDet = ko.observableArray([]); 
                
                self.connected = function () {
                    if (sessionStorage.getItem("userName") == null) {
                        self.router.go({path : 'signin'});
                    }
                    else {
                        app.onAppSuccess();
                        getLeaves();
                        getLeaveDetails()
                    }
                }

                function getLeaves(){
                    self.LeaveDet([]);
                    document.getElementById('loaderView').style.display='block';
                    $.ajax({
                        url: BaseURL+"/HRModuleGetLeave",
                        type: 'POST',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        data: JSON.stringify({
                            staffId : sessionStorage.getItem("userId")
                        }),
                        error: function (xhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        },
                        success: function (result) {
                            console.log(result)
                            document.getElementById('loaderView').style.display='none';
                            document.getElementById('actionView').style.display='block';
                            var data = JSON.parse(result[0]);
                            if(data.length !=0){ 
                                for (var i = 0; i < data.length; i++) {
                                    self.LeaveDet.push({'no': i+1,'id': data[i][0],'start_date': data[i][1],'end_date': data[i][2],'leave_type': data[i][3],'description': data[i][4],'status': data[i][5]  });
                                }
                            }
                            if(result[1].length !=0){ 
                                for (var i = 0; i < result[1].length; i++) {
                                    self.LeaveYearDet.push({"label":result[1][i][0],"value":result[1][i][0]});
                                }
                                self.LeaveYearDet.unshift({ value: 'All', label: 'All' });
                            }
                        }
                    })
                }

                function getLeaveDetails(){
                    self.LeaveTypeDet([]);
                    document.getElementById('loaderView').style.display='block';
                    $.ajax({
                        url: BaseURL+"/HRModuleGetLeaveDetails",
                        type: 'GET',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        error: function (xhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        },
                        success: function (data) {
                            console.log(data)
                            document.getElementById('loaderView').style.display='none';
                            if(data[1].length !=0){ 
                                for (var i = 0; i < data[1].length; i++) {
                                    console.log(data[1][i][0])
                                    self.LeaveTypeDet.push({"label": data[1][i][1],"value": data[1][i][0]});
                                }
                            }
                        }
                    })
                }
                self.LeaveTypeList = new ArrayDataProvider(self.LeaveTypeDet, { keyAttributes: "value"});

                self.yearList = new ArrayDataProvider(this.LeaveYearDet, { keyAttributes: "value"});

                self.formSubmit = ()=>{
                    const formValid = self._checkValidationGroup("formValidation"); 
                    if (formValid) {
                            let popup = document.getElementById("loaderPopup");
                            popup.open();
                            
                            $.ajax({
                                url: BaseURL+"/HRModuleAddLeave",
                                type: 'POST',
                                data: JSON.stringify({
                                    staffId : sessionStorage.getItem("userId"),
                                    start_date : self.startDate(),
                                    end_date : self.endDate(),
                                    leave_type : self.leaveType(),
                                    description : self.description(),
                                }),
                                dataType: 'json',
                                timeout: sessionStorage.getItem("timeInetrval"),
                                context: self,
                                error: function (xhr, textStatus, errorThrown) {
                                    console.log(textStatus);
                                },
                                success: function (data) {
                                    console.log(data)
                                    document.querySelector('#openAddLeave').close();
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

                self.deleteGoal = (event,data)=>{
                    var rowId = data.item.data.id
                    $.ajax({
                        url: BaseURL+"/HRModuleDeleteLeave",
                        type: 'POST',
                        data: JSON.stringify({
                           leaveId : rowId
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

                self.addLeave = ()=>{
                    document.querySelector('#openAddLeave').open();
                }

                self.filterYear = function (event,data) {
                    if(self.yearFilter() == ''){
                        const currentYear = new Date().getFullYear();
                        console.log(currentYear);
                        self.yearFilter(currentYear)
                    }
                    if (self.yearFilter() != '' ) {
                        document.getElementById('loaderView').style.display='block';
                        self.LeaveDet([]);
                        $.ajax({
                            url: BaseURL  + "/HRModuleGetYearLeaveFilterList",
                            type: 'POST',
                            data: JSON.stringify({
                                staffId : sessionStorage.getItem("userId"),
                                year : self.yearFilter()
                            }),
                            dataType: 'json',
                            timeout: sessionStorage.getItem("timeInetrval"),
                            context: self,
                            error: function (xhr, textStatus, errorThrown) {
                                if(textStatus == 'timeout' || textStatus == 'error'){
                                    document.querySelector('#TimeoutSup').open();
                                }
                            },
                            success: function (data) {
                                document.getElementById('loaderView').style.display='none';
                                document.getElementById('actionView').style.display='block';
                                // var data = JSON.parse(result[0]);
                                console.log(data)
                                if(data[0].length !=0){ 
                                    for (var i = 0; i < data[0].length; i++) {
                                        self.LeaveDet.push({'no': i+1,'id': data[0][i][0],'start_date': data[0][i][1],'end_date': data[0][i][2],'leave_type': data[0][i][3],'description': data[0][i][4],'status': data[0][i][5]  });
                                    }
                                }
                        }
                        })
                    }
                       
                    }
                    self.dataProvider = new ArrayDataProvider(this.LeaveDet, { keyAttributes: "id"});

                    self.notifyManager = ()=>{
                        document.querySelector('#confirmPopup').open();
                    }

                    self.sendNotification = ()=>{
                        let popup2 = document.getElementById("confirmPopup");
                        popup2.close();                            
                            $.ajax({
                                url: BaseURL+"/HRModuleLeaveNotifyManager",
                                type: 'POST',
                                data: JSON.stringify({
                                    staffId : sessionStorage.getItem("userId"),
                                }),
                                dataType: 'json',
                                timeout: sessionStorage.getItem("timeInetrval"),
                                context: self,
                                error: function (xhr, textStatus, errorThrown) {
                                    console.log(textStatus);
                                },
                                success: function (data) {
                                    let popup2 = document.getElementById("confirmPopup");
                                    popup2.close();
                                    let popup3 = document.getElementById("successMail");
                                    popup3.open();
                                }
                            })
                        }
        

            }
        }
        return  StaffLeave;
    }
);