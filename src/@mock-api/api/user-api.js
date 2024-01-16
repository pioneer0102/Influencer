import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import mock from '../mock';
import mockApi from '../mock-api.json';

const userDB = mockApi.components.examples.auth_users.value;

mock.onPatch('/api/admin/me').reply(({data}) => {
    const {id} = JSON.parse(data);
    console.log(id);
    _.assign(_.find(userDB, { id: parseInt(id) }), JSON.parse(data));
    return [200, _.find(userDB, { id: parseInt(id) })];
})