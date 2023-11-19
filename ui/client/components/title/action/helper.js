//Helpers to configure the action bar with reusable menu items
import { functionArrayToFunction } from "../../../util/mapping/function";

//Title-specific functions
import { getUserLists } from "../../../http-clients/list";

class ActionBarConfig {
  //Menu state
  showMenu = false;

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

  emit(event) {
    console.log(`emiting`, event); /* //!DELETE */
    this.vueInstance.$emit(event);
  }
}

export class TitleActionBarConfig extends ActionBarConfig {
  //Toggles
  addToLists = false;
  removeFromList = false;

  //Title-specific state
  title;

  //AddToLists state
  userLists = [];

  //RemoveFromList state
  options = { selectedList: {} };

  constructor(
    title,
    { addToLists, removeFromList } = {},
    vueInstance,
    options,
    baseMenuItems,
    baseOnMountHooks
  ) {
    super(vueInstance, baseMenuItems, baseOnMountHooks);

    this.title = title;
    this.addToLists = addToLists;
    this.removeFromList = removeFromList;
    this.options = options;
  }

  static build(
    {
      title,
      toggles: { addToLists, removeFromList } = {},
      options: { selectedList } = {},
      baseMenuItems,
      baseOnMountHooks
    } = {},
    vueInstance
  ) {
    return new TitleActionBarConfig(
      title,
      { addToLists, removeFromList },
      vueInstance,
      { selectedList },
      baseMenuItems,
      baseOnMountHooks
    );
  }

  //Aggregate the options
  additionalOnMountHooks() {
    return this.addToListsOnMountHooks();
  }
  additionalMenuItems() {
    return this.addToListsMenuItems().concat(this.removeFromListMenuItems());
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

  //Menu type removeFromList: remove title from list
  removeFromListMenuItems() {
    if (this.removeFromList) {
      return [
        {
          label: "Remove from List",
          icon: "pi pi-fw pi-file",
          command: () =>
            this.removeTitleFromList(
              this.options.selectedList.id,
              this.options.selectedList.name
            )
        }
      ];
    }
    return [];
  }
  removeTitleFromList = async (listId, listName) => {
    console.log(`helper remove from list`, listId); /* //!DELETE */
    this.hideMenu();
    try {
      await this.title.removeFromList(listId);
      this.notify({
        severity: "success",
        summary: `Removed ${this.title.title} from ${listName}`,
        life: 3000,
        group: "bl"
      });
    } catch (error) {
      this.notify({
        severity: "error",
        summary: `Unable to remove ${this.title.title} from ${listName}`,
        life: 3000,
        group: "bl"
      });
    } finally {
      this.emit("listUpdate");
    }
  };
}
