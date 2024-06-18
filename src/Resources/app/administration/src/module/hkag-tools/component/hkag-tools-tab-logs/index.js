import template from './template.twig';
import './style.scss';

const { Component, Mixin } = Shopware;

Component.register('hkag-tools-tab-logs', {
    template,
    inject: ['hkagToolsService'],
    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            logFiles: [],
            selectedLogFile: null,
            logEntries: [],
            totalLogEntries: 0,
            limit: 25,
            page: 1,
            isLoading: true,
            displayedLog: null
        };
    },

    created() {
        this.createdComponent();
    },

    computed: {
        columns() {
            return [
                {
                    property: 'date',
                    label: 'hkag-tools.date',
                    rawData: true
                },
                {
                    property: 'channel',
                    label: 'hkag-tools.channel',
                    rawData: true
                },
                {
                    property: 'level',
                    label: 'hkag-tools.level',
                    rawData: true
                },
                {
                    property: 'message',
                    label: 'hkag-tools.message',
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
            await this.onFileSelected();
        },

        async createdComponent() {
            this.logFiles = await this.hkagToolsService.getLogFiles();
            this.isLoading = false;
        },

        async onFileSelected() {
            if (!this.selectedLogFile) {
                return;
            }

            const logEntries = await this.hkagToolsService.getLogFile(
                this.selectedLogFile,
                (this.page - 1) * this.limit,
                this.limit
            );

            this.logEntries = logEntries.data;
            this.totalLogEntries = parseInt(logEntries.headers['file-size'], 10);
        },

        async onPageChange(page) {
            this.page = page.page;
            this.limit = page.limit;
            await this.onFileSelected();
        },

        showInfoModal(entryContents) {
            this.displayedLog = entryContents;
        },

        closeInfoModal() {
            this.displayedLog = null;
        },
    }
});
