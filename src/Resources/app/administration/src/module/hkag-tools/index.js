import './component/hkag-tools-tab-index';
import './component/hkag-tools-tab-cache';
import './component/hkag-tools-tab-queue';
import './component/hkag-tools-tab-scheduled';
import './component/hkag-tools-tab-elasticsearch';
import './component/hkag-tools-tab-logs';
import './component/hkag-tools-tab-state-machines';
import './component/hkag-tools-tab-files';
import './page/index';
import './acl'

Shopware.Module.register('hkag-tools', {
    type: 'plugin',
    name: 'hkag-tools.title',
    title: 'hkag-tools.title',
    description: '',
    color: '#303A4F',

    icon: 'regular-cog',

    routes: {
        index: {
            component: 'hkag-tools-index',
            path: 'index',
            children: {
                index: {
                    component: 'hkag-tools-tab-index',
                    path: 'index',
                    meta: {
                        privilege: 'hkag_tools:read',
                        parentPath: 'hkag.tools.index.index'
                    }
                },
                cache: {
                    component: 'hkag-tools-tab-cache',
                    path: 'cache',
                    meta: {
                        privilege: 'hkag_tools:read',
                        parentPath: 'hkag.tools.index.index'
                    }
                },
                queue: {
                    component: 'hkag-tools-tab-queue',
                    path: 'queue',
                    meta: {
                        privilege: 'hkag_tools:read',
                        parentPath: 'hkag.tools.index.index'
                    }
                },
                scheduled: {
                    component: 'hkag-tools-tab-scheduled',
                    path: 'scheduled',
                    meta: {
                        privilege: 'hkag_tools:read',
                        parentPath: 'hkag.tools.index.index'
                    }
                },
                elasticsearch: {
                    component: 'hkag-tools-tab-elasticsearch',
                    path: 'elasticsearch',
                    meta: {
                        privilege: 'hkag_tools:read',
                        parentPath: 'hkag.tools.index.index'
                    }
                },
                logs: {
                    component: 'hkag-tools-tab-logs',
                    path: 'logs',
                    meta: {
                        privilege: 'hkag_tools:read',
                        parentPath: 'hkag.tools.index.index'
                    }
                },
                files: {
                    component: 'hkag-tools-tab-files',
                    path: 'files',
                    meta: {
                        privilege: 'hkag_tools:read',
                        parentPath: 'hkag.tools.index.index'
                    }
                },
                statemachines: {
                    component: 'hkag-tools-tab-state-machines',
                    path: 'state-machines',
                    meta: {
                        privilege: 'hkag_tools:read',
                        parentPath: 'hkag.tools.index.index'
                    }
                },
            }
        },
    },

    settingsItem: [
        {
            group: 'plugins',
            to: 'hkag.tools.index.cache',
            icon: 'regular-cog',
            name: 'hkag-tools',
            label: 'hkag-tools.title',
            privilege: 'hkag_tools:read'
        }
    ]
});
