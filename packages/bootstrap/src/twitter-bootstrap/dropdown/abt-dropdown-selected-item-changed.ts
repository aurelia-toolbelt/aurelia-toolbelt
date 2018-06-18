

export class BootstrapDropdownSelectedItemChanged {

  constructor(public parentId: any, public selectedItem: any, public selectedText: string, public isValueChanged: boolean = true) { }
}
