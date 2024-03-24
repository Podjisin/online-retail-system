<template>
  <v-container grid-list-xs fluid>
    <v-row justify="center">
      <v-col>
        <TitleCard title="Sample Title" color="primary"></TitleCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="index"
        xs="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ConfirmationCard
          :title="item.title"
          :subtitle="item.subtitle"
          :text="item.text"
          @onConfirm="handleConfirmEvent"
          @onDeny="handleConfirmEvent"
        >
        </ConfirmationCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ConfirmationCard from "@/components/ConfirmationCard.vue";
import TitleCard from "@/components/TitleCard.vue";
export default {
  data: () => ({
    items: [
      {
        title: "1 title",
        subtitle: "1 subtitle",
        text: "1 text",
      },
      {
        title: "2 title",
        subtitle: "2 subtitle",
        text: "2 text",
      },
      {
        title: "3 title",
        subtitle: "3 subtitle",
        text: "3 text",
      },
      {
        title: "1 title",
        subtitle: "1 subtitle",
        text: "1 text",
      },
      {
        title: "2 title",
        subtitle: "2 subtitle",
        text: "2 text",
      },
      {
        title: "3 title",
        subtitle: "3 subtitle",
        text: "3 text",
      },
      {
        title: "1 title",
        subtitle: "1 subtitle",
        text: "1 text",
      },
      {
        title: "2 title",
        subtitle: "2 subtitle",
        text: "2 text",
      },
      {
        title: "3 title",
        subtitle: "3 subtitle",
        text: "3 text",
      },
    ],
  }),

  components: {
    ConfirmationCard,
    TitleCard,
  },

  methods: {
    async handleConfirmEvent() {
      console.log("Emit Catched");
    },
  },
};
</script>
<style></style>
