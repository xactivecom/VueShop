<script setup>
  import { reactive } from 'vue'

  // Parent communication
  const emit = defineEmits(['review-submitted'])

  // Reactive is similar to ref but allows group related data into a single variable
  const review = reactive({
    name: '',
    content: '',
    rating: null
  })

  const onSubmit = () => {
    // Validate
    if (review.name === '' || review.content === '' || review.rating === null) {
      alert('Review is incomplete. Please fill out every field.')
      return
    }

    // Emit review
    const productReview = {
      name: review.name,
      content: review.content,
      rating: review.rating
    }
    emit('review-submitted', productReview)

    // Reinitialize
    review.name = ''
    review.content = ''
    review.rating = null
  }
</script>

<template>
  <!-- Disable default form submit behavior -->
  <form class="review-form" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input id="name" v-model="review.name">

    <label for="review">Review:</label>
    <textarea id="review" v-model="review.content"></textarea>

    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="review.rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

    <input class="button" type="submit" value="Submit">
  </form>
</template>
