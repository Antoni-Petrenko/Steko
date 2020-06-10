class Partner {
    constructor(
        getParam = "none=none",
        cookie = "",
        param = {
            urlFilter: [],
            cookieFilter: []
        }
    ) {

        //polyfill Object.assign
        if (!Object.assign) {
            Object.defineProperty(Object, 'assign', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function (target, firstSource) {
                    'use strict';
                    if (target === undefined || target === null) {
                        throw new TypeError('Cannot convert first argument to object');
                    }

                    var to = Object(target);
                    for (var i = 1; i < arguments.length; i++) {
                        var nextSource = arguments[i];
                        if (nextSource === undefined || nextSource === null) {
                            continue;
                        }

                        var keysArray = Object.keys(Object(nextSource));
                        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                            var nextKey = keysArray[nextIndex];
                            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                            if (desc !== undefined && desc.enumerable) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                    return to;
                }
            });
        }
        //polyfill Object.assign

        const parseToEntries = (arr = []) => arr.map(el => el.split("="));

       
        const life_time = 2592000000;
        const cur_time = Date.now();
        const first_enter = localStorage.getItem("first_enter") || (localStorage.setItem("first_enter", cur_time) || cur_time);

        if (cur_time - first_enter >= life_time) {

            localStorage.removeItem('partner_id');
            localStorage.setItem("first_enter", cur_time);
           
        }

        const partner_id = localStorage.getItem("partner_id");

        const url_entries = parseToEntries(decodeURI(getParam).slice(1, getParam.length).split("&"));
        const cookie_entries = parseToEntries(cookie.split(";"));

        let data_from_url = null;

        if (param.urlFilter) {

            data_from_url = url_entries.reduce((obj, cur_entrie) => {
                const key = cur_entrie[0];
                let val = cur_entrie[1];

                if (param.urlFilter.findIndex(el => key.includes(el)) !== -1) {
                    if (key === "partner_id") { //Если в строке был partner_id

                        partner_id ? null : localStorage.setItem('partner_id', val); //Если localStor пустой записываем значение из строки URL

                        obj[key] = val; //Добавляем в обьект записаный partner_id из строки URL
                  
                    } else { //Если не было просто пишем 

                        obj[key] = val;
                       
                    }

                } else { //Если строка URL пустая но в localStor есть partner_id
                    partner_id ? obj.partner_id = partner_id : null;
                }

                return obj
            }, {});

        }

        let data_from_cookie = null;

        if (param.cookie_eilter) {
            data_from_cookie = cookie_entries.reduce((obj, cur_entrie) => {
                const key = curEntrie[0];
                const val = curEntrie[1];

                if (param.cookieFilter.findIndex(el => key.includes(el)) !== -1) {
                    obj[key] = val;
                }

                return obj
            }, {});
        }

        const data = Object.assign(data_from_url, data_from_cookie);

        this.get_ga = () => data_from_cookie._ga

        this.get_prop = (filter = "") => {
            let obj
            for (const key in data_from_url) {
                if (key.match(filter)) {
                    obj ? null : obj = {};
                    obj[key] = data_from_url[key]
                }
            }
            return obj
        };

        this.get_all_data = () => data
    }

    static to_json(data) {
        return JSON.stringify(data);
    }
}


const partner = new Partner(document.location.search, document.cookie, {
    urlFilter: ["utm", "partner_id"],
    cookieFilter: ["_ga"]
});
