const os = require('os');

const API_URL = 'http://' + os.hostname() + ':6009';
// const API_URL = 'http://' + os.hostname() + ':6009';

export const PCR_STATUS        = API_URL + '/api/pcr/status';
export const PCR_START         = API_URL + '/api/pcr/start';
export const PCR_STOP          = API_URL + '/api/pcr/stop';

export const PROTOCOL_LIST     = API_URL + '/api/pcr/protocol/list';
export const PROTOCOL_SELECT   = API_URL + '/api/pcr/protocol/select';
export const PROTOCOL_CHECK    = API_URL + '/api/pcr/protocol/check';
export const PROTOCOL_CREATE   = API_URL + '/api/pcr/protocol/create';
export const PROTOCOL_EDIT     = API_URL + '/api/pcr/protocol/edit';
export const PROTOCOL_DELETE   = API_URL + '/api/pcr/protocol/delete';

export const HISTORY_LIST      = API_URL + '/api/history/list';
export const HISTORY_GRAPHDATA = API_URL + '/api/history/graphdata';
export const HISTORY_TEMPDATA  = API_URL + '/api/history/tempdata';

export const MAGNETO_RUN = API_URL + '/api/magneto/run';
const post = (command, callback = null) => {
    // console.log(command)
    fetch(MAGNETO_RUN,
        {
            method: 'POST',
            headers: { "Content-Type": "text/plain" },
            body: command
        })
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            if (response.result === 'ok') {
                if (callback != null) {
                    callback(response.data);
                }
            } else {
                alert(response.reason);
            }
        });
}
export const usePost = () => {
    return post;
}
