<script setup>
  import { ref, computed, defineEmits } from 'vue'
  import ReviewForm from '@/components/ReviewForm.vue'
  import ReviewList from '@/components/ReviewList.vue'

  import socksGreenImg from '@/assets/images/socks_green.jpeg'
  import socksBlueImg from '@/assets/images/socks_blue.jpeg'

  // Properties from parent
  const props = defineProps({
    premium: {
      type: Boolean,
      required: true
    }
  })

  // Parent communication
  const emit = defineEmits(['add-to-cart'])

  const brand = ref('Peak Design')
  const product = ref('Socks')

  const title = computed(() => {
    return brand.value + ' ' + product.value
  })
  const details = ref(['50% cotton', '30% wool', '20% polyester'])
  const variants = ref([
    { id: 2234, color: 'green', image: socksGreenImg, quantity: 50 },
    { id: 2235, color: 'blue', image: socksBlueImg, quantity: 0 }
  ])
  const reviews = ref([])

  const selectedVariant = ref(0)
  const image = computed(() => {
    return variants.value[selectedVariant.value].image
  })
  const inventory = computed(() => {
    return variants.value[selectedVariant.value].quantity
  })

  const shipping = computed(() => {
    if (props.premium) {
      return 'Free'
    } else {
      return 2.00
    }
  })

  const addToCart = () => {
    emit('add-to-cart', variants.value[selectedVariant.value].id)
  }
  
  const setVariant = (index) => {
    selectedVariant.value = index
  }

  const addReview = (review) => {
    reviews.value.push(review)
  }
</script>

<template>
  <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src=image />
      </div>
      
      <div class="product-info">
        <h1>{{ title }}</h1>

        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Low Inventory: {{ inventory }}</p>
        <p v-else="inventory > 0">Out of Stock</p>

        <p>Shipping: {{  shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div v-for="(variant, index) in variants" 
          :key="variant.id"
          @mouseover="setVariant(index)"
          class="color-circle" :style="{ 'background-color': variant.color }"
        ></div>

        <button class="button" :class="{ disabledButton: inventory == 0 }"
          @click="addToCart" :disabled="inventory == 0"
        >Add to Cart</button>

      </div>
    </div>
    <ReviewList v-if="reviews.length > 0" :reviews="reviews"></ReviewList>
    <ReviewForm @review-submitted="addReview"></ReviewForm>
  </div>
</template>
