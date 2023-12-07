define(['ojs/ojcore',"knockout","jquery","appController", "ojs/ojarraydataprovider", "ojs/ojfilepickerutils",
    "ojs/ojinputtext", "ojs/ojformlayout", "ojs/ojvalidationgroup", "ojs/ojselectsingle","ojs/ojdatetimepicker",
     "ojs/ojfilepicker", "ojs/ojpopup", "ojs/ojprogress-circle", "ojs/ojdialog","ojs/ojtable"], 
    function (oj,ko,$, app, ArrayDataProvider, FilePickerUtils) {

        class EmployeeGoals {
            constructor(args) {
                var self = this;

                self.router = args.parentRouter;
                let BaseURL = sessionStorage.getItem("BaseURL")
                
                self.goalSubject = ko.observable();
                self.description = ko.observable();
                self.startDate = ko.observable('');
                self.endDate = ko.observable('');
                self.comments = ko.observable('');
                self.GoalDet = ko.observableArray([]); 
                self.CancelBehaviorOpt = ko.observable('icon'); 
                self.yearFilter = ko.observable('');
                self.GoalYearDet = ko.observableArray([]);
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
                self.connected = function () {
                    if (sessionStorage.getItem("userName") == null) {
                        self.router.go({path : 'signin'});
                    }
                    else {
                        app.onAppSuccess();
                        getGoals();
                    }
                }

                function getGoals(){
                    self.GoalDet([]);
                    document.getElementById('loaderView').style.display='block';
                    $.ajax({
                        url: BaseURL+"/HRModuleGetEmployeeGoal",
                        type: 'POST',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        data: JSON.stringify({
                            staffId : sessionStorage.getItem("staffId")
                        }),
                        error: function (xhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        },
                        success: function (data) {
                            console.log(data)
                            document.getElementById('loaderView').style.display='none';
                            document.getElementById('actionView').style.display='block';
                            if(data[0].length !=0){ 
                                for (var i = 0; i < data[0].length; i++) {
                                    self.GoalDet.push({'no': i+1,'id': data[0][i][0],'goal_subject': data[0][i][1],'description': data[0][i][2],'start_date': data[0][i][3],'end_date': data[0][i][4],'status': data[0][i][5]  });
                                }
                            }
                            if(data[1].length !=0){ 
                                for (var i = 0; i < data[1].length; i++) {
                                    self.GoalYearDet.push({"label":data[1][i][0],"value":data[1][i][0]});
                                }
                                self.GoalYearDet.unshift({ value: 'All', label: 'All' });
                            }
                        }
                    })
                }

                self.yearList = new ArrayDataProvider(this.GoalYearDet, { keyAttributes: "value"});

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

                self.deleteGoal = (event,data)=>{
                    var rowId = data.item.data.id
                    $.ajax({
                        url: BaseURL+"/HRModuleDeleteGoal",
                        type: 'POST',
                        data: JSON.stringify({
                           goalId : rowId
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
                        self.GoalDet([]);
                        $.ajax({
                            url: BaseURL  + "/HRModuleGetYearGoalEmployeeFilter",
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
                                        self.GoalDet.push({'no': i+1,'id': data[0][i][0],'goal_subject': data[0][i][1],'description': data[0][i][2],'start_date': data[0][i][3],'end_date': data[0][i][4],'status': data[0][i][5]  });
                                    }
                                }
                        }
                        })
                    }
                       
                    }
                    self.dataProvider = new ArrayDataProvider(this.GoalDet, { keyAttributes: "id"});

                    self.reviewGoal = (event,data)=>{
                        var rowId = data.item.data.id
                        document.querySelector('#openReviewGoal').open();
                        document.getElementById('loaderView').style.display='block';
                        $.ajax({
                            url: BaseURL+"/HRModuleGetEmployeeGoalInfo",
                            type: 'POST',
                            timeout: sessionStorage.getItem("timeInetrval"),
                            context: self,
                            data: JSON.stringify({
                                goalId : rowId
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
                                    self.goalSubject(data[0][1])
                                    self.description(data[0][2])
                                    self.startDate(data[0][3])
                                    self.endDate(data[0][4])
                                    self.status(data[0][5])
                                }
                            }
                        })
                    }

            }
        }
        return  EmployeeGoals;
    }
);