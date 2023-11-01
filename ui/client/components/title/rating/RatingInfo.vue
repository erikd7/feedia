<template>
  <div>
    <div class="flex flex-row m-1">
      <Tile>
        <template v-slot:header>
          <div>{{ appName }}</div>
        </template>
        <template v-slot:body>
          <p>
            {{ average || "-"
            }}<span class="text-sm font-thin"> / {{ maxRating }}</span>
          </p>
        </template>
      </Tile>
      <Tile class="cursor-pointer hover:ring" @click="() => toggleEdit()">
        <template v-slot:header>
          <div>Me</div>
        </template>
        <template v-slot:body>
          <p>
            {{ currentUserRating || "-"
            }}<span class="text-sm font-thin"> / {{ maxRating }}</span>
          </p>
        </template>
      </Tile>
      <Tile>
        <template v-slot:header>
          <div>Total Votes</div>
        </template>
        <template v-slot:body>
          <p>
            {{
              (count || 0).toLocaleString("en-US", {
                style: "decimal"
              })
            }}
          </p>
        </template>
      </Tile>
    </div>
    <Rating
      :class="{
        hidden: !showEdit && currentUserRating
      }"
      @click="() => toggleEdit(true)"
      v-model="currentUserRating"
      @change="setRating"
      :stars="maxRating"
    />
  </div>
</template>

<script>
import { APP_NAME, RATING_MAX } from "../../../util/constants/base";
import Rating from "primevue/rating";
import DotSeparatedInfo from "../../shared/info/DotSeparatedInfo";
import UserAvatar from "../../login/UserAvatar";
import Tile from "../../shared/info/Tile";

export default {
  props: {
    average: {
      type: Number
    },
    count: {
      type: Number,
      default: 0
    },
    user: {
      type: Number
    },
    onSet: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      showEdit: false,
      currentUserRating: this.user
    };
  },
  watch: {
    //Keep local user rating in sync with user rating from class (for async updates)
    user() {
      this.currentUserRating = this.user;
    }
  },
  components: { Rating, DotSeparatedInfo, UserAvatar, Tile },
  computed: {
    maxRating() {
      return RATING_MAX;
    },
    appName() {
      return APP_NAME;
    }
  },
  methods: {
    toggleEdit(forcedValue) {
      const newValue =
        typeof forcedValue !== "undefined" ? forcedValue : !this.showEdit;

      this.showEdit = newValue;
    },
    setRating(event) {
      this.onSet(event.value);

      //Hide editor after 5 seconds
      setTimeout(() => {
        this.toggleEdit(false);
      }, 5000);
    }
  }
};
</script>
