/**
 * Created by kevin chen on 2017/6/23.
 */
var pointsinMaps = {
    "gateways": [
        {
            "id": 1000001,
            "name": "园区室内",
            "loc": "麒麟工业园区演示室内",
            "pointLon": 118.92812,
            "pointLat": 32.032966,
            "isonline": 1,
            "lights": [
                {
                    "id": 2000001,
                    "name": "园区室内",
                    "loc": "麒麟工业园区演示室内",
                    "pointLon": 118.928102,
                    "pointLat": 32.03331,
                    "gateway": 1000001,
                    "gatewayname": "园区室内",
                    "area":"江宁区",
                    "road":"园区内",
                    "isonline": 1,
                    "curele": 20,
                    "curpower": 2243,
                    "curvol": 220,
                    "open": 1,
                    "curlightnum": 15,
                    "setlightnum": 50,
                    "camera": {
                        "ip": "192.168.1.101",
                        "isonline": 1
                    },
                    "airbox": {
                        "id": 3000001,
                        "ip": "192.168.2.101",
                        "pointLon": 118.928102,
                        "pointLat": 32.03331,
                        "isonline": 1,
                        "name": "园区室内",
                        "loc": "麒麟工业园区演示室内",
                        "temprature": "29",
                        "humidity": "60%",
                        "pm2": 102,
                        "co2": 550
                    }
                },
                {
                    "id": 2000002,
                    "name": "室外1",
                    "loc": "麒麟工业园区室外1",
                    "pointLon": 118.929414,
                    "pointLat": 32.03243,
                    "gateway": 1000001,
                    "gatewayname": "园区室内",
                    "area":"江宁区",
                    "road":"园区旁支路",
                    "isonline": 0,
                    "curele": 10,
                    "curvol": 220,
                    "open": 1,
                    "curpower": 1250,
                    "curlightnum": 25,
                    "setlightnum": 50
                },
                {
                    "id": 2000003,
                    "name": "室外2",
                    "loc": "麒麟工业园区室外2",
                    "pointLon": 118.926701,
                    "pointLat": 32.032032,
                    "gateway": 1000001,
                    "gatewayname": "园区室内",
                    "area":"江宁区",
                    "road":"园区旁路",
                    "isonline": 1,
                    "curele": 30,
                    "curvol": 220,
                    "open": 0,
                    "curpower": 3333,
                    "curlightnum": 35,
                    "setlightnum": 50,
                }
            ]
        }
    ],

};