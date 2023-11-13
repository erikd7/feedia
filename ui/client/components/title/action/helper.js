//Helpers to configure the action bar with reusable menu items
import { functionArrayToFunction } from "../../../util/mapping/function";

//Title-specific functions
import { getUserLists } from "../../../http-clients/list";

class ActionBarConfig {
  //Menu state
  //Hook Vue component in here
  showMenu = {
    get: () => {},
    set: () => {}
  };
  setupShowMenu(getter, setter) {
    this.showMenu.get = getter;
    this.showMenu.set = setter;
  }

  //Base menu items and mount hooks (constants that can be passed in)
  baseMenuItems = [];
  baseOnMountHooks = [];

  //Menu action hooks
  notify; //Notify function to send toast messages (pass this.notify from Vue component)

  constructor(notify, baseMenuItems, baseOnMountHooks) {
    if (baseMenuItems) {
      this.baseMenuItems = baseMenuItems;
    }
    if (baseOnMountHooks) {
      this.baseOnMountHooks = baseOnMountHooks;
    }
    if (notify) {
      this.notify = notify;
    }
  }

  //State changes
  toggleShowMenu() {
    //this.showMenu = !this.showMenu;
    this.showMenu.set(!this.showMenu.get());
  }
  hideMenu() {
    //this.showMenu = false;
    this.showMenu.set(false);
  }

  additionalMenuItems() {
    return [];
  }
  menuItems() {
    return this.baseMenuItems.concat(this.additionalMenuItems());
  }

  additionalOnMountHooks() {
    return [];
  }
  onMountHooks() {
    return this.baseOnMountHooks.concat(this.additionalOnMountHooks());
  }
  onMount() {
    return functionArrayToFunction(this.onMountHooks());
  }
}

export class TitleActionBarConfig extends ActionBarConfig {
  //Toggles
  addToLists = false;

  //Title-specific state
  title;

  //AddToLists state
  userLists = [];

  constructor(title, addToLists, notify, baseMenuItems, baseOnMountHooks) {
    super(notify, baseMenuItems, baseOnMountHooks);

    this.title = title;
    this.addToLists = addToLists;
  }

  static build(
    title,
    { addToLists } = {},
    notify,
    baseMenuItems,
    baseOnMountHooks
  ) {
    return new TitleActionBarConfig(
      title,
      addToLists,
      notify,
      baseMenuItems,
      baseOnMountHooks
    );
  }

  //Aggregate the options
  additionalOnMountHooks() {
    return this.addToListsOnMountHooks();
  }
  additionalMenuItems() {
    return this.addToListsMenuItems();
  }

  //Menu type addToLists: add title to user lists
  addToListsOnMountHooks() {
    if (this.addToLists) {
      return [this.getUserLists];
    }
    return [];
  }
  addToListsMenuItems() {
    if (this.addToLists) {
      return [
        {
          label: "Add to List",
          icon: "pi pi-fw pi-file",
          items: this.addToListsSubmenus()
        }
      ];
    }
    return [];
  }
  addToListsSubmenus = () => {
    return this.userLists.map(l => ({
      ...l,
      label: l.name,
      command: () => {
        this.addToList(l.id, l.name);
      }
    }));
  };

  getUserLists = async () => {
    const result = await getUserLists();
    if (result?.length) {
      this.userLists = result;
    }
  };
  addToList = async (listId, listName) => {
    this.hideMenu();
    try {
      await this.title.addToList(listId);
      this.notify({
        severity: "success",
        summary: `Added ${this.title.title} to ${listName}`,
        life: 3000,
        group: "bl"
      });
    } catch (error) {
      if (error.message?.includes("409")) {
        this.notify({
          severity: "warn",
          summary: `${this.title.displayTitle()} has already been added to ${listName}`,
          life: 3000,
          group: "bl"
        });
      } else {
        this.notify({
          severity: "error",
          summary: `Unable to add ${this.title.title} to ${listName}`,
          life: 3000,
          group: "bl"
        });
      }
    }
  };
}
