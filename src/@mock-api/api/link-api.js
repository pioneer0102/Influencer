import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import mock from '../mock';
import mockApi from '../mock-api.json';

const offersDB = mockApi.database.offers.value;
const linksDB = mockApi.database.links.value;

mock.onGet('/api/influencer/get_offer').reply(() => {
    return [200, offersDB];
});

mock.onGet(/\/api\/influencer\/get_links\?influencer_id=(.+)/).reply(config => {
    const id = config.url.match(/influencer_id=(.+)/)[1];
    const result = linksDB.filter((link) => link.influencer_id === id);
    return [200, result];
});