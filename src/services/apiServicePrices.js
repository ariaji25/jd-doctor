import request from 'utils/request';
import urls from 'values/urls';

const list = async (period, dataset, ou) => {
    const d = await request.get(urls.SERVICE_PRICES(period, dataset, ou));

    return d.data.dataValues;
};

const apiServicePrices = { list };

export default apiServicePrices;
