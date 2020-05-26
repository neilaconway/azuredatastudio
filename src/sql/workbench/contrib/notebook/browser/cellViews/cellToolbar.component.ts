/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import 'vs/css!./cellToolbar';
import * as DOM from 'vs/base/browser/dom';
import { Component, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { localize } from 'vs/nls';
import { ICellModel } from 'sql/workbench/services/notebook/browser/models/modelInterfaces';
import { NotebookModel } from 'sql/workbench/services/notebook/browser/models/notebookModel';
import { Taskbar } from 'sql/base/browser/ui/taskbar/taskbar';
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { CellToolbarAction, MoreActions, AddCellAction, EditCellAction } from 'sql/workbench/contrib/notebook/browser/cellToolbarActions';
import { CellTypes } from 'sql/workbench/services/notebook/common/contracts';
import { DropdownMenuActionViewItem } from 'sql/base/browser/ui/buttonMenu/buttonMenu';

export const CELL_TOOLBAR_SELECTOR: string = 'cell-toolbar-component';

@Component({
	selector: CELL_TOOLBAR_SELECTOR,
	templateUrl: decodeURI(require.toUrl('./cellToolbar.component.html'))
})
export class CellToolbarComponent {
	@ViewChild('celltoolbar', { read: ElementRef }) private celltoolbar: ElementRef;

	public buttonEdit = localize('buttonEdit', "Edit");
	public buttonClose = localize('buttonClose', "Close");
	public buttonAdd = localize('buttonAdd', "Add new cell");
	public buttonDelete = localize('buttonDelete', "Delete cell");
	public buttonMoreActions = localize('buttonMoreActions', "More actions");

	@Input() public cellModel: ICellModel;
	@Input() set model(value: NotebookModel) {
		this._model = value;
	}
	private _actionBar: Taskbar;
	private _model: NotebookModel;
	private _editCellAction: EditCellAction;


	constructor(
		@Inject(IInstantiationService) private _instantiationService: IInstantiationService,
		@Inject(IContextMenuService) private contextMenuService: IContextMenuService
	) {
	}

	get model(): NotebookModel {
		return this._model;
	}

	ngOnInit() {
		this.initActionBar();
	}

	private initActionBar(): void {

		// Todo: set this up like the Add new cells is done in main toolbar
		//let addButton = this._instantiationService.createInstance(CellToolbarAction, 'notebook.addCell', '', 'codicon masked-icon new', this.buttonAdd, this.cellModel);
		let addCodeCellButton = new AddCellAction('notebook.AddCodeCell', localize('codePreview', "Code cell"), 'notebook-button masked-pseudo code');
		addCodeCellButton.cellType = CellTypes.Code;

		let addTextCellButton = new AddCellAction('notebook.AddTextCell', localize('textPreview', "Markdown cell"), 'notebook-button masked-pseudo markdown');
		addTextCellButton.cellType = CellTypes.Markdown;

		let deleteButton = this._instantiationService.createInstance(CellToolbarAction, 'notebook.deleteCell', '', 'codicon masked-icon delete', this.buttonDelete, this.cellModel);

		let moreActionsButton = new MoreActions('notebook.moreActions', this.buttonMoreActions, 'codicon masked-icon more');

		// Todo: Wire up toolbarToggleEditMode
		// Todo: Wireup toolbarUnselectActiveCell
		this._editCellAction = this._instantiationService.createInstance(EditCellAction, 'notebook.editCell', true);
		this._editCellAction.enabled = true;

		let taskbar = <HTMLElement>this.celltoolbar.nativeElement;
		this._actionBar = new Taskbar(taskbar);
		this._actionBar.context = this;

		let buttonDropdownContainer = DOM.$('li.action-item');
		buttonDropdownContainer.setAttribute('role', 'presentation');
		let dropdownMenuActionViewItem = new DropdownMenuActionViewItem(
			addCodeCellButton,
			[addCodeCellButton, addTextCellButton],
			this.contextMenuService,
			undefined,
			this._actionBar.actionRunner,
			undefined,
			'codicon masked-icon masked-pseudo-after new dropdown-arrow',
			localize('addCell', "Cell"),
			undefined
		);
		dropdownMenuActionViewItem.render(buttonDropdownContainer);
		dropdownMenuActionViewItem.setActionContext(this);

		this._actionBar.setContent([
			{ action: this._editCellAction },
			{ element: buttonDropdownContainer },
			{ action: deleteButton },
			// Todo: Get this to show the list of actions.
			{ action: moreActionsButton }
		]);
	}
}
