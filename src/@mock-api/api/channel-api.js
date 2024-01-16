import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import mock from '../mock';
import mockApi from '../mock-api.json';

const channelsDB = mockApi.database.channels.value;

/* eslint-disable camelcase */

mock.onGet('/api/channel').reply(() => {
    return [200, channelsDB];
});

mock.onPost('/api/channel').reply(({ data }) => {
    const { media, channel, user_id } = JSON.parse(data);
    const addChannel = {
        id: channelsDB.length + 1,
        media: media,
        channel: channel,
        created_at: new Date(),
        updated_at: '',
        user_id: user_id
    }
    channelsDB.unshift(addChannel);
    return [200, addChannel];
})

mock.onGet(/\/api\/channel\/\d+/).reply(config => {
    const idMatch = config.url.match(/\/api\/channel\/(\d+)/);
    const id = idMatch ? idMatch[1] : null;
    const channel = _.find(channelsDB, { id: parseInt(id) });
    return [200, channel];
});

mock.onPatch(/\/api\/channel\/\d+/).reply(config => {
    const idMatch = config.url.match(/\/api\/channel\/(\d+)/);
    const id = idMatch ? idMatch[1] : null;
    const { media, channel, user_id, updated_at, created_at } = JSON.parse(config.data);
    const updateChannel = {
        media: media,
        channel: channel,
        user_id: user_id,
        updated_at: new Date(),
        created_at: created_at
    }
    _.assign(_.find(channelsDB, { id: parseInt(id) }), updateChannel);
    return [200, _.find(channelsDB, { id: parseInt(id) })];
});

mock.onDelete(/\/api\/channel\/\d+/).reply(config => {
    const idMatch = config.url.match(/\/api\/channel\/(\d+)/);
    const id = idMatch ? idMatch[1] : null;
    _.remove(channelsDB, { id: parseInt(id) });
    return [200, parseInt(id)]
})