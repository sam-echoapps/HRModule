define(['ojs/ojcore',"knockout","jquery","appController", "ojs/ojarraydataprovider", "ojs/ojfilepickerutils",
    "ojs/ojinputtext", "ojs/ojformlayout", "ojs/ojvalidationgroup", "ojs/ojselectsingle","ojs/ojdatetimepicker",
     "ojs/ojfilepicker", "ojs/ojpopup", "ojs/ojprogress-circle", "ojs/ojdialog","ojs/ojtable"], 
    function (oj,ko,$, app, ArrayDataProvider, FilePickerUtils) {

        class EmployeeGoalsList {
            constructor(args) {
                var self = this;

                self.router = args.parentRouter;
                let BaseURL = sessionStorage.getItem("BaseURL")
                
                self.GoalDet = ko.observableArray([]); 
                self.CancelBehaviorOpt = ko.observable('icon'); 
                self.yearFilter = ko.observable('');
                self.GoalYearDet = ko.observableArray([]);
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
                        url: BaseURL+"/HRModuleGetEmployeeGoalList",
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
                                    self.GoalDet.push({'no': i+1,'id': data[0][i][0],'emp_id': "EMP"+data[0][i][0],'name': data[0][i][1] +" "+ data[0][i][2],'goal_count': data[0][i][3]  });
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

               
                self.messageClose = ()=>{
                    location.reload();
                }
              
                

                self.viewGoal = (event,data)=>{
                    var clickedStaffId = data.item.data.id
                    console.log(clickedStaffId)
                    sessionStorage.setItem("staffId", clickedStaffId);
                    self.router.go({path:'employeeGoals'})
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
                            url: BaseURL  + "/HRModuleGetEmployeeGoalList",
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
                                        self.GoalDet.push({'no': i+1,'id': data[0][i][0],'emp_id': "EMP"+data[0][i][0],'name': data[0][i][1] +" "+ data[0][i][2],'goal_count': data[0][i][3]  });
                                    }
                                }
                        }
                        })
                    }
                       
                    }
                    self.dataProvider = new ArrayDataProvider(this.GoalDet, { keyAttributes: "id"});

                   

            }
        }
        return  EmployeeGoalsList;
    }
);