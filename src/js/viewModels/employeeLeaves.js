define(['ojs/ojcore',"knockout","jquery","appController", "ojs/ojarraydataprovider", "ojs/ojfilepickerutils",
    "ojs/ojinputtext", "ojs/ojformlayout", "ojs/ojvalidationgroup", "ojs/ojselectsingle","ojs/ojdatetimepicker",
     "ojs/ojfilepicker", "ojs/ojpopup", "ojs/ojprogress-circle", "ojs/ojdialog","ojs/ojtable"], 
    function (oj,ko,$, app, ArrayDataProvider, FilePickerUtils) {

        class EmployeeLeaves {
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
                self.comments = ko.observable('');
                self.status = ko.observable();
                self.statusList = ko.observableArray([]);
                self.statusList.push(
                    {"label":"Pending","value":"Pending"},
                    {"label":"Under Review","value":"Under Review"},
                    {"label":"Reject","value":"Reject"},
                    {"label":"Approve","value":"Approve"},
                );
                self.statusList = new ArrayDataProvider(self.statusList, {
                    keyAttributes: 'value'
                });   
                self.leaveId = ko.observable();

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
                        url: BaseURL+"/HRModuleGetEmployeeLeave",
                        type: 'POST',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        data: JSON.stringify({
                            staffId : sessionStorage.getItem("staffId")
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
                                    self.LeaveDet.push({'no': i+1,'id': data[i][0],'start_date': data[i][1],'end_date': data[i][2],'leave_type': data[i][3],'description': data[i][4],'status': data[i][5],'comments': data[i][6]  });
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
                                url: BaseURL+"/HRModuleAddGoal",
                                type: 'POST',
                                data: JSON.stringify({
                                    staffId : sessionStorage.getItem("userId"),
                                    goal_subject : self.goalSubject(),
                                    description : self.description(),
                                    start_date : self.startDate(),
                                    end_date : self.endDate(),
                                }),
                                dataType: 'json',
                                timeout: sessionStorage.getItem("timeInetrval"),
                                context: self,
                                error: function (xhr, textStatus, errorThrown) {
                                    console.log(textStatus);
                                },
                                success: function (data) {
                                    document.querySelector('#openAddGoal').close();
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

                self.deleteLeave = (event,data)=>{
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

                self.addGoal = ()=>{
                    document.querySelector('#openAddGoal').open();
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
                            url: BaseURL  + "/HRModuleGetYearLeaveEmployeeFilter",
                            type: 'POST',
                            data: JSON.stringify({
                                staffId : sessionStorage.getItem("staffId"),
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
                                console.log(data)
                                if(data[0].length !=0){ 
                                    for (var i = 0; i < data[0].length; i++) {
                                        self.LeaveDet.push({'no': i+1,'id': data[0][i][0],'start_date': data[0][i][1],'end_date': data[0][i][2],'leave_type': data[0][i][3],'description': data[0][i][4],'status': data[0][i][5],'comments': data[0][i][6]  });
                                    }
                                }
                        }
                        })
                    }
                       
                    }
                    self.dataProvider = new ArrayDataProvider(this.LeaveDet, { keyAttributes: "id"});

                    self.reviewLeave = (event,data)=>{
                        var rowId = data.item.data.id
                        self.leaveId(rowId)
                        document.querySelector('#openReviewLeave').open();
                        document.getElementById('loaderView').style.display='block';
                        $.ajax({
                            url: BaseURL+"/HRModuleGetEmployeeLeaveInfo",
                            type: 'POST',
                            timeout: sessionStorage.getItem("timeInetrval"),
                            context: self,
                            data: JSON.stringify({
                                leaveId : rowId
                            }),
                            error: function (xhr, textStatus, errorThrown) {
                                console.log(textStatus);
                            },
                            success: function (result) {
                                console.log(result)
                                if(result[0].length !=0){ 
                                    document.getElementById('loaderView').style.display='none';
                                    var data = JSON.parse(result[0]);
                                    console.log(data)
                                    self.startDate(data[0][1])
                                    self.endDate(data[0][2])
                                    self.description(data[0][3])
                                    self.status(data[0][5])
                                    self.leaveType(data[0][6])
                                    self.comments(data[0][7])
                                }
                            }
                        })
                    }

                    self.formReviewSubmit = (event,data)=>{
                        const formValid = self._checkValidationGroup("formValidationReview"); 
                        if (formValid) {
                                let popup = document.getElementById("loaderPopup");
                                popup.open();
                                
                                $.ajax({
                                    url: BaseURL+"/HRModuleReviewLeaveStatus",
                                    type: 'POST',
                                    data: JSON.stringify({
                                        leaveId : self.leaveId(),
                                        status : self.status(),
                                        comments : self.comments(),
                                    }),
                                    dataType: 'json',
                                    timeout: sessionStorage.getItem("timeInetrval"),
                                    context: self,
                                    error: function (xhr, textStatus, errorThrown) {
                                        console.log(textStatus);
                                    },
                                    success: function (data) {
                                        document.querySelector('#openReviewLeave').close();
                                        let popup = document.getElementById("loaderPopup");
                                        popup.close();
                                        let popup2 = document.getElementById("successStatus");
                                        popup2.open();
                                    }
                                })
                            }
                        }
    

            }
        }
        return  EmployeeLeaves;
    }
);