(function () {
    function saveBlob(mimeType, blob, filename) {
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            var objectUrl = URL.createObjectURL(blob);
            document.body.appendChild(link); // Firefox requires the link to be in the body
            link.download = filename;
            link.href = objectUrl;
            link.click();
            document.body.removeChild(link); // remove the link when done
        } else {
            // Internet Explorer
            window.navigator.msSaveBlob(blob, filename);
        }
    }

    angular.module('plastiline.utils').service('plastilineFsService', ['$log', '$http', function plastilineFsService($log, $http) {
        return {
            download: function (url, mimeType, defaultFileName) {
                $http.get(url, { responseType: 'blob' }).then(function (response) {
                    var filename = defaultFileName || 'download';
                    if (response.headers('content-disposition')) {
                        filename = response.headers('content-disposition').split(' ')[1].split('=')[1];
                    }
                    saveBlob(mimeType, response.data, filename);
                });
            }
        };
    }]);
})();
