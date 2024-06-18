import template from './template.twig';

const { Mixin, Component } = Shopware;

Component.register('hkag-tools-tab-elasticsearch', {
    template,

    inject: ['hkagElasticSearch'],
    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            isLoading: true,
            isActive: true,
            statusInfo: {},
            indices: [],
            consoleInput: 'GET /_cat/indices',
            consoleOutput: {},
        };
    },

    computed: {
        columns() {
            return [
                {
                    property: 'name',
                    label: 'hkag-tools.name',
                    rawData: true,
                    primary: true
                },
                {
                    property: 'indexSize',
                    label: 'hkag-tools.size',
                    rawData: true,
                    primary: true
                },
                {
                    property: 'docs',
                    label: 'hkag-tools.docs',
                    rawData: true,
                    primary: true
                }
            ];
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        async createdComponent() {
            this.isLoading = true;

            try {
                this.statusInfo = await this.hkagElasticSearch.status();
            } catch (err) {
                this.isActive = false;
                this.isLoading = false;

                return;
            } finally {
                this.isLoading = false;
            }

            this.indices = await this.hkagElasticSearch.indices();
        },

        formatSize(bytes) {
            const thresh = 1024;
            const dp = 1;
            let formatted = bytes

            if (Math.abs(bytes) < thresh) {
                return bytes + ' B';
            }

            const units = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
            let index = -1;
            const reach = 10**dp;

            do {
                formatted /= thresh;
                ++index;
            } while (Math.round(Math.abs(formatted) * reach) / reach >= thresh && index < units.length - 1);

            return formatted.toFixed(dp) + ' ' + units[index];
        },

        async deleteIndex(indexName) {
            await this.hkagElasticSearch.deleteIndex(indexName);
            await this.createdComponent();
        },

        async onConsoleEnter() {
            const lines = this.consoleInput.split("\n")
            const requestLine = lines.shift();
            const payload = lines.join("\n").trim();
            const [method, uri] = requestLine.split(" ");

            try {
                this.consoleOutput = await this.hkagElasticSearch.console(method, uri, payload);
            } catch (e) {
                this.consoleOutput = e.response.data
            }
        },

        async reindex() {
            await this.hkagElasticSearch.reindex();

            this.createNotificationSuccess({
                    message: this.$tc('global.default.success')
                }
            );

            await this.createdComponent()
        },

        async switchAlias() {
            await this.hkagElasticSearch.switchAlias();

            this.createNotificationSuccess({
                    message: this.$tc('global.default.success')
                }
            );

            await this.createdComponent()
        },

        async flushAll() {
            await this.hkagElasticSearch.flushAll();

            this.createNotificationSuccess({
                    message: this.$tc('global.default.success')
                }
            );

            await this.createdComponent()
        },

        async resetElasticsearch() {
            await this.hkagElasticSearch.reset();

            this.createNotificationSuccess({
                    message: this.$tc('global.default.success')
                }
            );

            await this.createdComponent()
        },

        async cleanup() {
            await this.hkagElasticSearch.cleanup();

            this.createNotificationSuccess({
                    message: this.$tc('global.default.success')
                }
            );

            await this.createdComponent()
        }
    }
})
