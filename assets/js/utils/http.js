define(function () {

    var applicationBaseUrl = 'http://localhost:1337'; // TODO put this in configuration

    function cleanArray(actual) {
        var newArray = new Array();
        for (var i = 0; i < actual.length; i++) {
            if (actual[i]) {
                newArray.push(actual[i]);
            }
        }
        return newArray;
    }

    function parseLocation() {
        return cleanArray($(location).attr('href').replace(applicationBaseUrl, '').split('/'));
    }

    function buildUrl(opts) {
        var url = opts.path;

        if (_.isUndefined(opts.params) || opts.params === null) {
            return url;
        }

        if (!_.isObject(opts.params)) {
            opts.error('"params" field must be an object', null);
            return url;
        }

        if (_.isEmpty(opts.params)) {
            return url;
        }

        url += '?';
        var isFirst = true;
        for (var key in opts.params) {
            if (isFirst) {
                isFirst = false;
            }
            else {
                url += '&';
            }
            url += key + '=' + opts.params[key];
        }

        return url;
    }

    function call(opts) {
        if (_.isUndefined(opts.path) || opts.path === '' || opts.path === null) {
            if (!_.isUndefined(opts.error)) {
                opts.error('"name" field is not defined', null);
            }
            return;
        }

        $.ajax({
            error: function (jqXHR, status, error) {
                if (jqXHR.status === 401) {
                    location.reload();
                    return;
                }
                if (jqXHR.status === 503) {
                    location.reload();
                    return;
                }
                if (jqXHR.status === 400 || jqXHR.status === 409) {
                    if (opts.clientError) {
                        opts.clientError(error, jqXHR.status, jqXHR);
                    }
                    else {
                        $('#errorModal').modal();
                        $('#errorMessageContainer').text(jqXHR.responseJSON.error);
                        console.log(jqXHR, status, error);
                        return;
                    }
                }
                else if ("error" in opts) {
                    opts.error(error, jqXHR.status, jqXHR);
                }
            },
            success: function (data, status, jqXHR) {
                if ('success' in opts) {
                    opts.success(data, status);
                }
            },
            complete: function (jqXHR, status) {
                if ("complete" in opts) {
                    opts.complete(status);
                }
            },
            contentType: 'application/json',
            dataType: 'json',
            type: opts.method,
            data: opts.data,
            url: buildUrl(opts)
        });
    }

    return {
        call: call,
        parseLocation: parseLocation
    };

});
