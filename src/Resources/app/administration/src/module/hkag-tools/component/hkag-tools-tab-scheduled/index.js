import template from './template.twig';
import './style.scss';

const { Component, Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('hkag-tools-tab-scheduled', {
    template,
    inject: ['repositoryFactory', 'hkagToolsService'],
    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            items: null,
            showResetModal: false,
            isLoading: true,
            page: 1,
            limit: 25,
            taskError: null
        };
    },

    created() {
        this.createdComponent();
    },

    computed: {
        scheduledRepository() {
            return this.repositoryFactory.create('scheduled_task');
        },

        columns() {
            return [
                {
                    property: 'name',
                    label: 'hkag-tools.name',
                    rawData: true,
                    primary: true
                },
                {
                    property: 'runInterval',
                    label: 'hkag-tools.interval',
                    rawData: true,
                    inlineEdit: 'number'
                },
                {
                    property: 'lastExecutionTime',
                    label: 'hkag-tools.lastExecutionTime',
                    rawData: true
                },
                {
                    property: 'nextExecutionTime',
                    label: 'hkag-tools.nextExecutionTime',
                    rawData: true,
                    inlineEdit: 'datetime'
                },
                {
                    property: 'status',
                    label: 'hkag-tools.status',
                    rawData: true
                }
            ];
        },

        date() {
            return Shopware.Filter.getByName('date');
        },
    },

    methods: {
        async refresh() {
            this.isLoading = true;
            await this.createdComponent();
        },

        async createdComponent() {
            const criteria = new Criteria(this.page, this.limit);
            criteria.addSorting(Criteria.sort('nextExecutionTime', 'ASC'));
            this.items = await this.scheduledRepository.search(criteria, Shopware.Context.api);
            this.isLoading = false;
        },

        async runTask(item) {
            this.isLoading = true;

            try {
                this.createNotificationInfo({
                    message: this.$tc('hkag-tools.scheduledTaskStarted', 0, {'name': item.name})
                })
                await this.hkagToolsService.runScheduledTask(item.id);
                this.createNotificationSuccess({
                    message: this.$tc('hkag-tools.scheduledTaskSucceed', 0, {'name': item.name})
                })
            } catch (e) {
                this.createNotificationError({
                    message: this.$tc('hkag-tools.scheduledTaskFailed', 0, {'name': item.name})
                })

                this.taskError = e.response.data;
            }

            this.createdComponent();
        },

        async registerScheduledTasks() {
            this.isLoading = true;

            try {
                this.createNotificationInfo({
                    message: this.$tc('hkag-tools.scheduledTasksRegisterStarted')
                })
                await this.hkagToolsService.scheduledTasksRegister();
                this.createNotificationSuccess({
                    message: this.$tc('hkag-tools.scheduledTasksRegisterSucceed')
                })
            } catch (e) {
                this.createNotificationError({
                    message: this.$tc('hkag-tools.scheduledTasksRegisterFailed')
                })
            }

            this.createdComponent();
        },
    }
});
