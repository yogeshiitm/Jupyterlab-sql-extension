import * as uuid from 'uuid';

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILayoutRestorer
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { ICommandPalette, WidgetTracker } from '@jupyterlab/apputils';

import { IEditorServices } from '@jupyterlab/codeeditor';

import { ILauncher } from '@jupyterlab/launcher';

import { JupyterLabSqlWidget } from './widget';

import { createTracker } from './tracker';

import { PageName } from './page';

import '../style/index.css';

function activate(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  launcher: ILauncher | null,
  editorServices: IEditorServices,
  restorer: ILayoutRestorer,
  settingRegistry: ISettingRegistry | null
): void {
  if (settingRegistry) {
    settingRegistry
      .load(plugin.id)
      .then(settings => {
        console.log(
          'Jupyterlab-sql-extension settings loaded:',
          settings.composite
        );
      })
      .catch(reason => {
        console.error(
          'Failed to load settings for Jupyterlab-sql-extension.',
          reason
        );
      });
  }

  const tracker: WidgetTracker<JupyterLabSqlWidget> = createTracker();
  const command = 'jupyterlab-sql:open';

  restorer.restore(tracker, {
    command,
    args: widget => ({
      initialWidgetName: widget.name,
      initialPageName: widget.pageName,
      initialConnectionUrl: widget.connectionUrl,
      initialTableName: widget.tableName,
      initialSqlStatement: widget.sqlStatement
    }),
    name: widget => widget.name
  });

  app.commands.addCommand(command, {
    label: ({ isPalette }) => (isPalette ? 'New SQL session' : 'SQL'),
    iconClass: 'p-Sql-DatabaseIcon',
    execute: ({
      initialWidgetName,
      initialPageName,
      initialConnectionUrl,
      initialTableName,
      initialSqlStatement
    }) => {
      const name = <string>(initialWidgetName || uuid.v4());
      const pageName = <PageName>(initialPageName || PageName.Connection);
      const connectionUrl = <string>(
        (initialConnectionUrl || 'postgres://localhost:5432/postgres')
      );
      const tableName = <string>(initialTableName || '');
      const sqlStatement = <string>(initialSqlStatement || '');
      const widget = new JupyterLabSqlWidget(editorServices.factoryService, {
        name,
        pageName,
        connectionUrl,
        tableName,
        sqlStatement
      });
      app.shell.add(widget);
      tracker.add(widget);
    }
  });

  palette.addItem({ command, category: 'SQL', args: { isPalette: true } });

  if (launcher) {
    launcher.add({ command, category: 'Other' });
  }
}

/**
 * Initialization data for the Jupyterlab-sql-extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'Jupyterlab-sql-extension:plugin',
  autoStart: true,
  requires: [ICommandPalette, ILauncher, IEditorServices, ILayoutRestorer],
  optional: [ISettingRegistry],
  activate: activate
};

export default plugin;
