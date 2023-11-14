//Helpers to configure the action bar with reusable menu items
import { functionArrayToFunction } from "../../../util/mapping/function";

//Title-specific functions
import { getUserLists } from "../../../http-clients/list";

class ActionBarConfig {
  //Menu state
  showMenu = false;
  //Hook Vue component in here

  state = {
    get: () => [],
    set: () => {}
  };
  setupShowMenu(getter, setter) {
    this.showMenu.get = getter;
    this.showMenu.set = setter;
  }

  //Base menu items and mount hooks (constants that can be passed in)
  baseMenuItems = [];
  baseOnMountHooks = [];

  //Vue instance
  vueInstance;

  constructor(vueInstance, baseMenuItems, baseOnMountHooks) {
    this.vueInstance = vueInstance;

    if (baseMenuItems) {
      this.baseMenuItems = baseMenuItems;
    }
    if (baseOnMountHooks) {
      this.baseOnMountHooks = baseOnMountHooks;
    }
  }

  //State changes
  setShowMenu(value) {
    this.showMenu = value;
  }
  toggleShowMenu() {
    this.setShowMenu(!this.showMenu);
  }
  hideMenu() {
    this.setShowMenu(false);
  }

  additionalMenuItems() {
    return [];
  }
  menuItems() {
    return this.additionalMenuItems();
    //return this.baseMenuItems.concat(this.additionalMenuItems());
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

  notify(notification) {
    this.vueInstance.$toast.add(notification);
  }
}

export class TitleActionBarConfig extends ActionBarConfig {
  //Toggles
  addToLists = false;

  //Title-specific state
  title;

  //AddToLists state
  userLists = [];

  constructor(title, addToLists, vueInstance, baseMenuItems, baseOnMountHooks) {
    super(vueInstance, baseMenuItems, baseOnMountHooks);

    this.title = title;
    this.addToLists = addToLists;
  }

  static build(
    {
      title,
      options: { addToLists } = {},

      baseMenuItems,
      baseOnMountHooks
    } = {},
    vueInstance
  ) {
    return new TitleActionBarConfig(
      title,
      addToLists,
      vueInstance,
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
