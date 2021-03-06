﻿/*
 * 
 * Copyright © 2006-2017 TenaCareeHMIS  software, by The Administrators of the Tulane Educational Fund, 
 * dba Tulane University, Center for Global Health Equity is distributed under the GNU General Public License(GPL).
 * All rights reserved.

 * This file is part of TenaCareeHMIS
 * TenaCareeHMIS is free software: 
 * 
 * you can redistribute it and/or modify it under the terms of the 
 * GNU General Public License as published by the Free Software Foundation, 
 * version 3 of the License, or any later version.
 * TenaCareeHMIS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or 
 * FITNESS FOR A PARTICULAR PURPOSE.See the GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License along with TenaCareeHMIS.  
 * If not, see http://www.gnu.org/licenses/.    
 * 
 * 
 */

app.controller('ipdDiseaseCtrl', function ($scope, $timeout, myService, LanguageFactory) {
    var ethioyear;
    var ethiomonth;
    var quarter;

                    $scope.title = {};
                    $scope.status = {};
                    $scope.dataEntry = {};
                    $scope.selectedyear = "";

                    var className = "dataEntry";

                    var lang = $scope.languageSet;

                    $scope.getLanguageLabel = function (lang, className) {
                        LanguageFactory.getLanguageLabelService(lang, className)
		                .then(function (data) {
		                    $scope.values = data;

		                    for (var i = 0; i < $scope.values.length; i++) {
		                        $scope.dataEntry[$scope.values[i].indexName] = $scope.values[i].LanguageName;
		                    }

		                    $scope.title = $scope.dataEntry['ipdOfficialReport'];
		                    $scope.init = function () {
		                        initCurrentDate();
		                    }		                    

		                    $scope.options = [{ name: $scope.dataEntry['hamle'], value: 11 }, { name: $scope.dataEntry['nehase'], value: 12 },
                                     { name: $scope.dataEntry['meskerem'], value: 1 }, { name: $scope.dataEntry['tikimt'], value: 2 },
                                     { name: $scope.dataEntry['hidar'], value: 3 }, { name: $scope.dataEntry['tahisas'], value: 4 },
                                     { name: $scope.dataEntry['tir'], value: 5 }, { name: $scope.dataEntry['yekatit'], value: 6 },
                                     { name: $scope.dataEntry['megabit'], value: 7 }, { name: $scope.dataEntry['miyazia'], value: 8 },
                                     { name: $scope.dataEntry['ginbot'], value: 9 }, { name: $scope.dataEntry['sene'], value: 10 }];


		                    $scope.periodOptions = [{ name: $scope.dataEntry['monthly'], value: 1 },
                                { name: $scope.dataEntry['quarterly'], value: 2 }];
		                    $scope.selectedPeriod = $scope.periodOptions[0];

		                    $scope.quarterOptions = [{ name: "1", value: 1 }, { name: "2", value: 2 }, { name: "3", value: 3 }, { name: "4", value: 4 }];
		                    $scope.reportString = $scope.dataEntry['ipdDiseaseMorbidityAndMortalityMonthlyReport'];
		                    $scope.reportType = $scope.dataEntry['ipdOfficialReport'];

		                    $scope.init();
		                })
                    }

                    lang = localStorage.getItem('languageSet', 'english');

                    $scope.getLanguageLabel(lang, className);

   
    var initCurrentDate = function () {
        Date.prototype.getJulian = function () {
            return Math.floor((this / 86400000) - (this.getTimezoneOffset() / 1440) + 2440587.5);
        }

        var today = new Date(); //set any date
        var julian = today.getJulian(); //get Julian counterpart 

        var ec = $.calendars.instance('ethiopian').fromJD(julian);
        ethioyear = ec.year();
        ethiomonth = ec.month();
        quarter = getQuarterFromMonth(ethiomonth, ethioyear);

        if (ethiomonth == 11) {
            $scope.selectedMonth = $scope.options[0];
            $scope.selectedMonthEnd = $scope.options[0];
        }
        else if (ethiomonth == 12) {
            $scope.selectedMonth = $scope.options[1];
            $scope.selectedMonthEnd = $scope.options[1];
        }
        else {
            $scope.selectedMonth = $scope.options[ethiomonth + 1];
            $scope.selectedMonthEnd = $scope.options[ethiomonth + 1];
        }
        //$scope.selectedYear = parseInt(ethioyear);
        //  $scope.selectedQuarter = quarter.quarter.toString();
    }

   
    //$scope.selectedQuarter = $scope.quarterOptions[1];
    $scope.showMonthlyReport = true;   
    $scope.checkedState = false;


    /***************** A function than change the selection period **************/
    $scope.ChangePeriod = function () {
        if ($scope.selectedPeriod.value == 1) {
            $scope.showMonthlyReport = true;
            $scope.showQuarterReport = false;
            if (ethiomonth == 11) {
                $scope.selectedMonth = $scope.options[0];
                $scope.selectedMonthEnd = $scope.options[0];
            }
            else if (ethiomonth == 12) {
                $scope.selectedMonth = $scope.options[1];
                $scope.selectedMonthEnd = $scope.options[1];
            }
            else {
                $scope.selectedMonth = $scope.options[ethiomonth + 1];
                $scope.selectedMonthEnd = $scope.options[ethiomonth + 1];
            }
            //$scope.selectedYear = parseInt(ethioyear);
        }
        else if ($scope.selectedPeriod.value == 2) {
            $scope.showQuarterReport = true;
            $scope.showMonthlyReport = false;
            //$scope.selectedYear = parseInt(quarter.year);
            //$scope.selectedQuarter = $scope.quarterOptions[quarter.quarter - 1];
            //$scope.quarterEnd = $scope.quarterOptions[quarter.quarter - 1];
        }

    }
   
    $scope.perodChange = function () {

    }
    $scope.getValues = function (id, locationId, year, month, reportType) {
        myService.getValuesService(id, locationId, year, month, reportType)
        .then(function (data) {
            console.log("Values Data" + data);
            $scope.values = data;

            var employees = {};
            $scope.labelidvalues = {};
            for (var i = 0; i < $scope.values.length; i++) {
                if ($scope.values[i].dataEleClass == 2) {
                    $scope.labelidvalues[$scope.values[i].labelId + 'M'] = $scope.values[i].value;
                }
                else {
                    $scope.labelidvalues[$scope.values[i].labelId + 'MM'] = $scope.values[i].value;
                }
            }

            console.log("labeidvalues = " + $scope.labelidvalues['869M']);
            console.log("labeidvalues = " + $scope.labelidvalues['869MM']);

        });

    }


    var getQuarterFromMonth = function (month, year) {
        if (month < 1 || month >= 11) {
            return { "year": year + 1, "quarter": 1 };
        }
        else if (month == 1) {
            return { "year": year, "quarter": 1 };
        }
        else if (month >= 2 || month <= 4) {
            return { "year": year, "quarter": 2 };
        }
        else if (month >= 5 || month <= 7) {
            return { "year": year, "quarter": 3 };
        }
        else if (month >= 8 || month <= 10) {
            return { "year": year, "quarter": 4 };
        }
    }
    $scope.getIpdDictionary = function () {
        myService.getIPDDictionaryService()
        .then(function (data) {
            $scope.ipdDictionarydata = data;
        });
    }

    $scope.hideParams = function () {
        $scope.show_params = false;
        $('#toggle-params').prop('checked', false);
    }
  
    $scope.getIpdReport = function (id, selectedmonth, selectedMonthEnd, selectedQuarter, selectedQuarterEnd, selectedyear, checkedState) {
        //$scope.getLocationId();
        // $scope.getLocationName();
        $scope.LocationName = temphierarchy[0].FacilityName;
        if (selectedmonth != 0) {
            $scope.reportTypeValue = $scope.selectedMonth.name;
            $scope.reportString = $scope.dataEntry['ipdDiseaseMorbidityAndMortalityMonthlyReport'];
            $scope.reportType = $scope.dataEntry['startMonth'] + ":" + $scope.selectedMonth.name + ", " + $scope.dataEntry['endMonth'] + ":" + $scope.selectedMonthEnd.name;
        }
        else if (selectedQuarter != 0) {
            $scope.reportTypeValue = $scope.selectedQuarter.name;
            $scope.reportString = $scope.dataEntry['ipdDiseaseMorbidityAndMortalityQuarterlyReport']; 
            $scope.reportType = $scope.dataEntry['startQuarter'] + ": " + $scope.selectedQuarter.name + ", " + $scope.dataEntry['endQuarter'] + ": " + $scope.quarterEnd.name;
        }

        $scope.showReport = false;
        $('.progress').show();
        
        myService.getIPDReportService(id, selectedmonth, selectedQuarter, selectedyear, temphierarchy[0].HMISCode, checkedState, false, selectedMonthEnd, selectedQuarterEnd)
        .then(function (data) {
            console.log(data);

            if (data == null) {
                //$scope.showReport = false;
                // $scope.showProgress = false;
                alert($scope.dataEntry['ipdReportCannotBeGeneratedForTheSelectedInstitution'] + "!");
            }
            else {
                $scope.ipdReportdata = data;
                // $scope.showReport = true;
                // $scope.showProgress = false;
            }
        });
        // $scope.hideParams();
        var setShowReport = function () {
            $scope.showReport = true;
        }
        $timeout(setShowReport, 0);
    }
 
});
