<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <CustomCard
            title="Title"
            subtitle="subtitle"
            text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
              doloremque, odio atque repudiandae et tenetur placeat distinctio
              vel ea nulla laudantium est dolores veniam dignissimos voluptatem
              amet praesentium architecto deleniti."
            @onConfirm="handleConfirmEvent"
            @onDeny="handleConfirmEvent"
          >
          </CustomCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import CustomCard from "@/components/CustomCard.vue";
export default {
  data: () => ({}),

  components: {
    CustomCard,
  },

  methods: {
    async handleConfirmEvent() {
      console.log("Emit Catched");
    },
  },
};
</script>
<style></style>
