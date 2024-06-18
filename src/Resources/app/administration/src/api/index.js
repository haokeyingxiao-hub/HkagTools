import HkagToolsService from "./hkag-tools";
import Elasticsearch from "./elasticsearch";

const { Application } = Shopware;

Application.addServiceProvider('hkagToolsService', (container) => {
    const initContainer = Application.getContainer('init');

    return new HkagToolsService(initContainer.httpClient, container.loginService);
});

Application.addServiceProvider('hkagElasticSearch', (container) => {
    const initContainer = Application.getContainer('init');

    return new Elasticsearch(initContainer.httpClient, container.loginService);
});
