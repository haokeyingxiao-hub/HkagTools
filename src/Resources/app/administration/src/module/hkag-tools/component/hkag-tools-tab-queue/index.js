import template from './template.twig';
import './style.scss';

const { Component, Mixin } = Shopware;

Component.register('hkag-tools-tab-queue', {
    template,
    inject: ['repositoryFactory', 'hkagToolsService'],
    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            queueEntries: [],
            showResetModal: false,
            isLoading: true
        };
    },

    created() {
        this.createdComponent();
    },

    computed: {
        columns() {
            return [
                {
                    property: 'name',
                    label: 'Name',
                    rawData: true
                },
                {
                    property: 'size',
                    label: 'Size',
                    rawData: true
                }
            ];
        }
    },

    methods: {
        async refresh() {
            this.isLoading = true;
            await this.createdComponent();
        },
        async createdComponent() {
            this.queueEntries = await this.hkagToolsService.getQueue();

            for (const queue of this.queueEntries) {
                const nameSplit = queue.name.split('\\')
                queue.name = nameSplit[nameSplit.length - 1];
            }
            this.isLoading = false;
        },
        async resetQueue() {
            this.isLoading = true;
            await this.hkagToolsService.resetQueue();
            this.showResetModal = false;
            await this.createdComponent();
            this.createNotificationSuccess({
                message: this.$tc('hkag-tools.tabs.queue.reset.success')
            })
            this.isLoading = false;
        }
    }
});
