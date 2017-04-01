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

app.service('quarterhpopddiseaseService', function ($http, HostConfigFactory) {

    var serverConfig = HostConfigFactory.getHostConfigServer();
    var clientConfig = HostConfigFactory.getHostConfigClient();

    this.get = function (limit, successCallback, errorCallback) {
        $http({
            method: 'GET',
            url: serverConfig + 'api/EthioHIMS_QuarterHPDiseaseView?limit=' + (limit || 10)
        }).then(successCallback, errorCallback);
    }

    this.save = function (data, successCallback, errorCallback) {
        $http({
            method: 'POST',
            dataType: 'json',
            url: serverConfig + 'api/EthioHIMS_QuarterHPDiseaseView/',
            headers: {  
                "Content-Type": "application/json"  
            },
            data: data
        }).then(successCallback, errorCallback);
    }

    this.getQuarterOpdDisease = function (year, quarter, locationID, successCallback, errorCallback) {
        $http({
            method: 'GET',
            url: serverConfig + 'api/values/getQuarterOpdDisease/?year=' + year + '&quarter=' + quarter + '&LocationID=' + locationID
        }).then(successCallback, errorCallback);
    }
});